import {API} from '../api'

const infoPages = {
	namespaced: true,
	state: {
		all: null,
		responsibleGaming: null,
		about: null
	},
	mutations: {
		SET_ALL(state, payload) {
			state.all = payload
		},
		SET_RESPONSIBLE_GAMING(state, payload) {
			state.responsibleGaming = payload
		},
		SET_ABOUT(state, payload) {
			state.about = payload
		}
	},
	actions: {
		loadAll({commit}) {
			return new Promise((resolve, reject) => {
				API.get('info-pages').then(response => {
					commit('SET_ALL', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadResponsibleGamingPage({commit}) {
			return new Promise((resolve, reject) => {
				API.get('info-pages', {
					params: {
						slug:'responsible-gaming'
					}
				}).then(response => {
					commit('SET_RESPONSIBLE_GAMING', response.data[0])
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadAboutPage({commit}) {
			return new Promise((resolve, reject) => {
				API.get('info-pages', {
					params: {
						slug:'about'
					}
				}).then(response => {
					commit('SET_ABOUT', response.data[0])
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		getAll(state) {
			return state.all
		},
		getResponsibleGaming(state) {
			return state.responsibleGaming
		},
		getAbout(state) {
			return state.about
		}
	}
}

export default infoPages