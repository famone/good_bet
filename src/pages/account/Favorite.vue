<template>
  <div>
    <Navbar/>
    <section id="groupPage">
      <div class="games-row">
        <div class="container">
          <div class="games-row-box">


            <div class="row">
              <Skeletons v-if="loader" v-bind:row-count="2"/>

              <div v-else-if="gamesArr < 1" class="text-center">
                <h3>{{ $t('games.noGamesTextInList') }}</h3>
              </div>

              <div class="col-lg-3 col-sm-6" v-else v-for="(game, index) in gamesArr" v-bind:key="game.id">
                <game-box :game="game" @updateFavs="favUpdate(index)"/>
              </div>
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
import Skeletons from "../../components/Skeletons";

export default {
  components: {Skeletons, gameBox, Navbar},
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
    favUpdate(index) {
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