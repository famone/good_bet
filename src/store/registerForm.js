import {API} from '../api'

const registerForm = {
	namespaced: true,
	state: {
		defaultFields: [
			{
				fields: []
			}
		],
	},
	mutations: {
		SET_DEFAULT_FIELDS(state, fields) {
			state.defaultFields = fields
		},
	},
	actions: {
		loadDefaultFields({commit, dispatch}) {
			API.get('player-forms').then(response => {
				commit('SET_DEFAULT_FIELDS', response.data)
				let isBonusEnable = response.data[0].fields.find(item => {
					return item.type === 'bonus'
				})

				if (isBonusEnable) {
					dispatch('bonuses/loadRegistrationBonuses', null, {root: true})
				}
			})
		},
	},
	getters: {
		getDefaultFields(state) {
			return state.defaultFields
		}
	}
}

export default registerForm
