import FieldCollection from "./FieldCollection";
import InputFieldCollection from "./InputFieldCollection";

export default class Form
{
	constructor(form) {
		this.id = form['id']
		this.fields = FieldCollection.createFromArray(form['fields'])
		this.buildInputs()

	}

	buildInputs() {
		let inputs =[]
		this.fields.forEach(field => {
			field.inputs.forEach(input => {
				inputs.push({
					id: field.id,
					label: input.label,
					name: input.name,
					type: field.getRenderType()
				})
			})
		})

		this.inputs = InputFieldCollection.createFromArray(inputs)
	}
}