import {API} from '../api'

const bonusTransactions = {
	namespaced: true,
	state: {
		bonusActiveTransactions: [],
		bonusAvailableTransactions: []
	},
	mutations: {
		SET_ACTIVE_BONUS_TRANSACTIONS(state, bonusTransactions) {
			state.bonusActiveTransactions = bonusTransactions
		},
		SET_AVAILABLE_BONUS_TRANSACTIONS(state, bonusTransactions) {
			state.bonusAvailableTransactions = bonusTransactions
		},
	},
	actions: {
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
		getAvailableBonusTransactions(state) {
			return state.bonusAvailableTransactions
		}
	}
}

export default bonusTransactions
