import {API} from '../api'

const faq = {
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
			API.get('faq-items')
				.then(response => {
					console.log(response.data)
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

export default faq