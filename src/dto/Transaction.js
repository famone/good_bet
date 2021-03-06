export default class Transaction
{
	constructor(transaction) {
		this.id = transaction['id']
		this.account_id = transaction['account_id']
		this.amount = transaction['amount']
		this.amount_as_currency = transaction['amount_as_currency']
		this.comment = transaction['comment']
		this.currency_code = transaction['currency_code']
		this.currency_id = transaction['currency_id']
		this.direction = transaction['direction']
		this.external_id = transaction['external_id']
		this.fee_amount = transaction['fee_amount']
		this.fee_amount_as_currency = transaction['fee_amount_as_currency']
		this.method_id = transaction['method_id']
		this.player_id = transaction['player_id']
		this.redirect_url = transaction['redirect_url']
		this.status = transaction['status']
		this.time_confirm = transaction['time_confirm']
		this.time_confirm_as_iso8601 = transaction['time_confirm_as_iso8601']
		this.time_create = transaction['time_create']
		this.time_create_as_iso8601 = transaction['time_create_as_iso8601']
	}

	getFormattedCreatedDateTime() {
		let date = new Date(this.time_create_as_iso8601).toLocaleDateString()
		let hours = new Date(this.time_create_as_iso8601).getHours()
		let minutes = new Date(this.time_create_as_iso8601).getMinutes()
		return date + ' ' + hours + ":" + minutes
	}
}