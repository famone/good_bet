<template>
  <div>
    <Navbar/>

    <section id="gameSec">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="breadcrumbs">
              <h2>
                <router-link tag="span" to="/games" class="br-link">GAMES</router-link>
                /
                <span class="to-upper">{{ gameName }}</span>
              </h2>
              <div class="tool-btns">

              </div>
            </div>
            <div class="conection text-center" v-if="gameLauncher === '' ">
              <br><br>
              <img alt="loading" src="../assets/img/icons/nv6.svg" class="spin">
              <p class="white-txt">Connecting</p>
              <br><br>
            </div>
            <div class="game-louncher" v-else>
              <iframe :src="gameLauncher" frameborder="0"></iframe>
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
import {API} from "../api";

export default {
  components: {Navbar, accordeons},
  data() {
    return {
      gameLauncher: '',
      gameName: ''
    }
  },
  computed: {
    ...mapGetters({games: "auth/getGames"}),
  },
  created() {

    let routeId = parseInt(this.$route.params.id)

    let gameConfig = {
      game_id: routeId,
      launch_type: "demo"
    }


    API.post('game-launches', gameConfig)
        .then(response => {
          this.gameLauncher = response.data.launch_url
        })

    API.get('games/' + routeId)
        .then(response => {
          this.gameName = response.data.name
        })
  }
}
</script>


<style>

</style>