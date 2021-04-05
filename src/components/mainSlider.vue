<template>
  <section class="main-slider">
    <div class="container">
      <div class="row slider-row" v-if="imagesLoaded">
        <img src="../assets/img/blurcoins-left.svg" class="blur-coins-left hidden-xs hidden-sm hidden-md">
        <img src="../assets/img/blurcoins-up.svg" class="blur-coins-up hidden-xs hidden-sm hidden-md">
        <img src="../assets/img/blurcoins-down.svg" class="blur-coins-down hidden-xs hidden-sm hidden-md">
        <img src="../assets/img/smallbone.svg" class="small-bone hidden-xs hidden-sm hidden-md">
        <img src="../assets/img/blur-pastic.svg" class="blur-plastic hidden-xs hidden-sm hidden-md">

        <swiper ref="mainSlider" :options="swiperOptions">
          <swiper-slide v-for="item in slider" v-bind:key="item.id">
            <router-link tag="a" :to="item.body" class="main-slider-slide-link">
              <div class="slider-banner" :style="{'background-image': 'url(' + item.image.url + ')'}"></div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination"></div>

        </swiper>
        <!-- btns -->
        <div class="nav-btns">
          <div class="button-prev"></div>
          <div class="button-next"></div>
        </div>

      </div>

      <div class="slider-skeleton skeleton" v-else></div>

    </div>
  </section>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      imagesLoaded: false,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        touchRatio: 1,
        infinite: true,
        effect: 'fade',
        speed: 800,
        centeredSlides: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev',
        },
      }
    }
  },
  computed: {
    ...mapGetters({slider: "slider/getMain"}),
  },
  created() {
    this.$store.dispatch("slider/loadMain").then(() => {
      this.imagesLoaded = true
    })
  }
}
</script>

<style>

.main-slider {
  margin: 140px 0 45px 0;
}

.slider-banner {
  height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  border-radius: 30px;
  position: relative;
}

.swiper-pagination {
  position: absolute;
  width: 100%;
  bottom: 24px;
  left: 0;
}

.swiper-pagination-bullet {
  background: transparent !important;
  margin: 0 7px;
  height: 10px !important;
  width: 10px !important;
  border: 2px #fff solid;
  opacity: 1 !important;
}

.swiper-pagination-bullet-active {
  background: #fff !important;
}

.nav-btns {
  position: absolute;
  z-index: 30;
  top: calc(50% - 22px);
  width: 100%;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.slider-row {
  position: relative;
}

.button-next, .button-prev {
  background-color: #110F2B;
  height: 44px;
  width: 44px;
  background-image: url(../assets/img/sliderarr.svg);
  background-size: 14px;
  border-radius: 50px;
  background-position: center;
  background-repeat: no-repeat;
}

.button-next {
  transform: rotate(180deg);
  margin-right: -22px;
}

.button-prev {
  margin-left: -22px;
}

.blur-coins-left {
  position: absolute;
  right: 0;
  z-index: 20;
  top: 101px;
  height: 199px;
  left: -214px;
  filter: blur(4px);
}

.blur-coins-up {
  position: absolute;
  right: 0;
  z-index: 20;
  top: -32px;
  height: 143px;
}

.blur-coins-down {
  position: absolute;
  right: -17px;
  z-index: 20;
  bottom: -50px;
  height: 150px;
}

.small-bone {
  position: absolute;
  z-index: 20;
  top: 40px;
  left: -20px;
}

.blur-plastic {
  position: absolute;
  bottom: -16px;
  z-index: 20;
  left: 30%;
}

.main-slider-slide-link {
  display: block;
}
</style>