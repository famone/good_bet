<template>
  <div>
    <Navbar/>

    <section id="gameSec">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div  v-if="game && gameLauncher">
              <div class="breadcrumbs">
                <h2>
                  <router-link tag="span" to="/games" class="br-link">{{ $t('games.gamesUPPER') }}</router-link>
                  /
                  <span class="to-upper">{{ game.name }}</span>
                </h2>
                <div class="tool-btns">
                  <div class="full-screen-btn hidden-xs" @click="fullScreenMode = true">
                    <img src="../assets/img/screen.svg" alt="">
                  </div>
                </div>
              </div>
              <div class="conection text-center" v-if="gameLauncher.launch_url === '' ">
                <br><br>
                <img alt="$t('main.loading')" src="../assets/img/icons/nv6.svg" class="spin">
                <p class="white-txt">{{ $t('games.connecting') }}</p>
                <br><br>
              </div>
              <div class="game-louncher" v-else :class="{fullscreenGame : fullScreenMode}">
                <div class="full-screen-btn exit-full hidden-xs" @click="fullScreenMode = false" v-if="fullScreenMode">
                  <img src="../assets/img/cross.svg" alt="">
                </div>
                <iframe :src="gameLauncher.launch_url" frameborder="0"></iframe>
              </div>
            </div>

          </div>
          <div class="col-lg-4 game-right-side-information-block">
            <accordions :data="accordionsData"/>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
import Navbar from '../components/ui/Navbar.vue'
import {mapGetters} from "vuex";
import Accordions from "../components/ui/accordions";

export default {
  components: {Accordions, Navbar},
  data() {
    return {
      fullScreenMode: false,
      accordionsData: [
        {
          name: 'Recent winners',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
          active: false
        },
        {
          name: 'Game information',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
          active: false
        },
        {
          name: 'Related gamesv',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
          active: false
        },
        {
          name: 'Description',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
          active: false
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
      game: 'game/get',
      gameLauncher: 'gameLauncher/get'
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

    this.$store.dispatch('gameLauncher/createReal', routeId)
    this.$store.dispatch('game/loadById', routeId)
  },
  mounted() {
    let options = {
      offset: -100,
    }

    this.$scrollTo('#gameSec', 300, options)
  },
  beforeDestroy() {

  }
}
</script>


<style>
.game-right-side-information-block {
  margin-top: 85px;
}
</style>