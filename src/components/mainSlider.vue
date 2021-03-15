<template>
	<section id="mainSlider">
		<div class="container">
			<div class="row slider-row">
				<img src="../assets/img/blurcoins.svg" class="blur-coins hidden-xs">
				<img src="../assets/img/smallbone.svg" class="small-bone hidden-xs">
				<img src="../assets/img/blur-pastic.svg" class="blur-plastic hidden-xs">

				<swiper ref="mySwiper" :options="swiperOptions">
		    		<swiper-slide v-for="item in slider" v-bind:key="item.id">
			    		<div class="slider-banner" :style="{'background-image': 'url(' + item.image.url + ')'}">
			    		</div>
		    		</swiper-slide>
		    <div class="swiper-pagination"></div>
		    
		</swiper>
		<!-- btns -->
		    <div class="nav-btns">
				<div class="button-prev"></div>
		    	<div class="button-next"></div>
		    </div>
				
			</div>
		</div>
	</section>
</template>


<script>
import {mapGetters} from 'vuex'

	export default{
		data(){
			return{
				slides: [
					{
						img: require('../assets/img/slider2.png')
					},
					{
						img: require('../assets/img/slider1.png')
					},
					{
						img: require('../assets/img/slider2.png')
					},

				],
				swiperOptions: {
                  slidesPerView: 1,
                  spaceBetween:30,
                  loop: true,    
                  touchRatio: 1,
                  infinite: true,
                   effect: 'slide',
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
			swiper(){
	       		return this.$refs.mySwiper.$swiper
	    	},
	    	...mapGetters({ slider: "slider/getAll"}),
		},
		created() {
      this.$store.dispatch("slider/loadAll");
    }
  }
</script>