<template>
  <div>
    <Navbar @chDynPage="updateDynPage"/>
    <section id="groupPage">
      <div class="games-row">
        <div class="container">
          <div class="games-row-box">


            <div class="row">
              <div class="text-center" v-if="loader">
                <img src="../assets/img/icons/nv6.svg" class="spin">
              </div>

              <div class="text-center" v-else-if="gamesArr < 1">
                <h3>Oops, No games yet!</h3>
              </div>
              <gameBox v-for="game in gamesArr" :game="game" v-else/>
            </div>

            <template>
              <paginate
                  :page-count=pageCount
                  :click-handler="changePage"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page-item'">
              </paginate>
            </template>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from 'axios'
import Navbar from '../components/ui/Navbar.vue'
import gameBox from '../components/ui/gameBox.vue'
import Paginate from 'vuejs-paginate'
import {API} from "../api";

const API_GAMES_ENDPOINT = process.env.CASINO_APP_API_URL + 'games';
const API_GAMES_DEFAULT_FIELDS = 'details,launch_types,images,type,provider,canonical';
export default {
  components: {gameBox, Navbar, Paginate},
  props: ["id"],
  data() {
    return {
      gamesArr: [],
      pageCount: 0,
      loader: true
    }
  },
  created() {
    axios.get(API_GAMES_ENDPOINT, {
      params: {
        expand: API_GAMES_DEFAULT_FIELDS,
        group_id: this.$route.params.id.toString()
      }
    }).then(this._resCallback.bind(this))
  },
  methods: {
    changePage(pageNumber) {
      this.loader = true
      axios.get(API_GAMES_ENDPOINT, {
        params: {
          expand: API_GAMES_DEFAULT_FIELDS,
          group_id: this.$route.params.id.toString(),
          page: pageNumber
        }
      }).then(this._resCallback.bind(this))
    },
    updateDynPage() {
      this.loader = true
      this.pageCount = 0
      axios.get(API_GAMES_ENDPOINT, {
        params: {
          expand: API_GAMES_DEFAULT_FIELDS,
          group_id: this.$route.params.id.toString()
        }
      }).then(this._resCallback.bind(this))
    },
    _resCallback(res) {
      this.pageCount = parseInt(res.headers['x-pagination-page-count'])
      this.gamesArr = res.data
      this.loader = false
    },
  }
}
</script>