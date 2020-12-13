<template>
	<section id="mainSlider">
		<div class="container">
			<div class="row slider-row">
				<img src="../assets/img/blurcoins.svg" class="blur-coins">
				<img src="../assets/img/smallbone.svg" class="small-bone">
				<img src="../assets/img/blur-pastic.svg" class="blur-plastic">

				<swiper ref="mySwiper" :options="swiperOptions">
		    		<swiper-slide v-for="item in slides">
			    		<div class="slider-banner" :style="{'background-image': 'url(' + item.img + ')'}">
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
                  spaceBetween: 0,
                  draggable: true,
                  loop: true,    
                  infinite: true,
                  speed: 1000,
                  centeredSlides: true,
                  effect: 'fade',
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
		}
	}
</script>