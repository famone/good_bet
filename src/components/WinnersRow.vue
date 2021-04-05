<template>
  <div class="winners-row">
    <div class="container">
      <div class="winners-row-box">
        <div class="winners-row-top">
          <div class="winners-row-title-wrapper">
            <h2>{{ $t('winners.title') }}</h2>
          </div>
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
        <Skeletons v-else v-bind:element-per-count="3" element-wrapper-class="col-lg-4 col-sm-6"/>
      </div>


    </div>
  </div>
</template>
<script>
import Skeletons from '../components/Skeletons.vue'
import WinnerBox from "./ui/WinnerBox";

export default {
  components: {WinnerBox, Skeletons},
  props: {
    winners: {
      required: true,
      type: Array
    },
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
.winners-row-title-wrapper {
  color: #dfa945;
  margin: auto;
  background-image: url("../assets/img/winnersTitleBackground.svg");
  background-size: cover;
  height: 35px;
  width: 300px;
}

.winners-row-title-wrapper h2 {
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-align: center;
  padding-top: 7px;
}

.winners-row-swiper-container {
  overflow: hidden;
}

</style>