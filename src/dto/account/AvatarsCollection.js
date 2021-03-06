import Avatar from "./Avatar";
import AbstractDtoCollection from "../AbstractDtoCollection";

export default class AvatarsCollection extends AbstractDtoCollection
{
	static buildDto(avatar) {
		return new Avatar(avatar)
	}
}