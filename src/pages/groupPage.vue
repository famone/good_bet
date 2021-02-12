<template>
  <div>
    <Navbar/>

    <section id="groupPage">
      <div class="games-row">
        <div class="container">
          <div class="games-row-box">


            <div class="row">
              <div class="text-center" v-if="loader">
                <img alt="loading" src="../assets/img/icons/nv6.svg" class="spin">
              </div>

              <div class="text-center" v-else-if="gamesArr.length < 1">
                <h3>{{ $t('games.noGamesTextInList') }}</h3>
              </div>
              <gameBox v-for="game in gamesArr" :game="game" v-bind:key="game.id" v-else/>
            </div>

            <scroll-loader :loader-method="getGameList" :loader-disable="disableAutoLoading">
              <p class="white-txt">{{ $t('main.loading') }}</p>
            </scroll-loader>


          </div>
        </div>
      </div>
    </section>
    <p class="hidden">{{loadgames}}</p>

  </div>

</template>


<script>


import Navbar from '../components/ui/Navbar.vue'
import gameBox from '../components/ui/gameBox.vue'
import {API} from "../api";

const API_GAMES_DEFAULT_FIELDS = 'details,launch_types,images,type,provider,canonical';
export default {
  components: {gameBox, Navbar},
  props: ["id"],
  data() {
    return {
      gamesArr: [],
      pageCount: 1,
      page: 1,
      loader: true,
      disableAutoLoading: false
    }
  },
  created() {
    API.get('games', {
      params: {
        expand: API_GAMES_DEFAULT_FIELDS,
        group_id: this.id
      }
    }).then(this._resCallback.bind(this))
  },
  computed: {
    loadgames(){
      return this.updateDynPage(this.id.toString())
    }
  },
  methods: {
    getGameList() {
      // this.loader = true

      API.get('games', {
        params: {
          expand: API_GAMES_DEFAULT_FIELDS,
          group_id: this.$route.params.id.toString(),
          page: ++this.page
        }
      }).then(res => {
        this.disableAutoLoading = this.pageCount <= this.page;
        this.gamesArr = [...this.gamesArr, ...res.data];
      }).catch(error => {
        console.log(error);
      })
    },
    updateDynPage(id) {
      this.gamesArr = []
      this.loader = true
      this.pageCount = 1
      this.page = 1
      API.get('games', {
        params: {
          expand: API_GAMES_DEFAULT_FIELDS,
          group_id: id
        }
      }).then(this._resCallback.bind(this))
    },
    _resCallback(res) {
      this.pageCount = parseInt(res.headers['x-pagination-page-count'])
      this.disableAutoLoading = this.pageCount <= this.page;
      this.gamesArr = res.data
      this.loader = false
    },
  }
}
</script>