<template>
  <div class="winners-row">
    <div class="container">
      <div class="winners-row-box">
        <div class="winners-row-top">
          <h2>{{ $t('winners.title') }}</h2>
        </div>

        <div class="row winners-row-swiper-container" v-if="winners.length">
          <swiper ref="mySwiper2" :options="swiperOptions">
            <swiper-slide v-for="winner in winners" v-bind:key="winner.id">
              <div class="swiper-wrapper">
                <winner-box :winner="winner"/>
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
import Skeletons from '../components/Skeletons.vue'
import {mapGetters} from "vuex";
import WinnerBox from "./ui/WinnerBox";

export default {
  components: {WinnerBox, Skeletons},
  computed: {
    ...mapGetters({
      winners: "winners/getAll",
    })
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        infinite: true,
        touchRatio: 1,
        centeredSlides: false,
        draggable: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
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
            slidesPerView: 3,
            spaceBetween: 20,
            touchRatio: 1
          }
        }

      }
    }
  },
  created() {
    this.$store.dispatch('winners/loadAll')
  }
}
</script>

<style>
.winners-row-box {
  padding: 40px;
  background-color: #1D1B49;
  border-radius: 30px;
  margin-bottom: 40px;
}

.winners-row-box h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.winners-row-box h2 img {
  margin-right: 16px;
  height: 26px;
}

.winners-row-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 33px;
}
.winners-row-top h2 {
  color: #dfa945;
}

.winners-row-swiper-container {
  overflow: hidden;
}

</style>