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
			return new Promise((resolve, reject) => {
				//TODO fix hardcode
				API.get('countries?per-page=400').then(response => {
					commit('SET_ALL', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		}
	},
	getters: {
		getAll(state) {
			return state.all
		}
	}
}

export default countries
