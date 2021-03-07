import {API} from '../api'

const playerUploadTypes = {
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
				API.get('player-upload-types').then(response => {
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

export default playerUploadTypes
