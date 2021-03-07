import {API} from '../api'

const counter = {
	namespaced: true,
	state: {
		counter: null
	},
	mutations: {
		SET_COUNTER(state, payload) {
			state.counter = payload
		}
	},
	actions: {
		load({commit}) {
			return new Promise((resolve, reject) => {
				API.get('counters').then(response => {
					commit('SET_COUNTER', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})

		}
	},
	getters: {
		get(state) {
			return state.counter
		}
	}
}

export default counter