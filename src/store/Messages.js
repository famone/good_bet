import {API} from '../api'

const messages = {
	namespaced: true,
	state: {
		unread: 0,
		total: 0,
		messages: [],
	},
	mutations: {
		SET_UNREAD(state, payload) {
			state.unread = payload
		},
		SET_TOTAL(state, payload) {
			state.total = payload
		},
		SET_MESSAGES(state, payload) {
			state.messages = payload
		}
	},
	actions: {
		getUnreadCount({commit, dispatch}) {
			return new Promise((resolve, reject) => {
				dispatch('counter/load', null, {root: true}).then(response => {
					commit('SET_UNREAD', response.data.messages.unread)
					commit('SET_TOTAL', response.data.messages.total)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})

		},
		loadMessages({commit}) {
			return new Promise((resolve, reject) => {
				API.get('messages').then(response => {
					commit('SET_MESSAGES', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
	},
	getters: {
		getUnread(state) {
			return state.unread
		},
		getTotal(state) {
			return state.total
		},
		getMessages(state) {
			return state.messages
		}
	}

}

export default messages