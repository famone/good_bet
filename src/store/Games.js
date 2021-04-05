import {API} from '../api'

const games = {
	namespaced: true,
	state: {
		all: [],
		favorites: [],
		searchResult: [],
		popularGames: [],
		slotsGames: [],
		recommendedGames: []
	},
	mutations: {
		SET_ALL(state, payload) {
			state.all = payload
		},
		SET_FAVORITES(state, payload) {
			state.favorites = payload
		},
		SET_SEARCH_RESULT(state, payload) {
			state.searchResult = payload
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
			return new Promise((resolve, reject) => {
				API.get('games', {
					params: {
						expand: 'details,launch_types,images,type,provider,canonical'
					}
				}).then(response => {
					commit('SET_ALL', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadFavorites({commit}) {
			return new Promise((resolve, reject) => {
				API.get('games', {
					params: {
						expand: 'images, launch_types, type',
						favorite: true
					}
				}).then(response => {
					commit('SET_FAVORITES', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadPopular({commit}) {
			return new Promise((resolve, reject) => {
				API.get('games', {
					params: {
						expand: 'details,launch_types,images,type,provider,canonical',
						popularity: 1,
					}
				}).then(response => {
					commit('SET_POPULAR', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadSlots({commit}) {
			return new Promise((resolve, reject) => {
				API.get('games', {
					params: {
						expand: 'details,launch_types,images,type,provider,canonical',
						group_id: 126,
					}
				}).then(response => {
					commit('SET_SLOTS', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		loadRecommended({commit}) {
			return new Promise((resolve, reject) => {
				API.get('games', {
					params: {
						expand: 'details,launch_types,images,type,provider,canonical',
						group_id: 124,
					}
				}).then(response => {
					commit('SET_RECOMMENDED', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		searchGame({commit}, needleGame) {
			return new Promise((resolve, reject) => {
				API.get('games', {
					params: {
						expand: 'images',
						q: needleGame
					}
				}).then(response => {
					commit('SET_SEARCH_RESULT', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		emptySearch({commit}) {
			commit('SET_SEARCH_RESULT', [])
		},
		likeGameById({commit}, id) {
			return new Promise((resolve, reject) => {
				API.patch('games/' + id, {
					is_favorite: true
				}).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});

		},
		unLikeGameById({commit}, id) {
			return new Promise((resolve, reject) => {
				API.patch('games/' + id, {
					is_favorite: false
				}).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		}
	},
	getters: {
		getAll(state) {
			return state.all
		},
		getFavorites(state) {
			return state.favorites
		},
		getSearchResult(state) {
			return state.searchResult
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