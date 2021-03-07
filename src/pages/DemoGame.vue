<template>
  <div>
    <Navbar/>

    <section id="gameSec">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div  v-if="game && gameLauncher">
              <div class="breadcrumbs">
                <h2>
                  <router-link tag="span" to="/games" class="br-link">GAMES</router-link>
                  /
                  <span class="to-upper">{{ game.name }}</span>
                </h2>
                <div class="tool-btns">
                  <div class="full-screen-btn hidden-xs" @click="flscrnMode = true">
                    <img src="../assets/img/screen.svg" alt="">
                  </div>
                </div>
              </div>
              <div class="conection text-center" v-if="gameLauncher.launch_url === '' ">
                <br><br>
                <img alt="loading" src="../assets/img/icons/nv6.svg" class="spin">
                <p class="white-txt">{{ $t('games.connecting') }}</p>
                <br><br>
              </div>
              <div class="game-louncher" v-else :class="{fullscreenGame : flscrnMode}">
                <div class="full-screen-btn exit-full hidden-xs" @click="flscrnMode = false" v-if="flscrnMode">
                  <img src="../assets/img/cross.svg" alt="">
                </div>
                <iframe :src="gameLauncher.launch_url" frameborder="0"></iframe>
              </div>
            </div>

          </div>
          <div class="col-lg-3">
            <accordeons/>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import Navbar from '../components/ui/Navbar.vue'
import accordeons from '../components/ui/accordeons.vue'

export default {
  components: {Navbar, accordeons},
  data() {
    return {
      flscrnMode: false
    }
  },
  computed: {
    ...mapGetters({
      game: 'game/get',
      gameLauncher: 'gameLauncher/get'
    })
  },
  created() {
    let routeId = parseInt(this.$route.params.id)

    this.$store.dispatch('gameLauncher/createDemo', routeId)
    this.$store.dispatch('game/loadById', routeId)
  },
  mounted() {
    this.$scrollTo('#gameSec', 300, {
      offset: -100,
    })
  }
}
</script>


<style>

</style>