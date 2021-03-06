export default class Account
{
	constructor(account) {
		this.id = account['id']
		this.amount = account['amount']
		this.amount_as_currency = account['amount_as_currency']
		this.available_amount = account['available_amount']
		this.available_amount_as_currency = account['available_amount_as_currency']
		this.bonus_left = account['bonus_left']
		this.bonus_left_as_currency = account['bonus_left_as_currency']
		this.currency_code = account['currency_code']
		this.currency_id = account['currency_id']
		this.has_tickets = account['has_tickets']
		this.is_current = account['is_current']
		this.player_id = account['player_id']
		this.wallet_status = account['wallet_status']
	}

	getFormattedAmount() {
		return this.amount.toLocaleString();
	}
}