import {API} from '../api'

const bonuses = {
	namespaced: true,
	state: {
		registrationBonuses: []
	},
	mutations: {
		SET_REGISTRATION_BONUSES(state, bonuses) {
			state.registrationBonuses = bonuses
		},
	},
	actions: {
		loadRegistrationBonuses({commit}) {
			return new Promise((resolve, reject) => {
				API.get('lab/bonuses', {
					params: {
						activation_event: 'registration'
					}
				}).then(response => {
					commit('SET_REGISTRATION_BONUSES', response.data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			});
		},
	},
	getters: {
		getRegistrationBonuses(state) {
			return state.registrationBonuses
		}
	}
}

export default bonuses
