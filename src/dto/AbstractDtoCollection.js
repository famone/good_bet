export default class AbstractDtoCollection
{
	static buildDto(data) {

	}

	static createFromArray(array)
	{
		let result = [];

		array.forEach(data => {
			result.push(this.buildDto(data))
		})

		return result;
	}
}