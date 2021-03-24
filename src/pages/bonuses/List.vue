<template>
  <div>
    <Navbar/>

    <section id="bonus-list">
      <div class="container">
        <h2 class="mb-30">Bonuses</h2>
        <div class="row">
          <skeletons v-if="loading" :element-per-count="3" element-wrapper-class="col-lg-4 col-sm-6"/>

          <div v-else-if="bonuses" v-for="bonus in bonuses" v-bind:key="bonus.id" class="col-lg-4">
            <div class="bonus-card">
              <div v-if="bonus.banners.length"
                   class="bonus-img"
                   :style="{'background-image': 'url(' + bonus.banners[0].url + ')'}">
                  <div class="bonus-read-more">
                    <router-link tag="a" :to=" '/bonuses/' + bonus.id " class="read-btn">
                      <img src="../../assets/img/see.svg" alt="">
                    </router-link>
                  </div>
              </div>
              <div v-else class="bonus-img">
                <div class="bonus-read-more">
                  <router-link tag="a" :to=" '/bonuses/' + bonus.id " class="read-btn">
                    <img src="../../assets/img/see.svg" alt="">
                  </router-link>
                </div>
              </div>

              <div class="bonus-body">
                <p class="bonus-title">{{ bonus.title }}</p>

                <p class="bonus-description" v-if="bonus.description" v-html="bonus.description.substring(0,90) + '...'"></p>
                <p class="bonus-description" v-else></p>

                <div  class="bonus-action-buttons">
                  <button class="show-more-btn" @click="openShowMorePopup(bonus)">More</button>

                  <button v-if="player" class="subscribe-btn" @click="openConfirmationPopup(bonus)">Subscribe</button>
                  <router-link v-else to="/enter" class="subscribe-btn" tag="button">SUBSCRIBE</router-link>
                </div>
              </div>

            </div>
          </div>
          <div v-else>
            <h3>Bonuses not found</h3>
          </div>

        </div>
      </div>

      <subscribe-popup v-if="isBonusSubscriptionConfirmationPopup" :bonus="currentSubscriptionBonusInPopup" @cancelBonusSubscription="closeConfirmationPopup"/>
      <bonus-show-more-popup v-if="isBonusShowMorePopup" :bonus="currentBonusInShowMore" @closeShowMore="closeShowMorePopup"/>

    </section>
  </div>
</template>

<script>
import Navbar from '../../components/ui/Navbar.vue'
import {mapGetters} from 'vuex'
import SubscribePopup from "../../components/bonus/SubscribePopup";
import Skeletons from "../../components/Skeletons";
import BonusShowMorePopup from "../../components/bonus/BonusShowMorePopup";

export default {
  components: {BonusShowMorePopup, Skeletons, SubscribePopup, Navbar},
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      bonuses: "bonuses/getAll"
    }),
  },
  watch: {
    player() {
      this.$store.dispatch('bonuses/loadAll').then(() => {
        this.loading = false
      })
    }
  },
  data() {
    return {
      loading: true,
      isBonusSubscriptionConfirmationPopup: false,
      currentSubscriptionBonusInPopup: null,
      isBonusShowMorePopup: false,
      currentBonusInShowMore: null
    }
  },
  created() {
    this.$store.dispatch('bonuses/loadAll').then(() => {
      this.loading = false
    })
  },
  methods: {
    openShowMorePopup(bonus) {
      this.currentBonusInShowMore =  bonus
      this.isBonusShowMorePopup = true
    },
    closeShowMorePopup() {
      this.isBonusShowMorePopup = false
    },
    openConfirmationPopup(bonus) {
      this.currentSubscriptionBonusInPopup =  bonus
      this.isBonusSubscriptionConfirmationPopup = true
    },
    closeConfirmationPopup() {
      this.isBonusSubscriptionConfirmationPopup = false
    }
  }

}
</script>

<style scoped>


.bonus-card {
  border-radius: 30px;
  margin-bottom: 30px;
  overflow: hidden;
}

.bonus-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 0;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
}

.bonus-action-buttons {

}

.bonus-img {
  height: 180px;
  width: 100%;
  background-image: url(../../assets/img/bonus/default.png);
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bonus-read-more {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 24, 64, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .4s ease;
  opacity: 0;
}

.bonus-card:hover .bonus-read-more{
  opacity: 1;
}

.bonus-body {
  background: #1D1B49;
  padding: 30px;
  transition: all .4s ease;
  max-height: 190px;
}

.bonus-description {
  font-size: 16px;
  font-weight: 400;
  opacity: .4;
  color: #fff;
  line-height: 22px;
  height: 50px;
  overflow: hidden;
}

.bonus-card:hover {
  box-shadow: 0 2px 16px 2px rgb(206 54 201 / 10%)
}

.bonus-action-buttons {
  display: block;
}

.subscribe-btn,
.show-more-btn {
  border: none;
  height: 49px;
  font-size: 12px;
  background: #4D2ADC;
  color: #fff;
  transition: all .3s ease;
  letter-spacing: 0.17em;
  border-radius: 16px;
}

.subscribe-btn {
  margin-left: 10px;
}

.subscribe-btn,
.show-more-btn {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 120px;
}

.subscribe-btn:hover,
.show-more-btn:hover {
  box-shadow: 0px 2px 16px 2px rgb(206 54 201 / 22%);
}

.subscribe-btn img {
  height: 20px;
}
</style>