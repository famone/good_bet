<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('MyBonusTransactions.name') }}</h2>

            <button class="switch-btn"
                    :class="{activeSwitch : currentBonusTab === 'active'}"
                    @click="switchToActiveBonuses()">{{ $t('MyBonusTransactions.active') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : currentBonusTab === 'subscribed'}"
                    @click="switchToSubscribedBonuses()">{{ $t('MyBonusTransactions.subscribed') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : currentBonusTab === 'all'}"
                    @click="switchToAllBonuses()">{{ $t('MyBonusTransactions.all') }}
            </button>

            <active-bonus-transactions v-if="currentBonusTab === 'active'"/>

            <div class="row-bonuses" v-if="subscribedBonusTransactionList && currentBonusTab === 'subscribed'">
              <div v-for="bonusTransaction in subscribedBonusTransactionList" class="col-lg-4 col-sm-6">
                <div class="news-card">

                  <!-- <pre>{{bon}}</pre> -->
                  <div class="news-img"
                       :style="{'background-image': bonusTransaction.bonus.banners.length ? 'url(' + bonusTransaction.bonus.banners[0].url + ')' : ''}">

                  </div>
                  <div class="news-body">
                    <h3>{{ bonusTransaction.bonus.title }}</h3>
                    <p class="bonus-descr" v-if="bonusTransaction.bonus.description"
                       v-html="bonusTransaction.bonus.description.substring(0,90) + '...'"></p>
                    <p class="bonus-descr" v-else></p>

                    <button class="apply-btn" @click="unsubscribeTransaction(bonusTransaction)">
                      <img src="../../../assets/img/minus.svg" alt="">
                    </button>
                    <button class="save-btn" @click="openActiveBonus(bonusTransaction)">{{ $t('MyBonusTransactions.more') }}</button>



                  </div>
                </div>
              </div>
            </div>




            <div class="row-bonuses" v-if="allBonusTransactionList && currentBonusTab === 'all'">
              <div v-for="bonusTransaction in allBonusTransactionList" class="col-lg-4 col-sm-6">
                <div v-if="bonusTransaction.bonus" class="news-card">

                  <!-- <pre>{{bon}}</pre> -->
                  <div v-if="bonusTransaction.bonus.banners.length"
                        class="news-img"
                       :style="{'background-image': 'url(\'' + bonusTransaction.bonus.banners[0].url + '\')'}">
                  </div>

                  <div v-else class="news-img" :style="{'background-image': ''}"></div>

                  <div class="news-body">
                    <h3>{{ bonusTransaction.bonus.title }}</h3>
                    <h3>{{ bonusTransaction.status }}</h3>
                    <p class="bonus-descr" v-if="bonusTransaction.description" v-html="bonusTransaction.description.substring(0,90) + '...'"></p>
                    <p class="bonus-descr" v-else></p>


                    <button class="save-btn" @click="openAvailableBonus(bonusTransaction)">MORE</button>
                    <button class="apply-btn" @click="subscribeBonus(bonusTransaction.id)">
                      <img src="../../../assets/img/apply.svg">
                    </button>
                  </div>
                </div>

                <div v-else class="news-card">

                  <!-- <pre>{{bon}}</pre> -->
                  <div class="news-img"
                       :style="{'background-image': 'url(' + '../../assets/img/apply.svg' + ')'}">
                  </div>

                  <div class="news-body">
                    <h3>Bonus deleted</h3>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>



    <avBonusPop v-if="avBonusDesc" :availableDesc="avBonusDesc" @closeAvDesc="closeAvDesc"/>


  </div>
</template>


<script>
import Navbar from '../../../components/ui/Navbar.vue'
import AcNav from '../../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'
import avBonusPop from '../../../components/ui/avBonusPop.vue'
import ActiveBonusTransactions from "./ActiveBonusTransactions";

export default {
  components: {ActiveBonusTransactions, Navbar, AcNav, avBonusPop},
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
      avBonusDesc: null
    }
  },
  mounted() {
    document.addEventListener('keyup', this.closeEsc);
  },
  methods: {
    closeEsc() {
      this.avBonusDesc = null
    },
    subscribeBonus(id) {

      let bonus = {
        bonus_id: id
      }
      this.$store.dispatch('bonusTransactions/subscribe', bonus)
    },
    openAvailableBonus(bonus) {
      this.avBonusDesc = bonus
    },
    closeAvDesc() {
      this.avBonusDesc = null
    },
    unsubscribeTransaction(transaction) {
      this.$store.dispatch('bonusTransactions/unsubscribe', transaction.id)
    },
    switchToActiveBonuses() {
      this.currentBonusTab = 'active'
      this.loader = true
    },
    switchToSubscribedBonuses() {
      this.currentBonusTab = 'subscribed'
      this.loader = true
      this.$store.dispatch('bonusTransactions/loadSubscribed').then(() => {
        this.loader = false
      })
    },
    switchToAllBonuses() {
      this.currentBonusTab = 'all'
      this.loader = true;
      this.$store.dispatch('bonusTransactions/loadAll').then(() => {
        this.loader = false;
      })
    }
  }
}

</script>

<style scoped>


</style>