import {API} from '../api'
import Socket from "../socket";

const gameLauncher = {
	namespaced: true,
	state: {
		launcher: null
	},
	mutations: {
		SET_LAUNCHER(state, payload) {
			state.launcher = payload
		}
	},
	actions: {
		createDemo({commit}, gameId) {
			return new Promise((resolve, reject) => {
				API.post('game-launches', {
					game_id: gameId,
					launch_type: "demo"
				}).then(response => {
					commit('SET_LAUNCHER', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		createReal({commit, rootGetters}, gameId) {
			return new Promise((resolve, reject) => {
				API.post('game-launches', {
					game_id: gameId,
					launch_type: "real"
				}).then(response => {
					commit('SET_LAUNCHER', response.data)

					Socket.firePlayerRealGameEvent(this._vm.$socket, rootGetters["player/getCurrent"])

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteLauncher({commit}) {
			commit('SET_LAUNCHER', null)
		}
	},
	getters: {
		get(state) {
			return state.launcher
		}
	}
}

export default gameLauncher