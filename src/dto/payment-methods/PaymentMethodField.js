export default class PaymentMethodField
{
	constructor(field) {
		this.code = field['code']
		this.help_message = field['help_message']
		this.id = field['id']
		this.is_required = field['is_required']
		this.name = field['name']
		this.regexp = field['regexp']
	}
}