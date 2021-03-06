<template>
  <div>
    <Navbar/>

    <section id="gameSec">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="breadcrumbs">
              <h2>
                <router-link tag="span" to="/games" class="br-link">{{ $t('games.gamesUPPER') }}</router-link>
                /
                <span class="to-upper">{{ gameName }}</span>
              </h2>
              <div class="tool-btns">
                <div class="full-screen-btn hidden-xs" @click="flscrnMode = true">
                  <img src="../assets/img/screen.svg" alt="">
                </div>
              </div>
            </div>
            <div class="conection text-center" v-if="gameLauncher === '' ">
              <br><br>
              <img alt="$t('main.loading')" src="../assets/img/icons/nv6.svg" class="spin">
              <p class="white-txt">{{ $t('games.connecting') }}</p>
              <br><br>
            </div>
            <div class="game-louncher" v-else :class="{fullscreenGame : flscrnMode}">
              <div class="full-screen-btn exit-full hidden-xs" @click="flscrnMode = false" v-if="flscrnMode">
                <img src="../assets/img/cross.svg" alt="">
              </div>
              <iframe :src="gameLauncher" frameborder="0"></iframe>
            </div>
          </div>
          <div class="col-lg-4">
            <accordeons/>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
import Navbar from '../components/ui/Navbar.vue'
import accordeons from '../components/ui/accordeons.vue'
import {API} from "../api";
import {mapGetters} from "vuex";

export default {
  components: {Navbar, accordeons},
  data() {
    return {
      gameLauncher: '',
      gameName: '',
      gameObj: '',
      flscrnMode: false
    }
  },
  computed: {
    ...mapGetters({
      player: 'player/getCurrent'
    })
  },
  watch: {
    player(newVersion, oldVersion) {
      if (!newVersion || !oldVersion) {
        return;
      }

      let oldAccount = oldVersion.accounts.find(item => {
        if (item.is_current === true) {
          return item;
        }
      })

      let newAccount = newVersion.accounts.find(item => {
        if (item.is_current === true) {
          return item;
        }
      })

      if (oldAccount.id !== newAccount.id) {
        this.$router.go();
      }
    }
  },
  created() {
    let routeId = parseInt(this.$route.params.id)

    let gameConfig = {
      game_id: routeId,
      launch_type: "real",
      callbacks: [
        {
          "type": "return",
          "redirect_uri": "http://casino.com"
        }
      ]
    }


    API.post('game-launches', gameConfig).then(response => {
      this.gameLauncher = response.data.launch_url
      this.gameObj = response.data
    }).catch(error => {
    })

    API.get('games/' + routeId)
        .then(response => {
          this.gameName = response.data.name
        })
  },
  mounted() {
    let options = {
      offset: -100,
    }

    this.$scrollTo('#gameSec', 300, options)

    setInterval(() => {
      this.$store.dispatch('player/loadCurrent')
    }, 3000)
  },
  beforeDestroy() {

  }
}
</script>


<style>

</style>