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
			API.get('payment-currencies')
				.then(response => {
					commit('SET_ALL', response.data)
				})
		},
		loadNotForCurrentUser({commit}) {
			API.get('payment-currencies', {
				params: {
					has_accounts: false,
				}
			}).then(response => {
				commit('SET_NOT_FOR_CURRENT_USER', response.data)
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