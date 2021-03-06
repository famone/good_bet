<template>
  <div>
    <Navbar/>
    <section id="groupPage">
      <div class="games-row">
        <div class="container">
          <div class="games-row-box">


            <div class="row">
              <div class="text-center" v-if="loader">
                <img src="../../assets/img/icons/nv6.svg" class="spin">
              </div>
              <div class="text-center" v-else-if="gamesArr < 1">
                <h3>{{ $t('games.noGamesTextInList') }}</h3>
              </div>

              <gameBox v-for="(game, index) in gamesArr" v-bind:key="game.id" :game="game" @updateFavs="favUpdate(index)" v-else/>
            </div>


          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import gameBox from '../../components/ui/gameBox.vue'
import {mapGetters} from "vuex";

export default {
  components: {gameBox, Navbar},
  computed: {
    ...mapGetters({
      gamesArr: 'games/getFavorites'
    })
  },
  data() {
    return {
      loader: true
    }
  },
  methods: {
    favUpdate(index){
      delete this.gamesArr.splice(index, 1)
    }
  },
  created() {
    this.$store.dispatch('games/loadFavorites').then(() => {
      this.loader = false
    });
    //TODO resolve this on promise

  },
}
</script>