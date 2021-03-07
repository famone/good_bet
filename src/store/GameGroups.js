import {API} from '../api'

const gameGroups = {
	namespaced: true,
	state: {
		main: []
	},
	mutations: {
		SET_MAIN(state, payload) {
			state.main = payload
		}
	},
	actions: {
		loadMain({commit}) {
			return new Promise((resolve, reject) => {
				API.get('game-groups', {
					params: {
						place_code: 'headline',
						expand: 'images,platform,place_code',
					}
				}).then(response => {
					commit('SET_MAIN', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		getMain(state) {
			return state.main
		}
	}
}

export default gameGroups