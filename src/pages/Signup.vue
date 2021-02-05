<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-8 col-lg-offset-2">
        <div class="form-box text-center">
          <h2>REGISTRATION</h2>





          <form @submit.prevent="submitForm">



            <div class="field-box" v-for="field in regFields[0].fields">

              <div v-for="fl in field.inputs" v-if="field.type !== 'checkbox' " :class="{errorInput : checkErr.includes(fl.name)}">


                <label for="" :class="{hidden : fl.name === 'confirm_terms' || fl.name === 'recaptcha_response' }">
                {{ fl.label }}</label>

                <select name="" id="" :ref=" 'input' + field.id " :data-field="fl.name"
                        @input="updateField($event)"
                        v-if="field.type === 'currency' ">
                  <option value=""></option>
                  <option v-for="opt in currency" :value="opt.code">{{ opt.code }}</option>
                </select>


                <input :type="field.type" :data-field="fl.name" @input="updateField($event)"
                v-else :class="{hidden : fl.name === 'confirm_terms' || fl.name === 'recaptcha_response' }">
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

            <vue-recaptcha
                ref="recaptcha"
                size="invisible"
                :sitekey="sitekey"
                @verify="register"
                @expired="onCaptchaExpired"
            />

            <div v-if="errors">
              <!-- {{errors}} -->

              <p style="color: red;" v-for="err in errors">
                {{err.message}}
               </p>
            </div>

            <button type="submit" class="reg-btn">{{ $t('login.registration').toUpperCase()  }}</button>
          </form>


        </div>
      </div>
    </div>
  </section>
</template>


<script>
import VueRecaptcha from 'vue-recaptcha'
import {mapGetters} from 'vuex'
import {API} from "../api";

export default {
  components: {VueRecaptcha},
  data() {
    return {
      errors: null ,
      sitekey: process.env.CASINO_APP_CAPTCHA_TOKEN,
      agreement: false,
      mailSpam: {
        name: "subscription_email",
        value: false
      },
      telSpam: {
        name: "subscription_phone",
        value: false
      },
      terms: {
        name: "confirm_terms",
        value: false
      },
      inpArr: [
        {
          name: "subscription_phone",
          value: false
        },
        {
          name: "subscription_email",
          value: false
        },
        {
          name: "confirm_terms",
          value: false
        },
        {
          name: "recaptcha_response",
          value: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      regFields: "auth/getRegFields",
      currency: "auth/getCurrency",
      lang: "auth/getLang"
    }),
    checkErr(){
        let arr = []

        if(this.errors){
          this.errors.forEach(item =>{
          arr.push(item.field)
        })
        }

        return arr
    }
  },
  watch: {
    lang(newValue, oldValue) {
      this.$store.dispatch("auth/getRegFields")
    },
  },
  methods: {
    sbsEmail() {
      let fieldInArr = this.inpArr.find(item => {
        return item.name === this.mailSpam.name
      })

      fieldInArr.value = this.mailSpam.value


    },
    sbsTel() {
      let fieldInArr = this.inpArr.find(item => {
        return item.name === this.telSpam.name;
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
    register(recaptchaToken) {
      // alert('Погнали' + recaptchaToken)

      let fieldInArr = this.inpArr.find(item => {
        return item.name === "recaptcha_response"
      })

      fieldInArr.value = recaptchaToken

      let pass1 = this.inpArr.find(item => {
        return item.name === "password_change"
      })
      pass1.value = btoa(pass1.value)

      let pass2 = this.inpArr.find(item => {
        return item.name === "password_repeat"
      })
      pass2.value = btoa(pass2.value)


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
          })
          .catch((error) => {

            this.errors = error.response.data
          });


    },
    submitForm() {
      this.$refs.recaptcha.execute()
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    // вход сразу
    submitLog() {


      let mailToLog = this.inpArr.find(item => item.name === "email")


      let passToLog = this.inpArr.find(item => item.name === "password_change")




      let userLog = {
        grant_type: "password",
        username: mailToLog.value,
        password: passToLog.value,
        scope: "casino:read bonus:read bonus.settings:read bonus:write lab:read lab:write game:read game:write game.history:read game.wallet:write game.launch:write player:read player:write message:read message:write payment:read payment:write player:write:all message:write winner:read faq:read news:read slider:read payment.callbacks:write"
      }


      let config = {
        headers: {
          Authorization: 'Basic ' + process.env.CASINO_APP_API_AUTH_TOKEN,
        }
      }

      API.post('oauth2/token', userLog, config)
          .then(response => {
            let tokenEntity = {
              userToken: response.data.access_token,
              timestamp: new Date().getTime()
            }

            localStorage.setItem("userToken", JSON.stringify(tokenEntity));

            this.$store.dispatch('auth/getUser')
          })
          .catch(error =>{
            this.errors = true
          })
          .then(() => {
        this.$router.replace("/profile");
        });


    }
  }
}
</script>


<style scoped>
.remember-me {
  margin-bottom: 15px;
}
.errorInput input{
  border:1px red solid!important;
}
.errorInput select{
  border:1px red solid!important;
}
</style>
