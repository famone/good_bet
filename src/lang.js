import en from "./locals/en.json";
import ru from "./locals/ru.json";
import {API} from "./api";

class LangConfig {
	defaultLang() {
		return 	process.env.CASINO_APP_I18N_DEFAULT_LOCALE;
	};
	currentLang() {
		return this.defaultLang();
	};
	static setAcceptLanguageInApiHeader(locale) {
		//TODO rewrite this
		if (this.$root.$i18n.locale !== locale) {
			API.defaults.headers.common['Accept-Language'] = locale
			this.$root.$i18n.locale = locale;
		}
	};
	buildParams() {
		return {
			locale: this.currentLang(),
			messages: {
				"en": en,
				"ru": ru
			}
		}
	}

}



export {LangConfig}