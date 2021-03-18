import {API} from '../api'
import FieldCollection from "../dto/registration-form/FieldCollection";
import Form from "../dto/registration-form/Form";
import InputFieldCollection from "../dto/registration-form/InputFieldCollection";

const registerForm = {
	namespaced: true,
	state: {
		form: null
	},
	mutations: {
		SET_DEFAULT_FORM(state, form) {
			state.form = new Form(form)
		},
	},
	actions: {
		loadDefaultFields({commit, dispatch}) {
			return new Promise((resolve, reject) => {
				API.get('player-forms').then(response => {
					commit('SET_DEFAULT_FORM', response.data[0])
					let isBonusEnable = response.data[0].fields.find(item => {
						return item.type === 'bonus'
					})

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})

		},
		submit({commit}, formInputs) {
			formInputs.clearErrors()
			return new Promise((resolve, reject) => {
				API.post('players', {
					form: {
						id: 1,
						fields: [
							{
								inputs: formInputs.items
							}
						]
					}
				}).then(response => {
					resolve(response)
				}).catch(error => {
					formInputs.addErrorsFromArray(error.response.data)
					reject(error)
				})
			})
		}
	},
	getters: {
		/**
		 * @param state
		 * @returns {FieldCollection}
		 */
		getDefaultFields(state) {
			return state.form ? state.form.fields : []
		},
		getDefaultFormInputs(state) {
			return state.form ? state.form.inputs : new InputFieldCollection();
		}
	}
}

export default registerForm
