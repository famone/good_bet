import {API} from '../api'

const game = {
	namespaced: true,
	state: {
		game: null
	},
	mutations: {
		SET_GAME(state, payload) {
			state.game = payload
		}
	},
	actions: {
		loadById({commit}, id) {
			return new Promise((resolve, reject) => {
				API.get('games/' + id).then(response => {
					commit('SET_GAME', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		get(state) {
			return state.game
		}
	}
}

export default game