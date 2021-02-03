<template>
  <div class="locale-changer">
    <select v-model="$root.$i18n.locale">
      <option v-for="(lang, i) in locales" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
import {API} from "../../api";
import {LangConfig, LangParams} from "../../lang";

export default {
  data () {
    return {
      locales: process.env.CASINO_APP_I18N_SUPPORTED_LOCALE.split(',')
    }
  },
  methods: {
    switchLocale(locale) {
      LangConfig.setAcceptLanguageInApiHeader(locale)
    }
  },
}
</script>
