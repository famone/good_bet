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

              <gameBox v-for="game in gamesArr" v-bind:key="game.id" :game="game" v-else/>
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
import {API} from "../../api";

export default {
  components: {gameBox, Navbar},
  data() {
    return {
      gamesArr: [],
      loader: true
    }
  },
  created() {
    API.get('games', {
      params: {
        expand: 'images, launch_types, type',
        favorite: true
      }
    }).then(res => {
      this.gamesArr = res.data
      this.loader = false
    })
  },
}
</script>