import {API} from '../api'

const auth = {
	namespaced: true,
	state: {
		authenticated: false,
		regFields: [
			{
				fields: []
			}
		],
		regBonuses: [],
		player: null,
		switchDepo: true,
	},
	mutations: {

		SET_REG_FIELDS(state, payload) {
			state.regFields = payload
		},
		SET_REG_BONUSES(state, payload) {
			state.regBonuses = payload
		},
		SET_PLAYER(state, payload) {
			state.player = payload
		},
		LOG_OUT(state) {
			state.player = null
		},
		SET_FIELD(state, payload) {
			state.player[payload.name] = payload.value
		},
		CHANGE_AUTH(state, payload) {
			state.authenticated = payload
		},
		SET_DEPOSWITCH(state, payload) {
			state.switchDepo = payload
		},
	},
	actions: {
		getUser({commit, dispatch, state}) {
			commit('CHANGE_AUTH', true)
			API.loadPlayer().then(response => {
				commit('SET_PLAYER', response.data[0])
				localStorage.setItem("player", JSON.stringify(response.data[0]));
			})
		},
		loadRegFields({commit, dispatch, state}) {
			API.get('player-forms')
				.then(res => {
					commit('SET_REG_FIELDS', res.data)
				})
		},
		loadRegistrationBonuses({commit}) {
			API.get('lab/bonuses', {
				params: {
					activation_event: 'registration'
				}
			}).then(response => {
				commit('SET_REG_BONUSES', response.data)
			})
		},
		logOut({commit, state}) {
			commit('CHANGE_AUTH', false)
			localStorage.removeItem("player");
			localStorage.removeItem("userToken");
			commit('LOG_OUT')
		},
		CHANGE_FIELD({commit}, payload) {
			commit('SET_FIELD', payload)
		},
		changeAccount({commit}, payload) {
			let currency = {
				is_current: true
			}

			API.patch(`accounts/${payload}`, currency)
		},
		depoSwitcher({commit}, payload) {
			commit('SET_DEPOSWITCH', payload)
		}
	},
	getters: {
		getRegFields(state) {
			return state.regFields
		},
		getRegBonuses(state) {
			return state.regBonuses
		},
		getPlayer(state) {
			return state.player
		},
		getAuthenticated(state) {
			return state.authenticated
		},
		getSwitchDepo(state) {
			return state.switchDepo
		}
	}
}

export default auth


