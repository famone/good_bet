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
			API.get('game-groups', {
				params: {
					place_code: 'headline',
					expand: 'images,platform,place_code',
				}
			}).then(res => {
				commit('SET_MAIN', res.data)
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