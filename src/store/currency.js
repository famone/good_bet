import {API} from '../api'

const currency = {
	namespaced: true,
	state: {
		all: []
	},
	mutations: {
		SET_ALL(state, payload) {
			state.all = payload
		}
	},
	actions: {
		loadAll({commit}) {
			API.get('payment-currencies')
				.then(response => {
					commit('SET_ALL', response.data)
				})
		}
	},
	getters: {
		getAll(state) {
			return state.all
		}
	}
}

export default currency