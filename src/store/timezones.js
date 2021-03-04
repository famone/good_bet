import {API} from '../api'

const timezones = {
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
			API.get('timezones?per-page=400')
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

export default timezones
