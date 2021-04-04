import {API} from '../api'

const bonuses = {
	namespaced: true,
	state: {
		registrationBonuses: [],
		all: []
	},
	mutations: {
		SET_ALL(state, bonuses) {
			state.all = bonuses
		},
		SET_REGISTRATION_BONUSES(state, bonuses) {
			state.registrationBonuses = bonuses
		},
	},
	actions: {
		loadRegistrationBonuses({commit}, currencyId) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonuses', {
					params: {
						activation_event: 'registration',
						currency_id: currencyId,
						expand: 'banners, budgets, accrual_rules, wagering_rules, free_spin_rules',
					}
				}).then(response => {
					commit('SET_REGISTRATION_BONUSES', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
		loadAll({commit}) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonuses', {
					params: {
						expand: 'banners, budgets, accrual_rules, wagering_rules, free_spin_rules',
					}
				}).then(response => {
					commit('SET_ALL', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
	},
	getters: {
		getAll(state) {
			return state.all
		},
		getRegistrationBonuses(state) {
			return state.registrationBonuses
		}
	}
}

export default bonuses
