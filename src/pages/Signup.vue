<template>
  <section id="login">
    <div class="container">
      <div class="col-lg-8 col-lg-offset-2">
        <div class="form-box text-center">
          <h2>REGISTRATION</h2>

          <form @submit.prevent="submitForm">



            <div class="field-box" v-for="field in regFields[0].fields">

              <div v-for="fl in field.inputs" v-if="field.type !== 'checkbox' ">
                <label for="">{{ fl.label }} </label>

                <select name="" id="" :ref=" 'input' + field.id " :data-field="fl.name"
                        @input="updateField($event)"
                        v-if="field.type === 'currency' ">
                  <option v-for="opt in currency" :value="opt.code">{{ opt.code }}</option>
                </select>


                <input :type="field.type" :data-field="fl.name" @input="updateField($event)" v-else>
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

            <button type="submit" class="reg-btn">LOGIN</button>
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
      currency: "auth/getCurrency"
    }),
  },
  methods: {
    sbsEmail() {
      let fieldInArr = this.inpArr.find(item => {
        return item.name === this.mailSpam.name
      })

      fieldInArr.value = this.mailSpam.value

      console.log(this.inpArr)

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
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });


    },
    submitForm() {
      this.$refs.recaptcha.execute()
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>


<style scoped>
.remember-me {
  margin-bottom: 15px;
}
</style>
