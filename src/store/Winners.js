import {API} from '../api'

const winners = {
	namespaced: true,
	state: {
		all: []
	},
	mutations: {
		SET_ALL(state, winners) {
			state.all = winners
		}
	},
	actions: {
		loadAll({commit}) {
			return new Promise((resolve, reject) => {
				API.get('winners', {
					params: {
						expand: 'game.images, game.launch_types, game.type',
					}
				}).then(response => {
					commit('SET_ALL', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
	},
	getters: {
		getAll(state) {
			return state.all
		}
	}
}

export default winners
