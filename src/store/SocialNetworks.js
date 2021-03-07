import {API} from '../api'

const socialNetworks = {
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
				API.get('networks').then(response => {
					commit('SET_ALL', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		deleteById({commit, dispatch}, id) {
			return new Promise((resolve, reject) => {
				API.delete('networks/' + id).then(response => {
					dispatch('socialNetworks/loadAll', null, {root: true});

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

export default socialNetworks
