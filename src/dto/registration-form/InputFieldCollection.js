import AbstractDtoCollection from "../AbstractDtoCollection";
import Input from "./Input";

export default class InputFieldCollection extends AbstractDtoCollection {
	static buildDto(input) {
		return new Input(input)
	}

	clearErrors() {
		this.forEach(input => {
			input.clearErrors()
		})
	}

	addErrorsFromArray(errors) {
		errors.forEach(item => {
			this.find((input, index) => {
				if (input.name === item.field) {
					input.addError(item.message)
				}
			})
		})
	}
}