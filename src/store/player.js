import {API} from '../api'

const player = {
	namespaced: true,
	state: {
		current: null
	},
	mutations: {
		SET_CURRENT(state, payload) {
			state.current = payload
		},
		UPDATE_FIELD(state, field) {
			state.current[field.name] = field.value
		}
	},
	actions: {
		loadCurrent({commit, dispatch}) {
			dispatch('auth/setAuthenticated', true, {root: true})
			API.loadPlayer().then(response => {
				commit('SET_CURRENT', response.data[0])
				localStorage.setItem("player", JSON.stringify(response.data[0]));
			})
		},
		logOut({commit}) {
			commit('SET_CURRENT', null)
		},
		updateDataProperty({commit}, field) {
			commit('UPDATE_FIELD', field)
		}
	},
	getters: {
		getCurrent(state) {
			return state.current
		}
	}
}

export default player
