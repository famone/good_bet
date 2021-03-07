
export default class Field
{
	constructor(field) {
		this.id = field['id']
		this.inputs = field['inputs']
		this.is_composite = field['is_composite']
		this.is_required = field['is_required']
		this.order = field['order']
		this.type = field['type']
	}

	getRenderType() {
		return this.type
	}
}