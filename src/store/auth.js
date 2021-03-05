const auth = {
	namespaced: true,
	state: {
		authenticated: false,
	},
	mutations: {
		CHANGE_AUTH(state, payload) {
			state.authenticated = payload
		}
	},
	actions: {
		setAuthenticated({commit}, value) {
			commit('CHANGE_AUTH', value)
		},
		logOut({dispatch}) {
			dispatch('auth/setAuthenticated', false, {root: true})
			dispatch('player/logOut', null, {root: true})
			localStorage.removeItem("player");
			localStorage.removeItem("userToken");
		}
	},
	getters: {
		getAuthenticated(state) {
			return state.authenticated
		}
	}
}

export default auth


