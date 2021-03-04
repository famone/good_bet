<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('pages.account.accountsUPPER') }}</h2>

            <div class="row">
              <div class="col-lg-12 text-center" v-if="!player.accounts">
                <img src="../../assets/img/icons/nv6.svg" class="spin">
              </div>


              <div class="col-lg-3" v-else v-for="account in player.accounts">
                <div class="document-box text-center">
                  <div class="text-center">
                    <img src="../../assets/img/success.svg" class="status-icon"
                         v-if="account.id == getCurrentAccount.id">
                    <h3>{{ account.amount.toLocaleString() }} {{ account.currency_code }}</h3>
                    <button class="btn-cont" v-if="account.id !== getCurrentAccount.id" @click="changeAccount(account.id)">
                      {{ $t('pages.account.changeAccount') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br><br>

            <div class="row" v-if="available.length">
              <h2>{{ $t('pages.account.createAccount') }}</h2>

              <div class="row new-doc">
                <div class="col-lg-4">
                  <select name="" id="" v-model="newAccountId">
                    <option v-for="av in available" :value="av.id">{{ av.code }}</option>
                  </select>
                </div>
              </div>

              <div class="row">

                <div class="col-lg-3">
                  <div v-if="isLoading">
                    <button class="save-btn"><img src="../../assets/img/icons/nv6.svg" class="spin"></button>
                  </div>
                  <div v-else>
                    <button class="save-btn" @click="createAccount">{{ $t('pages.account.createAccount') }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'
import {API} from '../../api'

export default {
  components: {Navbar, AcNav},
  data() {
    return {
      isLoading: false,
      available: [],
      newAccountId: ''
    }
  },
  computed: {
    ...mapGetters({player: "auth/getPlayer"}),
    getCurrentAccount() {
      if (this.player) {
        let currentValue = this.player.accounts.find(item => {
          return item.is_current == true
        })
        return currentValue
      }
    }
  },
  methods: {
    changeAccount(accountId) {
      this.$store.dispatch('account/changeAccount', accountId)
      setTimeout(() => {
      this.$store.dispatch('auth/getUser')
    }, 3000)
    },
    getAvailableCurrency() {
      API.get('payment-currencies', {
        params: {
          has_accounts: false,
        }
      }).then(res => {
        this.available = res.data
      })
    },
    createAccount() {
      this.isLoading = true

      if (this.newAccountId === '') {
        return
      }

      let newAcc = {currency_id: this.newAccountId}

      API.post('accounts', newAcc)
          .then(res => {
            this.newAccountId = ''
            this.$store.dispatch('auth/getUser')
            this.getAvailableCurrency()
            this.isLoading = false
          }).catch(error => {
        this.isLoading = false
      })


    }
  },
  created() {
    // доступные валюты
    this.getAvailableCurrency()
  }
}

</script>

<style scoped>
select {
  width: 100% !important;
}

input#file-upload-button {
  background-color: #fff !important;
  border: none !important;
  text-transform: uppercase !important;
}

.document-box h3 {
  margin: 15px 0;
}
</style>