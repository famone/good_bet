import {API} from "../api";
import Transaction from "../dto/Transaction";

const transactions = {
	namespaced: true,
	state: {
		currentTab: 'deposit',
		depositTransactions: [],
		withdrawalTransactions: [],
	},
	mutations: {
		SET_CURRENT_TAB(state, tab) {
			state.currentTab = tab
		},
		SET_DEPOSIT_TRANSACTIONS(state, transactions) {
			transactions.forEach(transaction => {
				state.depositTransactions.push(new Transaction(transaction))
			})
		},
		SET_WITHDRAWAL_TRANSACTIONS(state, transactions) {
			transactions.forEach(transaction => {
				state.withdrawalTransactions.push(new Transaction(transaction))
			})
		}
	},
	actions: {
		switchCurrentTab({commit}, tab)
		{
			commit('SET_CURRENT_TAB', tab)
		},
		loadDepositTransactions({commit})
		{
			API.get('payments', {
				params: {
					direction: 'deposit'
				}
			}).then(result => {
				commit('SET_DEPOSIT_TRANSACTIONS', result.data)
			})
		},
		loadWithdrawalTransactions({commit})
		{
			API.get('payments', {
				params: {
					direction: 'withdrawal'
				}
			}).then(result => {
				commit('SET_WITHDRAWAL_TRANSACTIONS', result.data)
			})
		},
		createDepositTransaction({commit}, transactionData)
		{
			transactionData.direction = "deposit"
			return API.post('payments', transactionData);
		},
		createWithdrawalTransaction({commit}, transactionData)
		{
			transactionData.direction = "withdrawal"
			return API.post('payments', transactionData);
		},
		changeTransactionStatus({commit}, transactionId, status)
		{
			return API.patch('payments/' + transactionId, status)
		}
	},
	getters: {
		getCurrentTab(state) {
			return state.currentTab
		},
		getDepositTransactions(state) {
			return state.depositTransactions
		},
		getWithdrawalTransactions(state) {
			return state.withdrawalTransactions
		},
	}
}

export default transactions
