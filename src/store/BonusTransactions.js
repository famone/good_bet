import {API} from '../api'

const bonusTransactions = {
	namespaced: true,
	state: {
		bonusActiveTransactions: [],
		bonusSubscribedTransactions: [],
		bonusAllTransactions: []
	},
	mutations: {
		SET_ACTIVE_BONUS_TRANSACTIONS(state, bonusTransactions) {
			state.bonusActiveTransactions = bonusTransactions
		},
		SET_SUBSCRIBED_BONUS_TRANSACTIONS(state, bonusTransactions) {
			state.bonusSubscribedTransactions = bonusTransactions
		},
		SET_ALL_BONUS_TRANSACTIONS(state, bonusTransactions) {
			console.log(bonusTransactions)
			state.bonusAllTransactions = bonusTransactions
		},
	},
	actions: {
		loadAll({commit}) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonus-transactions', {
					params: {
						expand: 'bonus, bonus.banners, bonus.budgets, bonus.accrual_rules, bonus.wagering_rules, bonus.free_spin_rules'
					}
				}).then(response => {
					commit('SET_ALL_BONUS_TRANSACTIONS', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		loadActive({commit}) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonus-transactions', {
					params: {
						status: 'active',
						expand: 'bonus, bonus.banners, bonus.budgets, bonus.accrual_rules, bonus.wagering_rules, bonus.free_spin_rules'
					}
				}).then(response => {
					commit('SET_ACTIVE_BONUS_TRANSACTIONS', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		loadSubscribed({commit}) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonus-transactions', {
					params: {
						status: 'subscribed',
						expand: 'bonus, bonus.banners, bonus.budgets, bonus.accrual_rules, bonus.wagering_rules, bonus.free_spin_rules'
					}
				}).then(response => {
					commit('SET_SUBSCRIBED_BONUS_TRANSACTIONS', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		create({commit}, payload) {
			//TODO refactor this
			return new Promise((resolve, reject) => {
				API.post('lab/bonus-transactions', payload).then(res => {
					console.log(res)

					resolve(res)
				}).catch(error => {

					reject(error)
				})
			})

		}
	},
	getters: {
		getActiveBonusTransactions(state) {
			return state.bonusActiveTransactions
		},
		getSubscribedBonusTransactions(state) {
			return state.bonusSubscribedTransactions
		},
		getAllBonusTransactions(state) {
			return state.bonusAllTransactions
		}
	}
}

export default bonusTransactions
