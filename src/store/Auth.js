import axios from "axios";
import {Guest} from "../guest";
import {CasinoLocalStorage} from "../CasinoLocalStorage";

const auth = {
	namespaced: true,
	state: {
		authenticated: false,
	},
	mutations: {
		CHANGE_AUTH(state, payload) {
			state.authenticated = payload
		}
	},
	actions: {
		setAuthenticated({commit}, value) {
			commit('CHANGE_AUTH', value)
		},
		logOut({dispatch}) {
			dispatch('auth/setAuthenticated', false, {root: true})
			dispatch('player/logOut', null, {root: true})
			CasinoLocalStorage.deletePlayer()
			return dispatch('auth/loadGuestToken', null, {root: true})
		},
		loadGuestToken() {
			return Guest.getGuestToken()
		},
		loadPlayerTokenByUsernamePassword({commit, dispatch}, params) {
			let playerParams = {
				grant_type: 'password',
				username: params['username'],
				password: params['password']
			}
			return dispatch('auth/loadPlayerToken', playerParams, {root: true})
		},
		loadPlayerToken({commit}, params) {
			return new Promise((resolve, reject) => {
				let config = {
					baseURL: process.env.CASINO_APP_API_URL,
					headers: {
						Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
					}
				}

				params.scope = 'player:default';
				axios.post('oauth2/token', params, config).then(response => {
					CasinoLocalStorage.deleteGuest()

					let currentTimeInTimestamp = new Date().getTime() / 1000 | 0;

					let player = {
						token: {
							accessToken: response.data.access_token,
							refreshToken: response.data.refresh_token,
							expiresIn: currentTimeInTimestamp + response.data.expires_in
						}
					}

					CasinoLocalStorage.savePlayer(player)

					resolve(response)
				}).catch(error => {
					reject(error)
				});
			});
		},
		refreshPlayerToken() {
			let playerFromStorage = CasinoLocalStorage.getPlayer()
			let currentTimeInTimestamp = new Date().getTime() / 1000 | 0;

			if (playerFromStorage.token.expiresIn - currentTimeInTimestamp > 5) {
				return;
			}

			return new Promise((resolve, reject) => {
				let config = {
					baseURL: process.env.CASINO_APP_API_URL,
					headers: {
						Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
					}
				}


				let params = {
					grant_type: 'refresh_token',
					refresh_token: playerFromStorage.token.refreshToken
				}

				axios.post('oauth2/token', params, config).then(response => {

					let currentTimeInTimestamp = new Date().getTime() / 1000 | 0;

					let player = {
						token: {
							accessToken: response.data.access_token,
							refreshToken: response.data.refresh_token,
							expiresIn: currentTimeInTimestamp + response.data.expires_in
						}
					}

					CasinoLocalStorage.savePlayer(player)

					resolve(response)
				}).catch(error => {
					reject(error)
				});
			});
		}
	},
	getters: {
		getAuthenticated(state) {
			return state.authenticated
		}
	}
}

export default auth


