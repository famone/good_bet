<template>
  <div>
    <Navbar/>

    <section id="about">
      <div class="container">
        <div class="col-lg-6">
          <div class="white-txt" v-html="infoPage.body"></div>
        </div>
        <div class="col-lg-6">
          <h2 class="mb-30">{{ $t('pages.about.title') }}</h2>
          <form class="contact-us" method="post" @submit.prevent="validate">
            <input type="text" :placeholder="$t('pages.about.name')" :class="{errorInp : $v.name.$dirty && !$v.name.required}"
                   v-model="name">
            <input type="text" placeholder="E-mail" v-model="email"
                   :class="{errorInp : ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
            <input
                type="text"
                :placeholder="$t('pages.about.topic')"
                v-model="subject"
                :class="{errorInp : $v.subject.$dirty && !$v.subject.required}"
            >
            <select name=""
                    id=""
                    v-model="section"
                    :class="{errorInp : $v.section.$dirty && !$v.section.required}"
            >
              <option value="">{{ $t('pages.about.selectCategory') }}</option>
              <option value="Deposit problem">{{ $t('pages.about.paymentProblemDeposit') }}</option>
              <option value="Withdraw problem">{{ $t('pages.about.paymentProblemWithdraw') }}</option>
            </select>
            <textarea
                :placeholder="$t('pages.about.message')"
                v-model="message"
                :class="{errorInp : $v.message.$dirty && !$v.message.required}"
            ></textarea>

            <div v-if="isLoading">
              <button type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin" alt=""></button>
            </div>
            <div v-else>
              <button type="submit" class="reg-btn">$t('pages.about.send')</button>
            </div>

            <template>
              <vue-recaptcha
                  id="captchaContactUs"
                  ref="recaptcha"
                  size="invisible"
                  :sitekey="captchaToken"
                  @expired="onCaptchaExpired"
                  @verify="onVerify"
                  :loadRecaptchaScript="true"
              ></vue-recaptcha>
            </template>


          </form>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Navbar from '../components/ui/Navbar.vue'
import VueRecaptcha from 'vue-recaptcha'
import {required, email} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

export default {
  name: 'Register',
  components: {VueRecaptcha, Navbar},
  computed: {
    ...mapGetters({
      currentLang: 'lang/getCurrent',
      infoPage: 'infoPages/getAbout'
    })
  },
  watch: {
    currentLang() {
      this.$store.dispatch('infoPages/loadAboutPage')
    }
  },
  created() {
    this.$store.dispatch('infoPages/loadAboutPage')
  },
  data() {
    return {
      isLoading: false,
      email: '',
      name: '',
      subject: '',
      section: '',
      message: '',
      captchaToken: process.env.CASINO_APP_CAPTCHA_TOKEN,
      captchaResponseToken: null
    }
  },
  methods: {
    execute() {
      this.$refs.recaptcha.execute()
    },
    submitForm() {
      this.isLoading = true
      let feedback = {
        name: this.name,
        email: this.email,
        section: this.section,
        subject: this.subject,
        message: this.message,
        recaptcha_response: this.captchaResponseToken
      }

      //TODO refactor loader here build smth global
      this.$store.dispatch('feedback/sendFeedback', feedback).then(() => {
        this.isLoading = false
        this.$toasted.show(this.$t('pages.about.notificationSuccess'), {
          duration: 1500
        })
      }).catch(() => {
        this.isLoading = false
        this.$toasted.show(this.$t('pages.about.notificationFail'), {
          duration: 1500
        })
      })
      this.$refs.recaptcha.reset();
    },
    validate() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      this.$refs.recaptcha.execute();

      return true;
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
      this.captchaResponseToken = null
    },
    onVerify(responseToken) {
      this.captchaResponseToken = responseToken;
      this.submitForm();
    }
  },
  validations: {
    email: {
      required,
      email
    },
    name: {
      required
    },
    section: {
      required
    },
    subject: {
      required
    },
    message: {
      required
    }

  },
}
</script>

<style>
.errorInp {
  border: 1px red solid !important;
}
</style>