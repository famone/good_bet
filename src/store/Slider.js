import {API} from '../api'

const slider = {
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
			API.get('sliders')
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

export default slider
