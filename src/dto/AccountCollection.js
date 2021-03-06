import Account from "./Account";

export default class AccountCollection
{
	static createFromArray(accountsArray)
	{
		let result = [];

		accountsArray.forEach(accountData => {
			result.push(new Account(accountData))
		})

		return result;
	}
}