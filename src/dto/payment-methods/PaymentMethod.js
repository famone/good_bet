import PaymentMethodsFieldsCollection from "./PaymentMethodsFieldsCollection";
import PaymentMethodsImagesCollection from "./PaymentMethodsImagesCollection";

export default class PaymentMethod
{
	constructor(method) {
		this.id = method['id']
		this.description = method['description']
		this.direction = method['direction']
		this.fields = PaymentMethodsFieldsCollection.createFromArray(method['fields'])
		this.images = PaymentMethodsImagesCollection.createFromArray(method['images'])
		this.is_active = method['is_active']
		this.name = method['name']
		this.order = method['order']
	}
}