<template>
  <div class="locale-changer">
    <select v-model="$root.$i18n.locale" @change="switchLocale">
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
    switchLocale($event) {
      this.$store.dispatch('auth/setLang', $event.target.value).then(r => {
        localStorage.setItem('selectedLang', $event.target.value)
      })
    }
  },
}
</script>


<style>
.locale-changer select{
  text-transform: uppercase;
    color: #fff;
    font-size: 16px;
    background-color: #0c0b25;
    padding: 13px 10px;
    margin-top: 4px;
    border-radius: 4px;
    background-image: url(/downarr.svg?bce4343…)!important;
    background-repeat: no-repeat!important;
    -webkit-background-size: 10px!important;
    background-size: 10px!important;
    background-position: right 5px center!important;
    -webkit-appearance: none!important;
    -moz-appearance: none!important;
    padding-right: 20px;
    border:none;
}
</style>