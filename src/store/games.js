import {API} from '../api'

const games = {
	namespaced: true,
	state: {
		all: [],
		popularGames: [],
		slotsGames: [],
		recommendedGames: [],
	},
	mutations: {
		SET_ALL(state, payload) {
			state.all = payload
		},
		SET_POPULAR(state, payload) {
			state.popularGames = payload
		},
		SET_SLOTS(state, payload) {
			state.slotsGames = payload
		},
		SET_RECOMMENDED(state, payload) {
			state.recommendedGames = payload
		},
	},
	actions: {
		loadAll({commit}) {
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical'
				}
			}).then(res => {
				commit('SET_ALL', res.data)
			})
		},
		loadPopular({commit}) {
			// popular games
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical',
					group_id: 115,
				}
			}).then(res => {
				commit('SET_POPULAR', res.data)
			})
		},
		loadSlots({commit}) {
			// slots games
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical',
					group_id: 126,
				}
			}).then(res => {
				commit('SET_SLOTS', res.data)
			})
		},
		loadRecommended({commit}) {
			// recommended games
			API.get('games', {
				params: {
					expand: 'details,launch_types,images,type,provider,canonical',
					group_id: 124,
				}
			}).then(res => {
				commit('SET_RECOMMENDED', res.data)
			})
		},
	},
	getters: {
		getAll(state) {
			return state.all
		},
		getPopular(state) {
			return state.popularGames
		},
		getSlots(state) {
			return state.slotsGames
		},
		getRecommended(state) {
			return state.recommendedGames
		},
	}
}

export default games