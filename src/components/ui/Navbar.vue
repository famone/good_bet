<template>
	<div class="navbar" :class="{ma140 : this.$route.path !== '/'}">
		<div class="container">
			<div class="navbar-box" @click="chDynamicly($emit)">
				<router-link tag="div" :to=" '/game-groups/' + item.id" class="navbar-btn text-center" v-for="(item, index) in categories">
					<img :src="item.icon" alt="">
					<p class="small-white">{{ $t(item.name) }}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>



<script>
import {mapGetters} from 'vuex'

	export default{
		computed: {
			...mapGetters({ groups: "auth/getGroups"}),
		},
		methods: {
			chDynamicly(){
				this.$emit('chDynPage')
			}
		},
		data(){
			return{
				categories: [
						{
							name: 'navbar.recommended',
							id: 124,
							icon: require('../../assets/img/icons/nv1.svg')
						},
						{
							name: 'navbar.new',
							id: 125,
							icon: require('../../assets/img/icons/nv2.svg')
						},
						{
							name: 'navbar.popular',
							id: 115,
							icon: require('../../assets/img/icons/nv3.svg')
						},
						{
							name: 'navbar.slots',
							id: 126,
							icon: require('../../assets/img/icons/nv4.svg')
						},
						{
							name: 'navbar.live game',
							id: 127,
							icon: require('../../assets/img/icons/nv5.svg')
						},
						{
							name: 'navbar.roulette',
							id: 128,
							icon: require('../../assets/img/icons/nv6.svg')
						},
						{
							name: 'navbar.card',
							id: 129,
							icon: require('../../assets/img/icons/nv7.svg')
						},
						{
							name: 'navbar.virtualSport',
							id: 130,
							icon: require('../../assets/img/icons/nv8.svg')
						},
						{
							name: 'navbar.loto',
							id: 131,
							icon: require('../../assets/img/icons/nv9.svg')
						},
						{
							name: 'navbar.tabletGames',
							id: 132,
							icon: require('../../assets/img/icons/nv10.svg')
						},
				]
			}
		}
	}
</script>	