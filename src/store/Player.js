import {API} from '../api'
import Player from "../dto/Player";
import AuthException from "./AuthException";
import {CasinoLocalStorage} from "../CasinoLocalStorage";
import AccessDeniedException from "./AccessDeniedException";
import Socket from "../socket";

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
				API.get('players', {
					params: {
						expand: 'avatars,accounts,country,timezone'
					}
				}).then(response => {
					commit('SET_CURRENT', response.data[0])

					CasinoLocalStorage.savePlayerData(response.data[0])

					Socket.firePlayerOnlineEvent(this._vm.$socket, response.data[0])

					resolve(response)
				}).catch(error => {
					if (error.response.status === 401) {
						dispatch('auth/logOut', null, {root: true})
						reject(new AuthException())
					} else if(error.response.status === 403) {
						reject(new AccessDeniedException())
					} else {
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
		},
		deleteAccount({dispatch}, data) {
			return new Promise((resolve, reject) => {
				dispatch('loader/enable', null, {root: true})
				API.post('player/delete', data).then(response => {
					resolve(response)
				}).catch(error => {
					dispatch('loader/disable', null, {root: true})

					reject(error)
				})
			});
		},
		restoreAccount({dispatch}, params) {
			return new Promise((resolve, reject) => {
				dispatch('loader/enable', null, {root: true})
				API.post('player/restore', {
					params: params
				}).then(response => {
					resolve(response)
				}).catch(error => {
					dispatch('loader/disable', null, {root: true})

					reject(error)
				})
			});
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
