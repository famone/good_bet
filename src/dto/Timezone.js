export default class Timezone
{
	constructor(timezone) {
		this.id = timezone['id']
		this.code = timezone['code']
		this.name = timezone['name']
	}
}