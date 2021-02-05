import axios from 'axios'
import {API} from '../api'

const auth = {
	namespaced: true,
	state: {
		credentials: {
			grant_type: "client_credentials",
			scope: "guest:default"
		},
		authenticated: false,
		games: [],
		regFields: [],
		currency: [],
		faq: '',
		slider: [],
		news: [],
		groups: [],
		player: null,
		timezones: [],
		countries: [],
		popularGames: [],
		slotsGames: [],
		recommendedGames: [],
		switchDepo: true,
		messages: [],
		lang: {
			selectedLang: process.env.CASINO_APP_I18N_DEFAULT_LOCALE
		}
	},
	mutations: {
		SET_GAMES(state, payload) {
			state.games = payload
		},
		SET_REG_FIELDS(state, payload) {
			state.regFields = payload
		},
		SET_CURRENCY(state, payload) {
			state.currency = payload
		},
		SET_FAQ(state, payload) {
			state.faq = payload
		},
		SET_SLIDER(state, payload) {
			state.slider = payload
		},
		SET_NEWS(state, payload) {
			state.news = payload
		},
		SET_GROUPS(state, payload) {
			state.groups = payload
		},
		SET_PLAYER(state, payload) {
			state.player = payload
		},
		SET_TIMEZONES(state, payload) {
			state.timezones = payload
		},
		SET_COUNTRIES(state, payload) {
			state.countries = payload
		},
		LOG_OUT(state) {
			state.player = null
		},
		SET_FIELD(state, payload) {
			state.player[payload.name] = payload.value
		},
		CHANGE_AUTH(state, payload) {
			state.authenticated = payload
		},
		SET_POPULAR(state, payload) {
			state.popularGames = payload
		},
		SET_SLOTS(state, payload) {
			state.slotsGames = payload
		},
		SET_RECOMMENDED(state, payload) {
			state.recommendedGames = payload
		},
		SET_DEPOSWITCH(state, payload) {
			state.switchDepo = payload
		},
		SET_LANG(state, payload) {
			API.defaults.headers.common['Accept-Language'] = payload
			state.lang = {
				selectedLang: payload
			  }
		},
		SET_MESSAGES(state, payload) {
			state.messages = payload
		}
	},
	actions: {
		initApp({commit, state, dispatch}) {
			dispatch("loadNews")
			dispatch("loadSlider")
			dispatch("loadPopular")
			dispatch("loadSlots")
			dispatch("loadRecommended")
			dispatch("getInfo")
			dispatch("setLang", localStorage.getItem('selectedLang'))
			// dispatch("loadTimezones")
		},
		getAppToken({commit, state, dispatch}) {

			API.defaults.headers.common['Authorization'] = 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN;

			API.post('oauth2/token', state.credentials)
				.then(response => {
					let token = response.data.access_token

					let object = {appToken: token, timestamp: new Date().getTime()}
					localStorage.setItem("appToken", JSON.stringify(object));

					if (response.status === 401) {
						router.push('/Login')
					}

					axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

	  			API.defaults.headers.common['Authorization'] = 'Bearer ' + token


					// alert('Bearer ' + token)

				});
		},

		getUser({commit, dispatch, state}) {

			let userToken = JSON.parse(localStorage.getItem('userToken'));

		 	API.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.userToken

			commit('CHANGE_AUTH', true)

			API.get('players', {
				params: {
					expand: 'avatars,accounts,country,timezone'
				}
			}).then(response => {
				commit('SET_PLAYER', response.data[0])
				localStorage.setItem("player", JSON.stringify(response.data[0]));
				dispatch("loadMessages")
			})


			// axios
			// 	.get('http://api.casinoplatform.site/v3/messages')
			// 	.then(response => {
			// 		console.log(response)
			// 	})

		},
		getRegFields({commit, dispatch, state}) {
			API.get('player-forms')
				.then(res => {
					commit('SET_REG_FIELDS', res.data)
				})
		},
		getInfo({commit, dispatch, state}) {
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical'
				}
			}).then(res => {
					commit('SET_GAMES', res.data)
				})

			API.get('faq-items')
				.then(res => {
					commit('SET_FAQ', res.data)
				})


			API.get('player-forms')
				.then(res => {
					commit('SET_REG_FIELDS', res.data)
				})


			API.get('payment-currencies')
				.then(res => {
					commit('SET_CURRENCY', res.data)
				})



			// получаем id всех групп

			API.get('game-groups', {
				params: {
					place_code: 'headline',
					expand: 'images,platform,place_code',
				}
			}).then(res => {
				commit('SET_GROUPS', res.data)
			})

			// // таймзоны
			// axios
			// 	.get('http://api.casinoplatform.site/v3/timezones?per-page=400')
			// 	.then(res =>{
			// 		commit('SET_TIMEZONES', res.data)
			// 	})

			// страны
			// axios
			// 	.get('http://api.casinoplatform.site/v3/countries?per-page=400')
			// 	.then(res =>{
			// 		commit('SET_COUNTRIES', res.data)
			// 	})


		},
		loadNews({commit}) {
			API.get('news')
				.then(response => {
					commit('SET_NEWS', response.data)
				})
		},
		loadSlider({commit}) {
			API.get('sliders')
				.then(res => {
					commit('SET_SLIDER', res.data)
				})
		},
		loadMessages({commit}) {
			API.get('messages')
				.then(res => {
					commit('SET_MESSAGES', res.data)
				})
		},
		logOut({commit, state}) {
			commit('CHANGE_AUTH', false)
			localStorage.removeItem("player");
			localStorage.removeItem("userToken");
			commit('LOG_OUT')
		},
		CHANGE_FIELD({commit}, payload) {
			commit('SET_FIELD', payload)
		},
		loadTimezones({commit}) {
			API.get('timezones?per-page=400')
				.then(res => {
					commit('SET_TIMEZONES', res.data)
				})
		},
		loadCountries({commit}) {
			API.get('countries?per-page=400')
				.then(res => {
					commit('SET_COUNTRIES', res.data)
				})
		},
		changeAccount({commit}, payload) {

			let currency = {
				is_current: true
			}


			API.patch(`accounts/${payload}`, currency)
				.then(res => {
					//console.log(res.data)
				})
		},
		loadPopular({commit}) {
			// popular games
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical',
					group_id: 115,
				}
			}).then(res => {
				commit('SET_POPULAR', res.data)
			})
		},
		loadSlots({commit}) {
			// slots games
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical',
					group_id: 126,
				}
			}).then(res => {
				commit('SET_SLOTS', res.data)
			})
		},
		loadRecommended({commit}) {
			// recommended games
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical',
					group_id: 124,
				}
			}).then(res => {
				commit('SET_RECOMMENDED', res.data)
			})
		},
		depoSwitcher({commit}, payload) {
			commit('SET_DEPOSWITCH', payload)
		},
		setLang({commit}, payload) {
			commit('SET_LANG', payload)
		}
	},
	getters: {
		getGames(state) {
			return state.games
		},
		getRegFields(state) {
			return state.regFields
		},
		getCurrency(state) {
			return state.currency
		},
		getFaq(state) {
			return state.faq
		},
		getSlider(state) {
			return state.slider
		},
		getNews(state) {
			return state.news
		},
		getGroups(state) {
			return state.groups
		},
		getPlayer(state) {
			return state.player
		},
		getZones(state) {
			return state.timezones
		},
		getCountries(state) {
			return state.countries
		},
		getAuthenticated(state) {
			return state.authenticated
		},
		getPopular(state) {
			return state.popularGames
		},
		getSlots(state) {
			return state.slotsGames
		},
		getRecommended(state) {
			return state.recommendedGames
		},
		getSwitchDepo(state) {
			return state.switchDepo
		},
		getLang(state) {
			return state.lang
		},
		getMessages(state){
			return state.messages
		}
	}
}

export default auth


