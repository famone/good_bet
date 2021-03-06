import PaymentMethodField from "./PaymentMethodField";
import PaymentMethodsImage from "./PaymentMethodsImage";

export default class PaymentMethodsImagesCollection
{
	static createFromArray(array)
	{
		let result = [];

		array.forEach(data => {
			result.push(new PaymentMethodsImage(data))
		})

		return result;
	}
}