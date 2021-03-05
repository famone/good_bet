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
			API.get('lab/bonuses', {
				params: {
					activation_event: 'registration'
				}
			}).then(response => {
				commit('SET_REGISTRATION_BONUSES', response.data)
			})
		},
	},
	getters: {
		getRegistrationBonuses(state) {
			return state.registrationBonuses
		}
	}
}

export default bonuses
