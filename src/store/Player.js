import {API} from '../api'
import Player from "../dto/Player";
import AuthException from "./AuthException";

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
			return new Promise((resolve, reject) => {
				API.loadPlayer().then(response => {
					commit('SET_CURRENT', response.data[0])
					localStorage.setItem("player", JSON.stringify(response.data[0]));

					resolve(response)
				}).catch(error => {
					if (error.response.status === 401) {
						dispatch('auth/logOut', null, {root: true})
						reject(new AuthException())
					}
					else {
						reject(error)
					}
				})
			});

		},
		updateData({commit, dispatch}, data) {
			return new Promise((resolve, reject) => {

				API.patch('players/' + data.form.id, data).then(response => {
					dispatch('player/loadCurrent', null, {root: true})

					resolve(response)
				}).catch(error => {
					reject(error)
				})
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
