<template>
  <div>
    <Navbar/>

    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('pages.account.transactions') }}</h2>

            <button class="switch-btn"
                    :class="{activeSwitch : currentTab === 'deposit'}"
                    @click="switchTab('deposit')">{{ $t('pages.account.deposit') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : currentTab === 'withdrawal'}"
                    @click="switchTab('withdrawal')">{{ $t('pages.account.withdrawal') }}
            </button>

            <!-- depo -->

            <div class="row" v-if="currentTab === 'deposit'">
              <div class="col-lg-10">
                <table>
                  <thead>
                  <tr>
                    <td>{{ $t('main.date') }}</td>
                    <td>{{ $t('main.amount') }}</td>
                    <td>{{ $t('main.status') }}</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="transaction in depositTransactions">
                    <td>{{ transaction.getFormattedCreatedDateTime() }}</td>
                    <td>{{ transaction.amount_as_currency }}</td>
                    <td>{{ $t('main.' + transaction.status) }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- withdrawl -->


            <div class="row" v-else-if="currentTab === 'withdrawal'">
              <div class="col-lg-10">
                <table>
                  <thead>
                  <tr>
                    <td>{{ $t('main.date') }}</td>
                    <td>{{ $t('main.amount') }}</td>
                    <td>{{ $t('main.status') }}</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="transaction in withdrawalTransactions">
                    <td>{{ transaction.getFormattedCreatedDateTime() }}</td>
                    <td>{{ transaction.amount_as_currency }}</td>
                    <td>{{ $t('main.' + transaction.status) }}</td>
                  </tr>
                  </tbody>
                </table>
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
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      currentTab: "transactions/getCurrentTab",
      depositTransactions: "transactions/getDepositTransactions",
      withdrawalTransactions: "transactions/getWithdrawalTransactions"
    })
  },
  created() {
    this.$store.dispatch('transactions/loadDepositTransactions')
    this.$store.dispatch('transactions/loadWithdrawalTransactions')
  },
  methods: {
    switchTab(res) {
      this.$store.dispatch('transactions/switchCurrentTab', res)
    }
  }
}

</script>