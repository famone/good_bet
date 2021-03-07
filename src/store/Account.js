import {API} from '../api'

const account = {
	namespaced: true,
	state: {
		currentId: null
	},
	mutations: {
		SET_CURRENT_ID(state, payload) {
			state.currentId = payload
		}
	},
	actions: {
		changeAccount({commit, dispatch}, accountId) {
			return new Promise((resolve, reject) => {
				dispatch('loader/enable', null, {root: true})

				API.patch(`accounts/${accountId}`, {
					is_current: true
				}).then(response => {
					dispatch('loader/disable', null, {root: true})
					dispatch('player/loadCurrent', null, {root: true})
					commit('SET_CURRENT_ID', accountId)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		createAccount({dispatch}, params) {
			return new Promise((resolve, reject) => {
				dispatch('loader/enable', null, {root: true})

				API.post('accounts', params).then(response => {
					dispatch('player/loadCurrent', null, {root: true})
					dispatch('currency/loadNotForCurrentUser', null, {root: true})
					dispatch('loader/disable', null, {root: true})

					resolve(response)
				}).catch(error => {
					dispatch('loader/disable', null, {root: true})

					reject(error)
				})
			});
		}
	},
	getters: {
		getCurrentId(state) {
			return state.currentId
		}
	}
}

export default account
