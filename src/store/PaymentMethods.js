import {API} from "../api";
import PaymentMethod from "../dto/payment-methods/PaymentMethod";
import PaymentMethodsCollection from "../dto/payment-methods/PaymentMethodsCollection";

const paymentMethod = {
	namespaced: true,
	state: {
		depositMethods: [],
		withdrawalMethods: [],
	},
	mutations: {
		SET_DEPOSIT_METHODS(state, methods) {
			state.depositMethods = PaymentMethodsCollection.createFromArray(methods);
		},
		SET_WITHDRAWAL_METHODS(state, methods) {
			state.withdrawalMethods = PaymentMethodsCollection.createFromArray(methods)
		},
	},
	actions: {
		loadDepositMethods({commit})
		{
			API.get('payment-methods', {
				params: {
					expand: 'fields,images',
					direction: 'deposit',
				}
			}).then(result => {
				commit('SET_DEPOSIT_METHODS', result.data)
			})
		},
		loadWithdrawalMethods({commit})
		{
			API.get('payment-methods', {
				params: {
					expand: 'fields,images',
					direction: 'withdrawal',
				}
			}).then(result => {
				commit('SET_WITHDRAWAL_METHODS', result.data)
			})
		}
	},
	getters: {
		/**
		 * @param state
		 * @returns {PaymentMethod[]}
		 */
		getDepositMethods(state) {
			return state.depositMethods
		},
		getWithdrawalMethods(state) {
			return state.withdrawalMethods
		},
	}
}

export default paymentMethod
