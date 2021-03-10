<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('Mybonuses.name') }}</h2>

            <button class="switch-btn"
                    :class="{activeSwitch : activeBonusTab}"
                    @click="switchToActiveBonuses()">{{ $t('Mybonuses.active') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : !activeBonusTab}"
                    @click="switchToAvailableBonuses()">{{ $t('Mybonuses.available') }}
            </button>


            <!--<div class="text-center" v-if="!bonusList">
              <img alt="loading" src="../../assets/img/icons/nv6.svg" class="spin">
            </div>-->

            <div class="row-bonuses" v-if="activeBonusList && activeBonusTab">
              <div v-for="bon in activeBonusList" class="col-lg-4">
                <div class="news-card">

                  <!-- <pre>{{bon}}</pre> -->
                  <div class="news-img"
                       :style="{'background-image': bon.bonus.banners.length ? 'url(' + bon.bonus.banners[0].url + ')' : ''}">

                  </div>
                  <div class="news-body">
                    <h3>{{ bon.bonus.title }}</h3>
                    <p class="bonus-descr" v-if="bon.bonus.description"
                       v-html="bon.bonus.description.substring(0,90) + '...'"></p>
                    <p class="bonus-descr" v-else></p>

                    <button class="save-btn" @click="openActiveBonus(bon)">MORE</button>

                  </div>
                </div>
              </div>
            </div>


            <div class="row-bonuses" v-if=" availableBonusList && !activeBonusTab">
              <div v-for="bon in availableBonusList" class="col-lg-4">
                <div class="news-card">

                  <!-- <pre>{{bon}}</pre> -->
                  <div class="news-img"
                       :style="{'background-image': bon.banners.length ? 'url(' + bon.banners[0].url + ')' : ''}">

                  </div>
                  <div class="news-body">
                    <h3>{{ bon.title }}</h3>
                    <p class="bonus-descr" v-if="bon.description" v-html="bon.description.substring(0,90) + '...'"></p>
                    <p class="bonus-descr" v-else></p>


                    <button class="save-btn" @click="openAvailableBonus(bon)">MORE</button>
                    <button class="apply-btn" @click="subscribeBonus(bon.id)">
                      <img src="../../assets/img/apply.svg">
                    </button>

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
      activeBonusList: 'bonusTransactions/getActiveBonusTransactions',
      availableBonusList: 'bonuses/getAll'
    }),
  },
  data() {
    return {
      activeBonusTab: true,
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
      this.activeBonusTab = true;
      this.loader = true;
      this.$store.dispatch('bonusTransactions/loadActive').then(() => {
        this.loader = false;
      })
    },
    switchToAvailableBonuses() {
      this.activeBonusTab = false;
      this.loader = true;
      this.$store.dispatch('bonuses/loadAll').then(() => {
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
