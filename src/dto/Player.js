import AccountCollection from "./account/AccountCollection";
import AvatarsCollection from "./account/AvatarsCollection";
import Country from "./Country";
import Timezone from "./Timezone";

export default class Player
{
	constructor(player) {
		this.id = player['id']
		this.accounts = AccountCollection.createFromArray(player['accounts'])
		this.address = player['address']
		this.avatars = AvatarsCollection.createFromArray(player['avatars'])
		this.birthdate = player['birthdate']
		this.bonuses_allowed = player['bonuses_allowed'];
		this.casino_id = player['casino_id']
		this.city = player['city']
		this.country = player['country'] ? new Country(player['country']) : null
		this.country_id = player['country_id']
		this.default_language = player['default_language']
		this.email = player['email']
		this.form_id = player['form_id']
		this.gender = player['gender']
		this.is_changed_email = player['is_changed_email']
		this.is_changed_phone = player['is_changed_phone']
		this.is_confirmed_email = player['is_confirmed_email']
		this.is_confirmed_phone = player['is_confirmed_phone']
		this.is_need_change_password = player['is_need_change_password']
		this.is_subscribe_email = player['is_subscribe_email']
		this.is_subscribe_phone = player['is_subscribe_phone']
		this.is_verified = player['is_verified']
		this.middle_name = player['middle_name']
		this.name = player['name']
		this.nickname = player['nickname']
		this.phone_number = player['phone_number']
		this.postcode = player['postcode']
		this.registration_date = player['registration_date']
		this.registration_date_as_iso8601 = player['registration_date_as_iso8601']
		this.secret_question = player['secret_question']
		this.surname = player['surname']
		this.timezone =  player['timezone'] ? new Timezone(player['timezone']) : null
		this.timezone_id = player['timezone_id']
		this.username = player['username']
	}
}