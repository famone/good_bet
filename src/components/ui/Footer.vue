<template>
	<footer>
		<div class="container">
			<div class="col-lg-2">
				<img src="../../assets/img/logo.svg" class="logo">
				<p class="slogan">it’s always a good <span>bet</span><br> with GoodBet</p>
			</div>
			<div class="col-lg-2 col-lg-offset-1">
			 		<h5>KING’S CASINO</h5>
			 		<ul>
			 			<router-link tag="li" to="/">ABOUT</router-link>
			 			<router-link tag="li" to="/">FAQ</router-link>
			 			<router-link tag="li" to="/">NEWS</router-link>
			 			<router-link tag="li" to="/">RESPONSIBLE GAMING</router-link>
			 			<router-link tag="li" to="/">BONUSES</router-link>
			 		</ul>
			 </div>
			 <div class="col-lg-4">
			 	<h5>GAMES</h5>
			 	<div class="row">
			 			<div class="col-lg-6">
			 				<ul class="flex-footer">
			 					<router-link tag="li" to="/">Recommended</router-link>
			 					<router-link tag="li" to="/">New</router-link>
			 					<router-link tag="li" to="/">Popular</router-link>
			 					<router-link tag="li" to="/">Slots</router-link>
			 					<router-link tag="li" to="/">Live Casino</router-link>
			 				</ul>
			 		</div>
					<div class="col-lg-6">
			 				<ul class="flex-footer">
			 					<router-link tag="li" to="/">Roulette</router-link>
			 					<router-link tag="li" to="/">Card</router-link>
			 					<router-link tag="li" to="/">Virtual sport</router-link>
			 					<router-link tag="li" to="/">Loto</router-link>
			 					<router-link tag="li" to="/">Tablet Games</router-link>
			 				</ul>
			 			</div>
			 		</div>
			 	</div>
			 	<div class="col-lg-3">
			 		<betCard />
			 	</div>
		</div>
	</footer>
</template>

<script>
import betCard from '../ui/betCard.vue'

	export default{
		components: { betCard }
	}
</script>


