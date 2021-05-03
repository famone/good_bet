<template>
  <div>
    <Navbar/>

    <section id="settings" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('pages.account.settings.title') }}</h2>
            <div class="row">
              <br>
              <br>
              <div class="row ma-0" style="padding-top: 85px;">
                <div class="col-lg-12">
                  <div class="settings-main-description">
                    {{ $t('pages.account.settings.description') }}
                  </div>
                </div>
              </div>
              <div class="row ma-0">
                <div class="col-lg-12">
                  <br>
                  <button class="password-reset-btn" @click="showSelfExclusionPopup()">
                    {{ $t('selfExclusion.excludeButtonTitle') }}
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
        <self-exclusion-popup v-if="selfExclusionPopup" @closePopup="hideSelfExclusionPopup"/>

      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import DeleteAccountPopup from "../../components/accounts/DeleteAccountPopup";
import SelfExclusionPopup from "../../components/accounts/SelfExclusionPopup";
import {mapGetters} from 'vuex'

export default {
  components: {Navbar, AcNav, DeleteAccountPopup, SelfExclusionPopup},
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
    }),
  },
  data() {
    return {
      deleteAccountPopup: false,
      selfExclusionPopup: false,
    }
  },
  methods: {
    showSelfExclusionPopup() {
      this.selfExclusionPopup = true
    },
    hideSelfExclusionPopup() {
      this.selfExclusionPopup = false
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


.settings-main-description {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
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