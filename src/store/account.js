import {API} from '../api'

const account = {
	namespaced: true,
	state: {
		current: null
	},
	mutations: {
		SET_CURRENT(state, payload) {
			state.currnet = payload
		}
	},
	actions: {
		changeAccount({commit}, accountId) {
			let currency = {
				is_current: true
			}

			API.patch(`accounts/${accountId}`, currency).then(function(){
				commit('SET_CURRENT', accountId)
			})
		},
	},
	getters: {
		getCurrent(state) {
			return state.current
		}
	}
}

export default account
