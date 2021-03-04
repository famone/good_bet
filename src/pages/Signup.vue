<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-8 col-lg-offset-2">
        <div class="form-box text-center" v-if="regFields[0].fields.length">
          <h2>REGISTRATION</h2>





          <form @submit.prevent="validate">
            <div class="field-box" v-for="field in regFields[0].fields">
              <div v-for="fl in field.inputs" v-if="field.type !== 'checkbox' "
                   :class="{errorInput : checkErr.includes(fl.name)}">
                <label for="" :class="{hidden : fl.name === 'confirm_terms' || fl.name === 'recaptcha_response' }">
                  {{ fl.label }}</label>

                <select name="" id="" :ref=" 'input' + field.id " :data-field="fl.name"
                        @input="updateField($event)"
                        v-if="field.type === 'currency' ">
                  <option value=""></option>
                  <option v-for="opt in currency" :value="opt.code">{{ opt.code }}</option>
                </select>


                <!-- <select :ref=" 'input' + field.id " :data-field="fl.name"
                        @input="updateField($event)"
                        v-if="field.type === 'bonus' ">
                  <option value=""></option>
                  <option v-for="bonus in bonuses" :value="bonus.id">{{ bonus.title }}</option>
                </select> -->

                <div v-if="field.type === 'bonus' ">
                  <div class="bonus-select" v-if="bonuses" v-for="(bonus, index) in bonuses"
                  :class="{checked : checkedBonusIndex == index}">
                      <div class="ch-box" @click="selectBonusStat(index)"></div>
                      <p style="color: red;">{{bonus.chosen}}</p>
                      <div>
                        <p class="white-txt">{{bonus.title}}</p>
                        <p class="small-white" v-if="index == checkedBonusIndex"
                        @click="readBonus(bonus)">Read More</p>
                      </div>
                  </div>
                  <br>
                </div>

                <input :type="field.type" :data-field="fl.name" @input="updateField($event)"
                       :class="{hidden : ifCustomInput(fl.name) }">
              </div>
            </div>


            <div class="remember-me">
              <div class="remember-me" :class="{checked: terms.value}"
                   @click="terms.value = !terms.value; makeTerm()">
                <div class="ch-box"></div>
                <span>I agree with private policy terms</span>
              </div>
            </div>
            <div class="checkes">
              <div class="remember-me"
                   :class="{checked: mailSpam.value}"
                   @click="mailSpam.value = !mailSpam.value; sbsEmail()">
                <div class="ch-box"></div>
                <span>Email subscription</span>
              </div>
              <div class="remember-me"
                   :class="{checked: telSpam.value}"
                   @click="telSpam.value = !telSpam.value; sbsTel()">
                <div class="ch-box"></div>
                <span>Telephone subscription</span>
              </div>
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

            <div v-if="errors">
              <!-- {{errors}} -->

              <p style="color: red;" v-for="err in errors">
                {{ err.message }}
              </p>
            </div>


            <div v-if="isLoading">
              <button type="submit" class="reg-btn"><img src="../assets/img/icons/nv6.svg" class="spin"></button>
            </div>
            <div v-else>
              <button type="submit" class="reg-btn">{{ $t('login.registration').toUpperCase() }}</button>
            </div>
          </form>


        </div>
      </div>
    </div>
    <avBonusPop v-if="avBonusDesc" :availableDesc="avBonusDesc" @closeAvDesc="closeAvDesc" />
  </section>
</template>


<script>
import VueRecaptcha from 'vue-recaptcha'
import {mapGetters} from 'vuex'
import {API} from '../api'
import avBonusPop from '../components/ui/avBonusPop.vue'

export default {
  components: { VueRecaptcha, avBonusPop },
  data () {
    return {
      avBonusDesc: null,
      checkedBonId: 0,
      errors: null,
      isLoading: false,
 
      captchaToken: process.env.CASINO_APP_CAPTCHA_TOKEN,
      agreement: false,
      captchaResponseToken: null,
      mailSpam: {
        name: 'subscription_email',
        value: false
      },
      telSpam: {
        name: 'subscription_phone',
        value: false
      },
      terms: {
        name: 'confirm_terms',
        value: false
      },
      inpArr: [
        {
          name: 'subscription_phone',
          value: false
        },
        {
          name: 'subscription_email',
          value: false
        },
        {
          name: 'confirm_terms',
          value: false
        },
        {
          name: 'recaptcha_response',
          value: ''
        }
      ],
      customFields: [
        'confirm_terms',
        'subscription_phone',
        'recaptcha_response',
        'currency_code',
        'registration_bonus_id'
      ],
    }
  },
  computed: {
    ...mapGetters({
      regFields: 'auth/getRegFields',
      bonuses: 'auth/getRegBonuses',
      currency: 'currency/getAll',
      currentLang: 'lang/getCurrent'
    }),
    checkErr() {
      let arr = []

      if (this.errors) {
        this.errors.forEach(item => {
          arr.push(item.field)
        })
      }

      return arr
    },
    checkedBonusIndex(){
      return this.checkedBonId
    }
  },
  created() {
    this.$store.dispatch('auth/loadRegFields')
    this.$store.dispatch('currency/loadAll')
  },
  watch: {
    regFields() {
      let isBonusEnable = this.regFields[0].fields.find(item => {
        return item.type === 'bonus'
      })

      if (isBonusEnable) {
        this.$store.dispatch('auth/loadRegistrationBonuses')
      }
    },
    currentLang() {
      this.$store.dispatch('auth/getRegFields')
    },
  },
  methods: {
    closeAvDesc(){
      this.avBonusDesc = null
    },
    readBonus(bon){
      this.avBonusDesc = bon
    },
    selectBonusStat(id){
      if(this.checkedBonId == id){
        this.checkedBonId= null
      }else{
        this.checkedBonId = id
      }
    },
    ifCustomInput(name){
      return  this.customFields.find(item => {
        return  item === name
      })
    },
    sbsEmail() {
      let fieldInArr = this.inpArr.find(item => {
        return item.name === this.mailSpam.name
      })

      fieldInArr.value = this.mailSpam.value

    },
    sbsTel() {
      let fieldInArr = this.inpArr.find(item => {
        return item.name === this.telSpam.name
      })

      fieldInArr.value = this.telSpam.value

    },
    makeTerm() {
      let fieldInArr = this.inpArr.find(item => {
        return item.name === this.terms.name
      })

      fieldInArr.value = this.terms.value

    },
    updateField(e) {
      let attr = e.target.getAttribute('data-field')

      let fieldInArr = this.inpArr.find(item => {
        return item.name === attr
      })

      if (fieldInArr) {
        fieldInArr.value = e.target.value
        return
      }

      this.inpArr.push({name: attr, value: e.target.value})

    },
    submitForm() {

      let fieldInArr = this.inpArr.find(item => {
        return item.name === 'recaptcha_response'
      })

      fieldInArr.value = this.captchaResponseToken

      let pass1 = this.inpArr.find(item => {
        return item.name === 'password_change'
      })
      if (pass1) {
        pass1.value = btoa(pass1.value)
      }

      let pass2 = this.inpArr.find(item => {
        return item.name === 'password_repeat'
      })
      if (pass2) {
        pass2.value = btoa(pass2.value)
      }

      let objField = {
        form: {
          id: 1,
          fields: [
            {
              inputs: this.inpArr
            }
          ]
        }
      }

      API.post('players', objField)
          .then(response => {
            this.submitLog()
            this.isLoading = false
          })
          .catch((error) => {
            this.isLoading = false
            this.errors = error.response.data
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
      this.captchaResponseToken = null
      this.isLoading = false
    },
    onVerify(responseToken) {
      this.captchaResponseToken = responseToken
      this.submitForm()
    },
    // вход сразу
    submitLog() {

      let mailToLog = this.inpArr.find(item => item.name === 'email')

      let passToLog = this.inpArr.find(item => item.name === 'password_change')

      let tokenParams = {
        grant_type: 'password',
        username: mailToLog.value,
        password: passToLog.value,
        scope: 'casino:read bonus:read bonus.settings:read bonus:write lab:read lab:write game:read game:write game.history:read game.wallet:write game.launch:write player:read player:write message:read message:write payment:read payment:write player:write:all message:write winner:read faq:read news:read slider:read payment.callbacks:write'
      }

      API.getPlayerToken(tokenParams)
          .then(response => {
            this.$store.dispatch('auth/getUser')
            this.isLoading = false
            this.$router.replace('/profile')
          })
          .catch(error => {
            this.isLoading = false
            this.errors = true
          })
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
.bonus-select{
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin-bottom: 5px;
  border-bottom: 1px rgba(255,255,255, .1) solid;
}
.bonus-select .small-white{
  text-decoration: underline;
  transition: all .3s ease;
}
.bonus-select .small-white:hover{
  opacity: .5;
}
</style>
