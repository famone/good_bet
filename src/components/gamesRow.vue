<template>
  <div class="games-row">
    <div class="container">
      <div class="games-row-box">
        <div class="games-row-top">
          <h2>{{ titleRow }}</h2>
          <router-link class="see-all" tag="button" :to="link">{{ $t('games.seeAllLinkTitle') }}<img
              src="../assets/img/see.svg" alt=""></router-link>
        </div>

        <div v-if="gamesArr.length" class="row games-row-swiper-container" v-on:mouseenter="stopAutoplay"
             v-on:mouseleave="playAutoplay">

          <swiper ref="gamesSwiper" :options="swiperOptions" v-if="gamesArr">
            <swiper-slide v-for="item in gamesArr.slice(0, 16)" v-bind:key="item.id">
              <div class="swiper-wrapper">
                <game-box :game="item"/>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <Skeletons v-else/>
      </div>


    </div>
  </div>
</template>


<script>
import gameBox from '../components/ui/gameBox.vue'
import Skeletons from '../components/Skeletons.vue'

export default {
  components: {gameBox, Skeletons},
  props: {
    gamesArr: {
      required: true,
      type: Array
    },
    titleRow: {
      required: true,
      type: String
    },
    link: {
      required: false,
      type: String
    }
  },
  methods: {
    stopAutoplay() {
      this.$refs.gamesSwiper.$swiper.autoplay.stop()
    },
    playAutoplay() {
      this.$refs.gamesSwiper.$swiper.autoplay.start()
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        infinite: true,
        touchRatio: 1,
        centeredSlides: false,
        draggable: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1.18,
            centeredSlides: true,
            spaceBetween: 15,
            touchRatio: 1
          },
          768: {
            slidesPerView: 2,
            touchRatio: 1
          },
          1150: {
            slidesPerView: 4,
            spaceBetween: 20,
            touchRatio: 1
          }
        }

      }
    }
  }
}
</script>

<style>
.games-row-swiper-container {
  overflow: hidden;
}
</style>