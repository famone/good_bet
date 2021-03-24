<template>
  <div>
    <Navbar/>

    <section id="bonus-list">
      <div class="container">
        <h2 class="mb-30">Bonuses</h2>
        <div class="row">
          <skeletons v-if="loading" :element-per-count="3" element-wrapper-class="col-lg-4 col-sm-6"/>

          <div v-else-if="bonuses" v-for="bonus in bonuses" v-bind:key="bonus.id" class="col-lg-4">
            <div class="news-card">
              <div class="bonus-img"
                   :style="{'background-image': bonus.banners.length ? 'url(' + bonus.banners[0].url + ')' : ''}">
                <div class="read-news">
                  <router-link tag="a" :to=" '/bonuses/' + bonus.id " class="read-btn">
                    <img src="../../assets/img/see.svg" alt="">
                  </router-link>
                </div>

              </div>
              <div class="news-body">
                <h3>{{ bonus.title }}</h3>
                <p class="bonus-descr" v-if="bonus.description" v-html="bonus.description.substring(0,90) + '...'"></p>
                <p class="bonus-descr" v-else></p>
                <div v-if="player">
                  <button class="save-btn" @click="openConfirmationPopup(bonus)">Subscribe</button>
                  <button class="save-btn"><img src="../../assets/img/aplyed.svg" alt=""></button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h3>Bonuses not found</h3>
          </div>

        </div>
      </div>
      <SubscribePopup v-if="isBonusSubscriptionConfirmationPopup" :bonus="currentSubscriptionBonusInPopup" @cancelBonusSubscription="closeConfirmationPopup"/>

    </section>
  </div>
</template>

<script>
import Navbar from '../../components/ui/Navbar.vue'
import {mapGetters} from 'vuex'
import SubscribePopup from "../../components/bonus/SubscribePopup";
import Skeletons from "../../components/Skeletons";

export default {
  components: {Skeletons, SubscribePopup, Navbar},
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
      currentSubscriptionBonusInPopup: null
    }
  },
  created() {
    this.$store.dispatch('bonuses/loadAll').then(() => {
      this.loading = false
    })
  },
  methods: {
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
.bonus-img {
  height: 180px;
  width: 100%;
  background-image: url(../../assets/img/bonus/default.png);
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bonus-descr {
  font-size: 16px;
  font-weight: 400;
  opacity: .4;
  color: #fff;
  line-height: 22px;
  height: 50px;
}

.news-body .save-btn img {
  height: 15px;
}
</style>