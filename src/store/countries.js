import {API} from '../api'

const countries = {
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
			//TODO fix hardcode
			API.get('countries?per-page=400')
				.then(res => {
					commit('SET_ALL', res.data)
				})
		}
	},
	getters: {
		getAll(state) {
			return state.all
		}
	}
}

export default countries
