import Account from "./Account";
import AbstractDtoCollection from "../AbstractDtoCollection";

export default class AccountCollection extends AbstractDtoCollection
{
	static buildDto(account) {
		return new Account(account)
	}
}