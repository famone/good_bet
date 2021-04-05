import {API} from '../api'

const slider = {
	namespaced: true,
	state: {
		all: [],
		main: []
	},
	mutations: {
		SET_ALL(state, payload) {
			state.all = payload
		},
		SET_MAIN(state, payload) {
			state.main = payload
		}
	},
	actions: {
		loadMain({commit}) {
			return new Promise((resolve, reject) => {
				API.get('sliders', {
					params: {
						place_id: 2
					}
				}).then(res => {
					commit('SET_MAIN', res.data)

					resolve(res)
				}).catch(error => {
					reject(error)
				})
			});
		},
		loadAll({commit}) {
			return new Promise((resolve, reject) => {
				API.get('sliders').then(res => {
					commit('SET_ALL', res.data)

					resolve(res)
				}).catch(error => {
					reject(error)
				})
			});
		}
	},
	getters: {
		getAll(state) {
			return state.all
		},
		getMain(state) {
			return state.main
		},
	}
}

export default slider
