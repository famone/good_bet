<template>
	<section class="news-row">
		<div class="row">
				<swiper ref="mySwiper2" :options="swiperOptions">
				    <swiper-slide v-for="item in 6">
				    	<div class="news-card">
				    		<div class="news-img">
				    			<div class="read-news">
				    				<router-link tag="div" to="/news" class="read-btn">
				    					<img src="../assets/img/see.svg" alt="">
				    				</router-link>
				    			</div>
				    		</div>
				    		<div class="news-body">
				    			<div class="date">10.01.2020</div>
				    			<h3>NEWS NAME</h3>
				    			<p class="news-descr">“Come race with Booongo on Rajbet: this time you need to collect multipliers to score points and climb up the leaderboard.”</p>
				    		</div>
				    	</div>
				    </swiper-slide>
				</swiper>
			</div>



	</section>
</template>


<script>
	export default{
		data(){
			return{
				swiperOptions: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  loop: true,    
                  infinite: true,
                  touchRatio: 1,
                  centeredSlides: true,
                  draggable: true
            	}
			}
		},
		computed: {
			swiper(){
	       		return this.$refs.mySwiper2.$swiper
	    	},
		}
	}
</script>
