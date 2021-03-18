<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('MyBonuses.name') }}</h2>

            <button class="switch-btn"
                    :class="{activeSwitch : currentBonusTab === 'active'}"
                    @click="switchToActiveBonuses()">{{ $t('MyBonuses.active') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : currentBonusTab === 'subscribed'}"
                    @click="switchToSubscribedBonuses()">{{ $t('MyBonuses.subscribed') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : currentBonusTab === 'all'}"
                    @click="switchToAllBonuses()">{{ $t('MyBonuses.all') }}
            </button>

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

                    <button class="save-btn" @click="openActiveBonus(bonusTransaction)">{{ $t('MyBonuses.more') }}</button>

                  </div>
                </div>
              </div>
            </div>

            <div class="row-bonuses" v-if="activeBonusTransactionList && currentBonusTab === 'active'">
              <div v-for="bonusTransaction in activeBonusTransactionList" class="col-lg-4 col-sm-6">
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

                    <button class="save-btn" @click="openActiveBonus(bonusTransaction)">{{ $t('MyBonuses.more') }}</button>

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
                    <p class="bonus-descr" v-if="bonusTransaction.description" v-html="bonusTransaction.description.substring(0,90) + '...'"></p>
                    <p class="bonus-descr" v-else></p>


                    <button class="save-btn" @click="openAvailableBonus(bonusTransaction)">MORE</button>
                    <button class="apply-btn" @click="subscribeBonus(bonusTransaction.id)">
                      <img src="../../assets/img/apply.svg">
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


    <acBonusPop v-if="acBonusDesc" :activeDesc="acBonusDesc" @closeAcDesc="closeAcDesc"/>
    <avBonusPop v-if="avBonusDesc" :availableDesc="avBonusDesc" @closeAvDesc="closeAvDesc"/>


  </div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'
import {API} from '../../api'
import acBonusPop from '../../components/ui/acBonusPop.vue'
import avBonusPop from '../../components/ui/avBonusPop.vue'

export default {
  components: {Navbar, AcNav, acBonusPop, avBonusPop},
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
      activeBonusTransactionList: 'bonusTransactions/getActiveBonusTransactions',
      subscribedBonusTransactionList: 'bonusTransactions/getSubscribedBonusTransactions',
      allBonusTransactionList: 'bonusTransactions/getAllBonusTransactions'
    }),
  },
  data() {
    return {
      currentBonusTab: 'active',
      acBonusDesc: null,
      avBonusDesc: null
    }
  },
  mounted() {
    document.addEventListener('keyup', this.closeEsc);
  },
  methods: {
    closeEsc() {
      this.acBonusDesc = null
      this.avBonusDesc = null
    },
    subscribeBonus(id) {

      let bonus = {
        bonus_id: id
      }
      this.$store.dispatch('bonusTransactions/create', bonus)
    },
    openAvailableBonus(bonus) {
      this.avBonusDesc = bonus
    },
    closeAvDesc() {
      this.avBonusDesc = null
    },
    openActiveBonus(bonus) {
      this.acBonusDesc = bonus
    },
    closeAcDesc() {
      this.acBonusDesc = null
    },
    switchToActiveBonuses() {
      this.currentBonusTab = 'active'
      this.loader = true
      this.$store.dispatch('bonusTransactions/loadActive').then(() => {
        this.loader = false
      })
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
  },
  created() {
    this.$store.dispatch('bonusTransactions/loadActive').then(() => {
      this.loading = false
    })
  }
}

</script>

<style scoped>
.bonus-descr {
  font-size: 16px;
  font-weight: 400;
  opacity: .4;
  color: #fff;
  line-height: 22px;
  height: 50px;
}

.news-card:hover .news-body {
  background: #1D1B49;
}

.apply-btn {
  border: none;
  height: 49px;
  width: 49px;
  font-size: 12px;
  background: #4D2ADC;
  color: #fff;
  transition: all .3s ease;
  letter-spacing: 0.17em;
  border-radius: 16px;
  margin-left: 10px;
}

.apply-btn:hover {
  box-shadow: 0px 2px 16px 2px rgb(206 54 201 / 22%);
}

.apply-btn img {
  height: 20px;
}
</style>
