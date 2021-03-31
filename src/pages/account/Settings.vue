<template>
  <div>
    <Navbar/>

    <section id="settings" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <div class="row">
              <div class="row ma-0 profile-box2">
                <div class="col-lg-12">
                  <br>
                  <button class="password-reset-btn" @click="showPasswordResetPopup()">
                    {{ $t('changePassword.resetButtonTitle') }}
                  </button>
                  <button class="delete-account-btn" @click="showDeleteAccountPopup()">
                    {{ $t('deleteAccount.button') }}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <delete-account-popup v-if="deleteAccountPopup" @closePopup="hideDeleteAccountPopup"/>
        <restore-password-popup v-if="passwordResetPopup" :player-id="player.id" @closePopup="hidePasswordResetPopup"/>

      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import DeleteAccountPopup from "../../components/accounts/DeleteAccountPopup";
import RestorePasswordPopup from "../../components/accounts/RestorePasswordPopup";
import {mapGetters} from 'vuex'

export default {
  components: {Navbar, AcNav, DeleteAccountPopup, RestorePasswordPopup},
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
    }),
  },
  data() {
    return {
      deleteAccountPopup: false,
      passwordResetPopup: false
    }
  },
  methods: {
    showPasswordResetPopup() {
      this.passwordResetPopup = true
    },
    hidePasswordResetPopup() {
      this.passwordResetPopup = false
    },
    showDeleteAccountPopup() {
      this.deleteAccountPopup = true
    },
    hideDeleteAccountPopup() {
      this.deleteAccountPopup = false
    },
  }
}
</script>


<style>
.account-field {
  margin: 20px 0;
}

.profile-box2 {
  background-color: #272459;
  padding: 25px;
  border-radius: 15px;
  margin: 15px;
}

.password-reset-btn {
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

.delete-account-btn {
  color: #fff;
  border: none;
  padding: 16px 60px;
  font-size: 12px;
  background: #f85149;
  transition: all .3s ease;
  height: 100%;
  letter-spacing: 0.17em;
  border-radius: 16px;
}
</style>