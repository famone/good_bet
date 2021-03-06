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

			dispatch('loader/enable', null, {root: true})

			API.patch(`accounts/${accountId}`, {
				is_current: true
			}).then(function () {
				dispatch('loader/disable', null, {root: true})
				commit('SET_CURRENT_ID', accountId)
			})
		},
		createAccount({dispatch}, params) {
			dispatch('loader/enable', null, {root: true})

			API.post('accounts', params).then(() => {
				dispatch('player/loadCurrent', null, {root: true})
				dispatch('currency/loadNotForCurrentUser', null, {root: true})
				dispatch('loader/disable', null, {root: true})
			}).catch(() => {
				dispatch('loader/disable', null, {root: true})
			})
		}
	},
	getters: {
		getCurrentId(state) {
			return state.currentId
		}
	}
}

export default account
