<template>
  <div class="winner-box">
    <div class="row">
      <div class="col-lg-3">
        <div class="winner-game-image" :style="{'background-image': 'url(' + winner.game.images[0].url + ')'}"></div>
      </div>
      <div class="col-lg-4">
        <div class="row">
          <p class="winner-name">{{ winner.username }}</p>
        </div>
        <div class="row">
          <p class="winner-game-name">{{ winner.game.name }}</p>
        </div>
      </div>
      <div class="col-lg-5">
        <p class="winner-just-won">{{ $t('winners.justWon') }}</p>
        <p class="winner-won-amount">{{ winner.amount_as_currency }}</p>
      </div>
    </div>
    <div class="winner-body">
      <div class="row winner-action-buttons">
        <div class="col-lg-6">
          <router-link tag="a" :to="realGameLink()" class="winner-game-play-btn">
            {{ $t('winners.play') }}
          </router-link>
        </div>
        <div class="col-lg-6">
          <router-link class="winner-game-demo-play-btn" tag="a" :to="'/demo-game/' + winner.game.id.toString()"
                       v-if="isDemoExist()">Demo
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    winner: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({player: "player/getCurrent"}),
  },
  methods: {
    realGameLink() {
      if (this.player) {
        return '/real-game/' + this.winner.game.id.toString()
      } else {
        return '/enter'
      }
    },
    isDemoExist() {
      return this.winner.game.launch_types.includes('demo');
    },
  }
}
</script>


<style>
.winner-box {
  overflow: hidden;
  border-radius: 30px;
  width: 100%;
  padding: 25px 20px 20px 25px;
  background-color: #272459;
}

.winner-game-image {
  height: 60px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 10px;
}

.winner-body {
  padding: 20px 22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.winner-name {
  min-height: 38px;
  color: #fff;
  font-size: 25px;
  font-weight: 300;
  margin-bottom: 5px;
  margin-top: 0;
}

.winner-game-name {
  min-height: 38px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 0;
}

.winner-won-amount {
  min-height: 38px;
  color: #dfa945;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 0;
  text-align: center;
  text-transform: uppercase;
}

.winner-just-won {
  color: #fff;
  opacity: .3;
  font-size: 17px;
  text-align: center;
  font-weight: 300;
}

.winner-just-won p {
  margin: 0;
}

.winner-action-buttons {
  margin: auto;
}

.winner-game-play-btn {
  margin-top: 5px;
  padding: 9px 45px;
  border-radius: 50px;
  color: #fff;
  font-size: 11px;
  letter-spacing: 0.17em;
  transition: all .3s ease;
  border: none;
  background: #4D2ADC;
  cursor: pointer;
}

.winner-game-play-btn:hover {
  box-shadow: 0px 2px 16px 2px rgba(206, 54, 201, 0.22);
}

.winner-game-demo-play-btn {
  cursor: pointer;
  height: 50px;
  margin-left: 15px;
  color: #fff;
  font-weight: 300;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}

</style>
