import PaymentMethodField from "./PaymentMethodField";

export default class PaymentMethodsFieldsCollection
{
	static createFromArray(array)
	{
		let result = [];

		array.forEach(data => {
			result.push(new PaymentMethodField(data))
		})

		return result;
	}
}