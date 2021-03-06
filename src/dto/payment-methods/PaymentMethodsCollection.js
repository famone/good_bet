import AbstractDtoCollection from "../AbstractDtoCollection";
import PaymentMethod from "./PaymentMethod";

export default class PaymentMethodsCollection extends AbstractDtoCollection {
	static buildDto(paymentMethod) {
		return new PaymentMethod(paymentMethod)
	}
}