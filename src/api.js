import {Guest} from "./guest";
import {CasinoLocalStorage} from "./CasinoLocalStorage";

const axios = require('axios')

const API = axios.create({
	baseURL: process.env.CASINO_APP_API_URL,
})


let isAlreadyFetchingAccessToken = false
let isFirstRequest = true
let isTokenReceived = false

class CancelException {
	constructor(config) {
		this.config = config;
	}
}

class DelayedRequestList {
	constructor() {
		this.requestsCallbacks = []
	}
	addCallback(callback) {
		this.requestsCallbacks.push(callback)
	}
	handleDelayedRequests(accessToken) {
		this.requestsCallbacks = this.requestsCallbacks.filter(callback => callback(accessToken))
	}
}
let delayedRequestsList = new DelayedRequestList()


API.interceptors.response.use(null, function (error) {
	const {config} = error
	const originalRequest = config

	if (error instanceof CancelException) {
		return new Promise((resolve) => {
			delayedRequestsList.addCallback(access_token => {
				originalRequest.headers.Authorization = 'Bearer ' + access_token
				resolve(axios(originalRequest))
			})
		})
	}

	if (error.response.status === 401) {
		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true

			CasinoLocalStorage.deleteUsers()

			Guest.getGuestToken().then(response => {
				let token = response.data.access_token
				API.defaults.headers.common['Authorization'] = 'Bearer ' + token
				isAlreadyFetchingAccessToken = false
				isFirstRequest = true
				delayedRequestsList.handleDelayedRequests(token)
			});
		}

		return new Promise((resolve) => {
			delayedRequestsList.addCallback(access_token => {
				originalRequest.headers.Authorization = 'Bearer ' + access_token
				resolve(axios(originalRequest))
			})
		})

	} else {
		return Promise.reject(error)
	}
})

API.interceptors.request.use(function (config) {
	let player = CasinoLocalStorage.getPlayer()
	let guest = CasinoLocalStorage.getGuest()

	if (player) {
		API.defaults.headers.common['Authorization'] = 'Bearer ' + player.token.accessToken
		API.defaults.headers.common['Access-Control-Request-Method'] = 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
		API.defaults.headers.common['Origin'] = '*'
		isTokenReceived = true
	} else if (guest) {
		API.defaults.headers.common['Authorization'] = 'Bearer ' + guest.token.accessToken
		API.defaults.headers.common['Access-Control-Request-Method'] = 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
		API.defaults.headers.common['Origin'] = '*'
		isTokenReceived = true
	}

	if (isFirstRequest || isTokenReceived) {
		isFirstRequest = false;
		config.headers['Authorization'] = API.defaults.headers.common['Authorization'];
		return config;
	}

	throw new CancelException(config);
});

export {API}