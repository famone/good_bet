import NewsImage from "./NewsImage";

export default class News
{
	constructor(news) {
		this.id = news['id']
		this.body = news['body']
		this.image = new NewsImage(news['image'])
		this.name = news['name']
		this.preview = news['preview']
		this.publish_date = news['publish_date']
	}
}