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
                <img src="../../assets/img/icons/nv6.svg" class="spin" alt="">
              </div>


              <div class="col-lg-3" v-else v-for="account in player.accounts">
                <div class="document-box text-center">
                  <div class="text-center">
                    <img src="../../assets/img/success.svg" class="status-icon"
                         v-if="account.id === currentAccount.id" alt="">
                    <h3>{{ account.getFormattedAmount() }} {{ account.currency_code }}</h3>
                    <button class="btn-cont" v-if="account.id !== currentAccount.id"
                            @click="changeAccount(account.id)">
                      {{ $t('pages.account.changeAccount') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br><br>

            <div class="row" v-if="availableCurrencies.length">
              <h2>{{ $t('pages.account.createAccount') }}</h2>

              <div class="row new-doc">
                <div class="col-lg-4">
                  <select v-model="newAccountId">
                    <option v-for="currency in availableCurrencies" :value="currency.id">{{ av.code }}</option>
                  </select>
                </div>
              </div>

              <div class="row">

                <div class="col-lg-3">
                  <div v-if="isLoading">
                    <button class="save-btn"><img src="../../assets/img/icons/nv6.svg" class="spin" alt=""></button>
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

export default {
  components: {Navbar, AcNav},
  data() {
    return {
      isLoading: false,
      newAccountId: ''
    }
  },
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      availableCurrencies: "currency/getAvailableCurrencies",
    }),
    currentAccount() {
      if (this.player) {
        return this.player.accounts.find(item => {
          return item.is_current === true
        })
      }
    },
  },
  methods: {
    changeAccount(accountId) {
      this.$store.dispatch('account/changeAccount', accountId)
      setTimeout(() => {
        this.$store.dispatch('player/loadCurrent')
      }, 3000)
    },
    createAccount() {
      if (this.newAccountId === '') {
        return
      }

      this.$store.dispatch('account/createAccount', {
        currency_id: this.newAccountId
      }).then(() => {
        this.newAccountId = ''
      })

    }
  },
  created() {
    this.$store.dispatch('currency/loadNotForCurrentUser')
  }
}

</script>

<style scoped>
select {
  width: 100% !important;
}

.document-box h3 {
  margin: 15px 0;
}
</style>