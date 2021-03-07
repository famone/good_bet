import {API} from '../api'

const playerUpload = {
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
				API.get('player-uploads', {
					params: {
						expand: 'type'
					}
				}).then(response => {
					this.documents = response.data

					commit('SET_ALL', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});

		},
		upload({commit, dispatch}, data) {
			return new Promise((resolve, reject) => {
				API.post('player-uploads', data).then(response => {
					dispatch('loadAll')

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

export default playerUpload
