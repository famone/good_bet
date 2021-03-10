import {API} from '../api'

const bonus = {
	namespaced: true,
	state: {
		bonus: null
	},
	mutations: {
		SET_BONUS(state, bonus) {
			state.bonus = bonus
		}
	},
	actions: {
		loadBonusById({commit}, bonusId) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonuses/' + bonusId, {
					params: {
						expand: 'banners, budgets, accrual_rules, wagering_rules, free_spin_rules',
					}
				}).then(response => {
					commit('SET_BONUS', response.data)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
	},
	getters: {
		getBonus(state) {
			return state.bonus
		}
	}
}

export default bonus
