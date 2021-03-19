
export default class Input
{
	getHiddenInputNames() {
		return [

		]
	}

	getCurrencyInputNames() {
		return [
			'currency_code',
		]
	}

	getTermsAndCondionsInputNames() {
		return [
			'confirm_terms',
		]
	}

	getCheckboxInputNames() {
		return [
			'subscription_email',
			'subscription_phone'
		]
	}

	getCaptchaInputNames() {
		return [
			'recaptcha_response',
		]
	}

	getBonusInputNames() {
		return [
			'registration_bonus_id',
		]
	}

	getTextInputTypes() {
		return [
			'email',
			'password',
			'phone',
		]
	}

	constructor(input) {
		this.id = input.id
		this.type = input.type
		this.label = input.label
		this.name = input.name
		this.value = null
		this.errors = []
	}

	onInputUpdate(event) {
		if (this.type === 'password') {
			this.value = btoa(event.target.value)
		}
		else {
			this.value = event.target.value
		}
	}

	clearErrors() {
		this.errors = []
	}

	addError(error) {
		this.errors.push(error)
	}

	isCurrency() {
		return this.getCurrencyInputNames().includes(this.name)
	}

	isCheckbox() {
		return this.getCheckboxInputNames().includes(this.name)
	}

	isTermsAndConditions() {
		return this.getTermsAndCondionsInputNames().includes(this.name)
	}

	isCaptcha() {
		return this.getCaptchaInputNames().includes(this.name)
	}

	isBonus() {
		return this.getBonusInputNames().includes(this.name)
	}

	isHidden() {
		return this.getHiddenInputNames().includes(this.name)
	}
}