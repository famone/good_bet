<template>
	<footer>
		<div class="container">
			<div class="col-lg-2">
				<img alt="$t('main.casinoName')" src="../../assets/img/logo.svg" class="logo">
				<p class="slogan" v-html="$t('footer.slogan')"></p>
			</div>
			<div class="col-lg-2 col-lg-offset-1 hidden-xs">
			 		<h5>{{ $t('main.casinoName') }}</h5>
			 		<ul>
            <router-link tag="a" to="/about"><li>{{ $t('main.about') }}</li></router-link>
            <router-link tag="a" to="/faq"><li>{{ $t('main.faq') }}</li></router-link>
            <router-link tag="a" to="/news"><li>{{ $t('main.news') }}</li></router-link>
            <router-link tag="a" to="/policy"><li>{{ $t('main.responsibleGames') }}</li></router-link>
            <router-link tag="a" to="/bonuses"><li>{{ $t('main.bonuses') }}</li></router-link>
			 		</ul>
			 </div>
			 <div class="col-lg-4 hidden-xs">
			 	<h5>GAMES</h5>
			 	<div class="row">
			 			<div class="col-lg-6">
			 				<ul class="flex-footer">
                <router-link tag="a" to="/game-groups/124"><li>{{ $t('main.recommended') }}</li></router-link>
                <router-link tag="a" to="/game-groups/125"><li>{{ $t('main.new') }}</li></router-link>
                <router-link tag="a" to="/game-groups/115"><li>{{ $t('main.popular') }}</li></router-link>
                <router-link tag="a" to="/game-groups/126"><li>{{ $t('main.slots') }}</li></router-link>
                <router-link tag="a" to="/game-groups/127"><li>{{ $t('main.liveGame') }}</li></router-link>
			 				</ul>
			 		</div>
					<div class="col-lg-6">
			 				<ul class="flex-footer">
                <router-link tag="a" to="/game-groups/128"><li>{{ $t('main.roulette') }}</li></router-link>
                <router-link tag="a" to="/game-groups/129"><li>{{ $t('main.card') }}</li></router-link>
                <router-link tag="a" to="/game-groups/130"><li>{{ $t('main.virtualSport') }}</li></router-link>
                <router-link tag="a" to="/game-groups/131"><li>{{ $t('main.loto') }}</li></router-link>
                <router-link tag="a" to="/game-groups/132"><li>{{ $t('main.tableGames') }}</li></router-link>
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


