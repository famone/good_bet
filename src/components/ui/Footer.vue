<template>
	<footer>
		<div class="container">
			<div class="col-lg-2">
				<img alt="$t('main.casinoName')" src="../../assets/img/logo.svg" class="logo">
				<p class="slogan" v-html="$t('footer.slogan')"></p>
			</div>
			<div class="col-lg-2 col-lg-offset-1">
			 		<h5>{{ $t('main.casinoName') }}</h5>
			 		<ul>
			 			<router-link tag="li" to="/about">{{ $t('main.about') }}</router-link>
			 			<router-link tag="li" to="/faq">{{ $t('main.faq') }}</router-link>
			 			<router-link tag="li" to="/news">{{ $t('main.news') }}</router-link>
			 			<router-link tag="li" to="/policy">{{ $t('main.responsibleGames') }}</router-link>
			 			<router-link tag="li" to="/bonuses">{{ $t('main.bonuses') }}</router-link>
			 		</ul>
			 </div>
			 <div class="col-lg-4">
			 	<h5>GAMES</h5>
			 	<div class="row">
			 			<div class="col-lg-6">
			 				<ul class="flex-footer">
                <router-link tag="li" to="/game-groups/124">{{ $t('main.recommended') }}</router-link>
                <router-link tag="li" to="/game-groups/125">{{ $t('main.new') }}</router-link>
                <router-link tag="li" to="/game-groups/115">{{ $t('main.popular') }}</router-link>
                <router-link tag="li" to="/game-groups/126">{{ $t('main.slots') }}</router-link>
                <router-link tag="li" to="/game-groups/127">{{ $t('main.liveGame') }}</router-link>
			 				</ul>
			 		</div>
					<div class="col-lg-6">
			 				<ul class="flex-footer">
			 					<router-link tag="li" to="/game-groups/128">{{ $t('main.roulette') }}</router-link>
			 					<router-link tag="li" to="/game-groups/129">{{ $t('main.card') }}</router-link>
			 					<router-link tag="li" to="/game-groups/130">{{ $t('main.virtualSport') }}</router-link>
			 					<router-link tag="li" to="/game-groups/131">{{ $t('main.loto') }}</router-link>
			 					<router-link tag="li" to="/game-groups/132">{{ $t('main.tableGames') }}</router-link>
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


