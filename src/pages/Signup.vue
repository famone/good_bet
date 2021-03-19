<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-8 col-lg-offset-2">
        <div class="form-box text-center" v-if="formInputs.items.length">
          <h2>REGISTRATION</h2>

          <form @submit.prevent="validate">
            <div v-for="input in formInputs.items" :class="{'field-box': true, errorInput : input.errors.length}">


              <div v-if="input.isCurrency()">
                <label :for="input.id">{{ input.label }}</label>

                <select
                    :id="input.id"
                    :ref=" 'input' + input.id "
                    :data-field="input.name"
                    @input="input.onInputUpdate($event)"
                    @change="onCurrencySelect"
                >
                  <option v-for="currency in currencies" :data-currency-id="currency.id" :value="currency.code">
                    {{ currency.code }}
                  </option>
                </select>
              </div>
              <div v-else-if="input.isBonus()">
                <label :for="input.id" v-if="bonuses.length">{{ input.label }}</label>
                <div class="bonus-select" v-if="bonuses" v-for="bonus in bonuses"
                     :class="{checked : checkedBonusId === bonus.id}">
                  <div class="ch-box" @click="input.value = bonus.id; checkedBonusId = bonus.id "></div>
                  <p style="color: red;"></p>
                  <div class="description" @click="input.value = bonus.id; checkedBonusId = bonus.id ">
                    <p class="white-txt">{{ bonus.title }}</p>
                    <p class="small-white" v-if="bonus.id === checkedBonusId"
                       @click="readBonus(bonus)">Read More</p>
                  </div>
                </div>
                <br>
              </div>

              <div v-else-if="input.isTermsAndConditions()">
                <div class="remember-me" :class="{checked: input.value}" @click="input.value = !input.value">
                  <div class="ch-box"></div>
                  <span>{{ input.label }}</span>
                </div>
              </div>

              <div v-else-if="input.isCheckbox()">
                <div class="remember-me" :class="{checked: input.value}" @click="input.value = !input.value">
                  <div class="ch-box"></div>
                  <span>{{ input.label }}</span>
                </div>
              </div>

              <div v-else-if="!input.isCaptcha()">
                <label :for="input.id">{{ input.label }}</label>
                <input :id="input.id" :type="input.type" :data-field="input.name" @change="input.onInputUpdate($event)">
              </div>

              <div v-if="input.errors.length">
                <p style="color: red;" v-for="errorMessage in input.errors">{{ errorMessage }}</p>
              </div>

            </div>

            <vue-recaptcha
                id="captchaContactUs"
                ref="recaptcha"
                size="invisible"
                :sitekey="captchaToken"
                @expired="onCaptchaExpired"
                @verify="onVerify"
                :loadRecaptchaScript="true"
            ></vue-recaptcha>


            <div v-if="isLoading">
              <button type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin" alt=""></button>
            </div>
            <div v-else>
              <button type="submit" class="reg-btn">{{ $t('login.registration').toUpperCase() }}</button>
            </div>
          </form>


        </div>
      </div>
    </div>
    <avBonusPop v-if="avBonusDesc" :availableDesc="avBonusDesc" @closeAvDesc="closeAvDesc"/>
  </section>
</template>


<script>
import VueRecaptcha from 'vue-recaptcha'
import {mapGetters} from 'vuex'
import {API} from '../api'
import avBonusPop from '../components/ui/avBonusPop.vue'

export default {
  components: {VueRecaptcha, avBonusPop},
  data() {
    return {
      avBonusDesc: null,
      checkedBonusId: null,
      isLoading: false,

      captchaToken: process.env.CASINO_APP_CAPTCHA_TOKEN,
      agreement: false,
      captchaResponseToken: null,
    }
  },
  computed: {
    ...mapGetters({
      formInputs: 'registerForm/getDefaultFormInputs',
      bonuses: 'bonuses/getRegistrationBonuses',
      currencies: 'currency/getAll',
      currentLang: 'lang/getCurrent'
    }),
  },
  created() {
    this.$store.dispatch('registerForm/loadDefaultFields')
    this.$store.dispatch('currency/loadAll')
  },
  watch: {
    currencies(newValue, oldValue) {
      this.$store.dispatch('bonuses/loadRegistrationBonuses', newValue[0].id)
    },
    currentLang() {
      this.$store.dispatch('registerForm/loadDefaultFields')
    },
  },
  methods: {
    closeAvDesc() {
      this.avBonusDesc = null
    },
    readBonus(bon) {
      this.avBonusDesc = bon
    },
    submitForm() {
      this.$store.dispatch('registerForm/submit', this.formInputs).then(() => {
        this.submitLog()
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })

      this.$refs.recaptcha.reset()
    },
    validate() {
      this.isLoading = true
      this.$refs.recaptcha.execute()

      return true
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()

      this.formInputs.find((item, index) => {
        if (item.name === 'recaptcha_response') {
          this.formInputs[index].value = null
        }
      })

      this.isLoading = false
    },
    onVerify(responseToken) {
      this.formInputs.find((item, index) => {
        if (item.name === 'recaptcha_response') {
          this.formInputs.items[index].value = responseToken
        }
      })
      this.submitForm()
    },

    // вход сразу
    submitLog() {
      let params = {
        username: this.formInputs.find(item => item.name === 'email'),
        password: this.formInputs.find(item => item.name === 'password_change')
      }

      this.$store.dispatch('auth/loadPlayerTokenByUsernamePassword', params).then(() => {
        this.$store.dispatch('player/loadCurrent').then(() => {
          this.isLoading = false
          this.$router.replace("/profile");
        })
      }).catch(() => {
        this.isLoading = false
      })
    },
    onCurrencySelect(event) {
      let selectedCurrencyId = event.target.options[event.target.selectedIndex].getAttribute('data-currency-id')
      this.$store.dispatch('bonuses/loadRegistrationBonuses', selectedCurrencyId)
    }
  }
}
</script>


<style scoped>
.remember-me {
  margin-bottom: 15px;
}

.errorInput input {
  border: 1px red solid !important;
}

.errorInput select {
  border: 1px red solid !important;
}

.bonus-select {
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin-bottom: 5px;
  border-bottom: 1px rgba(255, 255, 255, .1) solid;
}
.bonus-select .description{
  width: 80%;
}
.bonus-select .small-white {
  text-decoration: underline;
  transition: all .3s ease;
}

.bonus-select .small-white:hover {
  opacity: .5;
}
</style>
