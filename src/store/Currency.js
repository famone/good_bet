import {API} from '../api'

const currency = {
	namespaced: true,
	state: {
		all: [],
		notForCurrentUser: []
	},
	mutations: {
		SET_ALL(state, payload) {
			state.all = payload
		},
		SET_NOT_FOR_CURRENT_USER(state, payload) {
			state.notForCurrentUser = payload
		}
	},
	actions: {
		loadAll({commit}) {
			return new Promise((resolve, reject) => {
				API.get('payment-currencies').then(response => {
					commit('SET_ALL', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		loadNotForCurrentUser({commit}) {
			return new Promise((resolve, reject) => {
				API.get('payment-currencies', {
					params: {
						has_accounts: false,
					}
				}).then(response => {
					commit('SET_NOT_FOR_CURRENT_USER', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		getAll(state) {
			return state.all
		},
		getAvailableCurrencies(state) {
			return state.notForCurrentUser
		}
	}
}

export default currency