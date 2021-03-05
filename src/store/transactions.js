const transactions = {
	namespaced: true,
	state: {
		currentTab: 'deposit'
	},
	mutations: {
		SET_CURRENT_TAB(state, tab) {
			state.currentTab = tab
		}
	},
	actions: {
		switchCurrentTab({commit}, tab)
		{
			commit('SET_CURRENT_TAB', tab)
		}
	},
	getters: {
		getCurrentTab(state) {
			return state.currentTab
		}
	}
}

export default transactions
