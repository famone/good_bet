<template>
  <div>
    <Navbar/>

    <section id="groupPage">
      <div class="games-row">
        <div class="container">
          <div class="games-row-box">

            <div class="row">
              <div class="row">
                <div class="col-lg-9"></div>
                <div class="col-lg-3">
                  <label class="provider-select">
                    <select @change="handleProviderSelection($event)">
                      <option value="0">{{ $t('games.providerSelectTitle') }}</option>
                      <option v-for="provider in gameProviders" :value="provider.id">{{ provider.name }}</option>
                    </select>
                  </label>

                </div>
              </div>
              <br>
              <Skeletons v-if="loader" v-bind:row-count="4"/>

              <div class="text-center" v-else-if="!gamesArr.length">
                <h3>{{ $t('games.noGamesTextInList') }}</h3>
              </div>

              <div class="col-lg-3 col-sm-6" v-if="gamesArr.length" v-for="game in gamesArr" v-bind:key="game.id">
                <game-box :game="game"/>
              </div>


            </div>
            <scroll-loader v-if="gamesArr.length" :loader-method="getGameList" :loader-disable="disableAutoLoading">
              <p class="white-txt">{{ $t('main.loading') }}</p>
            </scroll-loader>
          </div>
        </div>
      </div>
    </section>

  </div>

</template>


<script>


import Navbar from '../components/ui/Navbar.vue'
import gameBox from '../components/ui/gameBox.vue'
import Skeletons from '../components/Skeletons.vue'
import {API} from "../api";
import {mapGetters} from "vuex";

const API_GAMES_DEFAULT_FIELDS = 'details,launch_types,images,type,provider,canonical';
export default {
  components: {gameBox, Navbar, Skeletons,},
  props: ["id"],
  data() {
    return {
      gamesArr: [],
      pageCount: 1,
      page: 1,
      loader: true,
      disableAutoLoading: false,
      currentProviderId: null,
      currentGroupId: null
    }
  },
  watch: {
    id(newValue, oldVersion) {
      if (newValue !== oldVersion) {
        this.updateDynPage(newValue)
      }
    }
  },
  created() {
    this.$store.dispatch('gameProviders/loadAll')
    API.get('games', {
      params: {
        expand: API_GAMES_DEFAULT_FIELDS,
        group_id: this.id
      }
    }).then(this._resCallback.bind(this))
  },
  computed: {
    ...mapGetters({
      currentLang: 'lang/getCurrent',
      gameProviders: 'gameProviders/getAll'
    })
  },
  methods: {
    getGameList() {
      API.get('games', {
        params: {
          expand: API_GAMES_DEFAULT_FIELDS,
          group_id: this.$route.params.id.toString(),
          page: ++this.page
        }
      }).then(res => {
        this.disableAutoLoading = this.pageCount <= this.page;
        this.gamesArr = [...this.gamesArr, ...res.data];
      })
    },
    updateDynPage(id) {
      this.gamesArr = []
      this.loader = true
      this.pageCount = 1
      this.page = 1
      this.currentGroupId = id
      let params = {
        expand: API_GAMES_DEFAULT_FIELDS,
        group_id: this.currentGroupId
      }

      if (this.currentProviderId !== null) {
        params.provider_id = this.currentProviderId
      }

      API.get('games', {
        params: params
      }).then(this._resCallback.bind(this))
    },
    handleProviderSelection(event) {
      if (event.target.value !== '0') {
        this.currentProviderId = event.target.value
        this.updateDynPage(this.id)
      } else {
        this.currentProviderId = null
        this.updateDynPage(this.id)
      }
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

<style>

label.provider-select {
  position: relative;
  display: inline-block;
  width: 270px;
}

.provider-select select {
  display: inline-block;
  padding: 4px 3px 3px 5px;
  margin: 0;
  font: inherit;
  outline: none;
  line-height: 1.2;
  background: #000;
  color: white;
  border: 0;
  width: 270px;
  height: 45px;
}


.provider-select:after {
  content: "▼";
  position: absolute;
  top: 7px;
  right: 0;
  bottom: 0;
  font-size: 160%;
  line-height: 30px;
  padding: 0 7px;
  background: #000;
  color: white;
  pointer-events: none;
}

.no-pointer-events .provider-select:after {
  content: none;
}

</style>