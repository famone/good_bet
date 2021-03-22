<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('myBonusTransactions.name') }}</h2>

            <router-link tag="button" to="/my-bonuses/active" class="switch-btn"
                    :class="{activeSwitch : $route.params.status === 'active'}">
              {{ $t('myBonusTransactions.active') }}
            </router-link>
            <router-link tag="button" to="/my-bonuses/subscribed" class="switch-btn"
                    :class="{activeSwitch : $route.params.status === 'subscribed'}">
              {{ $t('myBonusTransactions.subscribed') }}
            </router-link>
            <router-link tag="button" to="/my-bonuses/all" class="switch-btn"
                    :class="{activeSwitch : $route.params.status === 'all'}">
              {{ $t('myBonusTransactions.all') }}
            </router-link>

            <active-bonus-transactions v-if="$route.params.status === 'active'"/>

            <subscribed-bonus-transactions v-if="$route.params.status === 'subscribed'"/>

            <all-bonus-transactions v-if="$route.params.status === 'all'"/>

          </div>
        </div>
      </div>
    </section>



  </div>
</template>


<script>
import Navbar from '../../../components/ui/Navbar.vue'
import AcNav from '../../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'
import ActiveBonusTransactions from "../../../components/bonus-transactions/ActiveBonusTransactions";
import SubscribedBonusTransactions from "../../../components/bonus-transactions/SubscribedBonusTransactions";
import AllBonusTransactions from "../../../components/bonus-transactions/AllBonusTransactions";

export default {
  components: {SubscribedBonusTransactions, ActiveBonusTransactions, AllBonusTransactions,  Navbar, AcNav},
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
      subscribedBonusTransactionList: 'bonusTransactions/getSubscribedBonusTransactions',
      allBonusTransactionList: 'bonusTransactions/getAllBonusTransactions'
    }),
  },
  data() {
    return {
      currentBonusTab: 'active',
    }
  }
}

</script>

<style scoped>


</style>