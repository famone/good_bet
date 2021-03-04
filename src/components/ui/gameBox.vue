<template>
  <div class="col-lg-3 col-sm-6">
    <div class="game-box">
      <div class="game-image" :style="{'background-image': 'url(' + game.images[0].url + ')'}">
        <div class="play-layer">
          <router-link tag="a" :to="realGameLink()" class="play-btn">
            <img src="../../assets/img/play.svg" alt="">
          </router-link>
          <router-link tag="a" :to="'/demo-game/' + game.id.toString()" v-if="isDemoExist()">Demo</router-link>
        </div>
      </div>
      <div class="game-body">
        <div>
          <h3>{{ game.name }}</h3>
          <p class="grey-txt">{{ game.type.name }}</p>
        </div>
        <div v-if="player">
          <div class="like" @click="like(game.id)" v-if="!game.is_favorite">
            <img src="../../assets/img/like.svg" alt="">
          </div>
          <div class="like-full" @click="unLike(game.id), updateFavs($emit)" v-else>
            <img src="../../assets/img/likefull.svg" alt="">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {API} from "../../api";

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({player: "auth/getPlayer"}),
  },
  methods: {
    updateFavs(){
      this.$emit('updateFavs')
    },
    realGameLink() {
      if (this.player) {
        return '/real-game/' + this.game.id.toString()
      } else {
        return '/enter'
      }
    },
    isDemoExist() {
      return this.game.launch_types.includes('demo');
    },
    unLike(id) {
      this.game.is_favorite = false
      let request = {
        is_favorite: false
      }
      API.patch('games/' + id, request);
    },
    like(id) {
      this.game.is_favorite = true
      let request = {
        is_favorite: true
      }
      API.patch('games/' + id, request);
    }
  }
}
</script>

