import PaymentMethodsImage from "./PaymentMethodsImage";
import AbstractDtoCollection from "../AbstractDtoCollection";

export default class PaymentMethodsImagesCollection extends AbstractDtoCollection
{
	static buildDto(image)
	{
		return new PaymentMethodsImage(image)
	}
}