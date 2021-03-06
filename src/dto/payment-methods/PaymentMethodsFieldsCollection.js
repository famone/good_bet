import PaymentMethodField from "./PaymentMethodField";
import AbstractDtoCollection from "../AbstractDtoCollection";

export default class PaymentMethodsFieldsCollection extends AbstractDtoCollection
{
	static buildDto(field) {
		return new PaymentMethodField(field);
	}
}