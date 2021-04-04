<template>
  <div class="mes-pop settings-popup" @click="closePopup">
    <div class="mes-pop-box" @click.stop>
      <div class="cross" v-if="closable" @click="closePopup">✕</div>
      <h2>{{ $t('changePassword.title') }}</h2>
      <div class="col-lg-12">
        <p class="popup-content white-txt">{{ $t('changePassword.description') }}</p>
      </div>

      <div class="col-lg-12">
        <label for="profile-password-old">{{ $t('changePassword.oldPassword') }}</label>
        <input id="profile-password-old" type="password" v-model="oldPassword" :class="{errorInp: passwordError}">
      </div>

      <div class="col-lg-12">
        <label for="profile-password">{{ $t('changePassword.newPassword') }}</label>
        <input id="profile-password" type="password" v-model="password" :class="{errorInp: passwordError}">
      </div>
      <div class="col-lg-12">
        <label for="profile-password-repeat">{{ $t('changePassword.repeatPassword') }}</label>
        <input id="profile-password-repeat" type="password" v-model="passwordRepeat" :class="{errorInp: passwordError}">
      </div>
      <div class="col-lg-12">
        <br>
        <button class="reset-password-confirm-btn" @click="changePassword()">
          {{ $t('changePassword.button') }}
        </button>
      </div>
    </div>


  </div>
</template>


<script>

export default {
  data() {
    return {
      oldPassword: null,
      password: null,
      passwordRepeat: null,
      passwordError: false,
    }
  },
  props: {
    playerId: {
      required: true,
      type: Number
    },
    closable: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    changePassword() {
      let data = {
        form: {
          id: this.playerId,
          fields: [
            {
              inputs: [
                {
                  "name": "password_confirm",
                  "value": btoa(this.oldPassword)
                },
                {
                  "name": "password_change",
                  "value": btoa(this.password)
                },
                {
                  "name": "password_repeat",
                  "value": btoa(this.passwordRepeat)
                }
              ]
            }
          ]
        }
      }

      this.$store.dispatch('player/updateData', data).then(() => {
        this.$emit('closePopup')
      }).catch(() => {
        this.passwordError = true
      })
    }
  }
}
</script>

<style>
.errorInp {
  border: 1px red solid !important;
}

.popup-content {
  margin-top: 5%;
}

.reset-password-confirm-btn {
  color: #fff;
  border: none;
  padding: 16px 60px;
  font-size: 12px;
  background: #4D2ADC;
  transition: all .3s ease;
  height: 100%;
  letter-spacing: 0.17em;
  border-radius: 16px;
}

.settings-popup input {
  padding: 19px 30px;
  border-radius: 15px;
  border: none;
  background: #272459 !important;
  color: #fff;
  width: 100%;
  margin-bottom: 28px;
  font-size: 16px;
  transition: all .3s ease;
  max-height: 60px;
}
</style>