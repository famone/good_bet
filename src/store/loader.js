import {API} from '../api'

const loader = {
	namespaced: true,
	state: {
		enabled: false,
		messages: [],
		errors: []
	},
	mutations: {
		SET_ENABLED(state, value) {
			if (!value) {
				state.messages = [];
				state.errors = [];
			}

			state.enabled = value
		},
		ADD_MESSAGE(state, message) {
			state.messages.push(message)
		},
		ADD_ERROR(state, message) {
			state.error.push(message)
		}
	},
	actions: {
		enable({commit}) {
			commit('SET_ENABLED', true)
		},
		disable({commit}) {
			commit('SET_ENABLED', false)
		},
		addMessage({commit}, message) {
			commit('ADD_MESSAGE', message)
		},
		addError({commit}, error) {
			commit('ADD_ERROR', error)
		}
	},
	getters: {
		isEnabled(state) {
			return state.enabled
		}
	}
}

export default loader