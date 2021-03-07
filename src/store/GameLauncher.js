import {API} from '../api'
import game from "./Game";

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
		createReal({commit}, gameId) {
			return new Promise((resolve, reject) => {
				API.post('game-launches', {
					game_id: gameId,
					launch_type: "real"
				}).then(response => {
					commit('SET_LAUNCHER', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadById({commit}, id) {
			return new Promise((resolve, reject) => {

			})

		}
	},
	getters: {
		get(state) {
			return state.launcher
		}
	}
}

export default gameLauncher