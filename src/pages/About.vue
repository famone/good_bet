<template>
  <div>
    <Navbar/>

    <section id="about">
      <div class="container">
        <div class="col-lg-6">
          <h2 class="mb-30">{{ $t('main.casinoName') }}</h2>
          <p class="white-txt">Welcome to Rajbet ! You've just found a place where you can not only bet on all your
            favorite games in one place whenever you like, but you can also take advantage of plenty of top promotions,
            bonuses and other perks along the way.
            <br><br>
            We've dedicated ourselves to giving you more ways to inject extra passion into the slots you love by
            offering over 2000 unique slot machines with fantastic bonus.
            <br><br>
            Plus, you've got the freedom to choose between classic and modern online slot machines. Also, Rajbet offer
            huge variety of live casino games with high bet limits and huge winnings!
            <br><br>
            You'll find an impressive variety of payment methods to choose from and a transaction process that's quick
            and easy, letting you get straight back into the sports action.
            And when it's time to cash out your winnings, you can do so quickly and safely.
            <br><br>
            We're here for you every step of the way with dedicated account managers standing by to provide you with a
            24/7 top notch customer care service, handling any issues quickly and efficiently.
            <br><br>
            And if that wasn't enough, you also get access to regular promotions, special offers and extra bonuses,
            giving you the best chances of scoring even more on all your favourite games at Rajbet.</p>
        </div>
        <div class="col-lg-6">
          <h2 class="mb-30">CONTACT US</h2>
          <form class="contact-us" method="post" @submit.prevent="validate">
            <input type="text" placeholder="Name" :class="{errorInp : $v.name.$dirty && !$v.name.required}"
                   v-model="name">
            <input type="text" placeholder="E-mail" v-model="email"
                   :class="{errorInp : ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
            <input
                type="text"
                placeholder="Topic"
                v-model="subject"
                :class="{errorInp : $v.subject.$dirty && !$v.subject.required}"
            >
            <select name=""
                    id=""
                    v-model="section"
                    :class="{errorInp : $v.section.$dirty && !$v.section.required}"
            >
              <option value="">Select category</option>
              <option value="Payment problem">Payment problem</option>
              <option value="Payment problem">Payment problem</option>
            </select>
            <textarea
                placeholder="Message text"
                v-model="message"
                :class="{errorInp : $v.message.$dirty && !$v.message.required}"
            ></textarea>

            <div v-if="isLoading">
              <button type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin"></button>
            </div>
            <div v-else>
              <button type="submit" class="reg-btn">SEND</button>
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
import {required, email, minLength} from "vuelidate/lib/validators";
import {API} from "../api";

export default {
  name: 'Register',
  components: {VueRecaptcha, Navbar},

  data() {
    console.log('dsadsadas')
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

      API.post('feedback', feedback)
          .then(response => {
            console.log(response)
            this.isLoading = false
            this.$toasted.show(this.$t('pages.about.notificationSuccess'))
          })
          .catch(error => {
            this.isLoading = false
            this.$toasted.show(this.$t('pages.about.notificationFail'))
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