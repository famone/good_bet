import {API} from '../api'
import Player from "../dto/Player";

const player = {
	namespaced: true,
	state: {
		current: null
	},
	mutations: {
		SET_CURRENT(state, player) {
			if (player === null) {
				state.current = null
			} else {
				state.current = new Player(player)
			}
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
		/**
		 * @param state
		 * @returns {Player}
		 */
		getCurrent(state) {
			return state.current
		}
	}
}

export default player
