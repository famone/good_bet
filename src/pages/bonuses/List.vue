<template>
  <div>
    <Navbar/>

    <section id="bonus-list">
      <div class="container">
        <h2 class="mb-30">Bonuses</h2>
        <div class="row">
          <div class="text-center" v-if="loading">
            <img alt="loading" src="../../assets/img/icons/nv6.svg" class="spin">
          </div>


          <div v-if="bonuses" v-for="bonus in bonuses" v-bind:key="bonus.id" class="col-lg-4">
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
                  <button class="save-btn"><img src="../../assets/img/apply.svg" alt=""></button>
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

    </section>
  </div>
</template>

<script>
import Navbar from '../../components/ui/Navbar.vue'
import {mapGetters} from 'vuex'

export default {
  components: {Navbar},
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      bonuses: "bonuses/getAll"
    }),
  },
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.$store.dispatch('bonuses/loadAll').then(() => {
      this.loading = false
    })
  }

}
</script>

<style scoped>
.bonus-img {
  height: 180px;
  width: 100%;
  background-image: url(../../assets/img/slider1.png);
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