const axios = require('axios')
import router from './router'

const API = axios.create({
	baseURL: process.env.CASINO_APP_API_URL,
})

API.getPlayerTokenByUsernamePassword = function(username, password) {
	let params = {
		grant_type: 'password',
		username: username,
		password: password
	}

	return API.getPlayerToken(params)
}

API.getPlayerToken = function (params) {
	return new Promise((resolve, reject) => {
		let config = {
			baseURL: process.env.CASINO_APP_API_URL,
			headers: {
				Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
			}
		}

		params.scope = 'casino:read bonus:read bonus.settings:read bonus:write lab:read lab:write game:read game:write game.history:read game.wallet:write game.launch:write player:read player:write message:read message:write payment:read payment:write player:write:all message:write winner:read faq:read news:read slider:read payment.callbacks:write counters';
		axios.post('oauth2/token', params, config)
			.then(function (response) {

				let currentTimeInTimestamp = new Date().getTime() / 1000 | 0;

				let tokenEntity = {
					userToken: response.data.access_token,
					refreshToken: response.data.refresh_token,
					expiresIn: currentTimeInTimestamp,
					timestamp: new Date().getTime()
				}

				localStorage.setItem("userToken", JSON.stringify(tokenEntity));

				API.defaults.headers.common['Authorization'] = 'Bearer ' + tokenEntity.userToken

				resolve(response)
			}.bind(this))
			.catch(error => {
				reject(error)
				this.errors = true
				this.isLoading = false
			});
	});
}

API.getGuestToken = function (params) {
	return new Promise((resolve, reject) => {
		let config = {
			baseURL: process.env.CASINO_APP_API_URL,
			headers: {
				Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
			}
		}

		axios.post('oauth2/token', params, config).then(response => {
			let token = response.data.access_token

			let object = {appToken: token, timestamp: new Date().getTime()}
			localStorage.setItem("appToken", JSON.stringify(object));

			if (response.status === 401) {
				router.push('/Login')
			}

			API.defaults.headers.common['Authorization'] = 'Bearer ' + token

			resolve(response)
		});
	});
}

API.loadPlayer = function() {
	let userToken = JSON.parse(localStorage.getItem('userToken'))

	return axios.get('players', {
		baseURL: process.env.CASINO_APP_API_URL,
		headers: {
			Authorization: 'Bearer ' + userToken.userToken,
		},
		params: {
			expand: 'avatars,accounts,country,timezone'
		}
	});
}

let isAlreadyFetchingAccessToken = false
let isFirstRequest = true
let subscribers = []

class CancelException {
	constructor(config) {
		this.config = config;
	}
}

function onAccessTokenFetched(access_token) {
	subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
	subscribers.push(callback)
}

API.interceptors.response.use(null, function (error) {
	const {config, response} = error
	const originalRequest = config

	if (error instanceof CancelException) {
		return new Promise((resolve) => {
			addSubscriber(access_token => {
				originalRequest.headers.Authorization = 'Bearer ' + access_token
				resolve(axios(originalRequest))
			})
		})
	}

	if (error.response.status === 401) {
		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true

			//todo refactor me
			localStorage.removeItem("player");
			localStorage.removeItem("appToken");

			let credentials = {
				grant_type: "client_credentials",
					scope: "guest:default"
			};

			API.getGuestToken(credentials).then(response => {
				let token = response.data.access_token
				isAlreadyFetchingAccessToken = false
				onAccessTokenFetched(token)
			});
		}

		return new Promise((resolve) => {
			addSubscriber(access_token => {
				originalRequest.headers.Authorization = 'Bearer ' + access_token
				resolve(axios(originalRequest))
			})
		})

	} else {
		return Promise.reject(error)
	}
})

API.interceptors.request.use(function (config) {
	if (localStorage.getItem('player')) {
		let userToken = JSON.parse(localStorage.getItem('userToken'))
		API.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken
	} else if (localStorage.getItem('appToken')) {
		let appToken = JSON.parse(localStorage.getItem('appToken'))
		API.defaults.headers.common['Authorization'] = 'Bearer ' + appToken.appToken
	}

	if (isFirstRequest || API.defaults.headers.common['Authorization']) {
		isFirstRequest = false;
		config.headers['Authorization'] = API.defaults.headers.common['Authorization'];
		return config;
	}

	throw new CancelException(config);
});

export {API}