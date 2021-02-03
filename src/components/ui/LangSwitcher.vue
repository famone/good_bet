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
export default {
  data () {
    return {
      locales: process.env.CASINO_APP_I18N_SUPPORTED_LOCALE.split(',')
    }
  },
  methods: {
    switchLocale(locale) {
      console.log(this.$root.$i18n.locale);
      if (this.$root.$i18n.locale !== locale) {
        this.$root.$i18n.locale = locale;
      }
    }
  },
}
</script>

<style scoped>
li {
  text-decoration: underline;
  color: #459CE7;
  cursor: pointer;
}
</style>