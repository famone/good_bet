export default class AbstractDtoCollection
{
	constructor() {
		this.items =  []
		this.length = 0;
	}

	addItem(item) {
		this.items.push(item)
		this.length = this.items.length
	}

	static buildDto(data) {

	}

	find(callback) {
		return this.items.find(callback)
	}

	forEach(callback) {
		return this.items.forEach(callback)
	}

	static createFromArray(array)
	{
		let collection = new this();

		array.forEach(data => {
			collection.addItem(this.buildDto(data))
		})

		return collection;
	}
}