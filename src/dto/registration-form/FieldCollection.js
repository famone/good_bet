import AbstractDtoCollection from "../AbstractDtoCollection";
import Field from "./Field";

export default class FieldCollection extends AbstractDtoCollection {
	static buildDto(field) {
		return new Field(field)
	}
}