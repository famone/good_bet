import Avatar from "./Avatar";

export default class AvatarsCollection
{
	static createFromArray(accountsArray)
	{
		let result = [];

		accountsArray.forEach(avatarData => {
			result.push(new Avatar(avatarData))
		})

		return result;
	}
}