<template>
  <div>
    <Navbar/>

    <section id="gameSec">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div v-if="game && player && player.is_verified">
              <div class="breadcrumbs">
                <h2>
                  <router-link tag="span" to="/games" class="br-link">{{ $t('games.gamesUPPER') }}</router-link>
                  /
                  <span class="to-upper">{{ game.name }}</span>
                </h2>
                <div class="tool-btns" v-if="gameLauncher && gameLauncher.launch_url">
                  <div class="full-screen-btn hidden-xs" @click="fullScreenMode = true">
                    <img src="../assets/img/screen.svg" alt="">
                  </div>
                </div>
              </div>

              <div class="conection text-center" v-if="gameLauncher && gameLauncher.launch_url === '' ">
                <br><br>
                <img alt="$t('main.loading')" src="../assets/img/icons/nv6.svg" class="spin">
                <p class="white-txt">{{ $t('games.connecting') }}</p>
                <br><br>
              </div>
              <div class="game-louncher" v-else-if="gameLauncher && gameLauncher.launch_url" :class="{fullscreenGame : fullScreenMode}">
                <div class="full-screen-btn exit-full hidden-xs" @click="fullScreenMode = false" v-if="fullScreenMode">
                  <img src="../assets/img/cross.svg" alt="">
                </div>
                <iframe :src="gameLauncher.launch_url" frameborder="0"></iframe>
              </div>
              <div v-else-if="errorInLaunch" class="game-launch-error text-center">
                <br><br>
                <br><br>
                <p class="white-txt">{{ $t('games.gameLaunchErrorMsg') }}</p>
                <router-link to="/accounts" tag="button" class="save-btn">{{ $t('games.changeAccount') }}</router-link>
                <router-link to="/about" tag="button" class="save-btn">{{ $t('games.connectUs') }}</router-link>
              </div>
            </div>

            <div v-else-if="player && !player.is_verified">
              <br><br>
              <br><br>
              <br><br>
              <br><br>
              <br><br>
              <p class="white-txt">{{ $t('games.playerIsNotVerifiedMsg') }}</p>
              <router-link to="/documents" tag="button" class="save-btn">{{ $t('games.uploadDocuments') }}</router-link>
              <router-link to="/about" tag="button" class="save-btn">{{ $t('games.connectUs') }}</router-link>
            </div>
          </div>

          <div class="col-lg-4 game-right-side-information-block" v-if="game">
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
import Skeletons from "../components/Skeletons";

export default {
  components: {Accordions, Navbar, Skeletons},
  data() {
    return {
      fullScreenMode: false,
      errorInLaunch: false,
      loading: true,
      gameId: null
    }
  },
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
      game: 'game/get',
      gameLauncher: 'gameLauncher/get'
    }),
    accordionsData() {
      return [
        {
          name: 'Recent winners',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
          active: false
        },
        {
          name: 'Game information',
          desc: '<div>' + this.game.name + '</div>' +
              '<div>Provider: ' + this.game.provider.name +'</div>' +
              '<div>Groups: ' + this.game.groups.map(group => group.name) +'</div>',
          active: true
        },
        {
          name: 'Related games',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Natus quod, itaque placeat possimus quos labore culpa eius magnam aliquam eos obcaecati molestias odit autem quisquam cum, et dolor perspiciatis quo atque, ad. Fuga, voluptatibus ipsum, autem corrupti dignissimos exercitationem temporibus.',
          active: false
        },
        {
          name: 'Description',
          desc: this.game.description,
          active: true
        },
      ]
    }
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
    this.gameId = parseInt(this.$route.params.id)

    this.$store.dispatch('gameLauncher/createReal', this.gameId).then(() => {
      this.loading = false
    }).catch(() => {
      this.errorInLaunch = true
      this.loading = false
    })

    this.$store.dispatch('game/loadById', this.gameId)
  },
  mounted() {
    let options = {
      offset: -100,
    }

    this.$scrollTo('#gameSec', 300, options)
  },
  beforeDestroy() {

  },
}
</script>


<style>
.game-launch-error {
  margin: auto;
  text-align: center;
  font-size: 25px;
}

.game-launch-error a.white-txt:hover {
  color: #4D2ADC;
}

.game-right-side-information-block {
  margin-top: 85px;
}
</style>