<template>
	<div class="navbar" :class="{ma140 : this.$route.path !== '/'}">
		<div class="container">
			<div class="navbar-box">
				<router-link tag="div" :to="item.link" class="navbar-btn text-center" v-for="(item, index) in categories">
					<img :src="item.icon" alt="">
					<p class="small-white">{{item.name}}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>



<script>
	export default{
		data(){
			return{
				categories: [
						{
							name: 'Recommended',
							link: '/recommended',
							icon: require('../../assets/img/icons/nv1.svg')
						},
						{
							name: 'New',
							link: '/new',
							icon: require('../../assets/img/icons/nv2.svg')
						},
						{
							name: 'Popular',
							link: '/popular',
							icon: require('../../assets/img/icons/nv3.svg')
						},
						{
							name: 'Slots',
							link: '/slots',
							icon: require('../../assets/img/icons/nv4.svg')
						},
						{
							name: 'Live game',
							link: '/live-game',
							icon: require('../../assets/img/icons/nv5.svg')
						},
						{
							name: 'Roulette',
							link: '/roulette',
							icon: require('../../assets/img/icons/nv6.svg')
						},
						{
							name: 'Card',
							link: '/card',
							icon: require('../../assets/img/icons/nv7.svg')
						},
						{
							name: 'Virtual sport',
							link: '/virtual-sport',
							icon: require('../../assets/img/icons/nv8.svg')
						},
						{
							name: 'Loto',
							link: '/loto',
							icon: require('../../assets/img/icons/nv9.svg')
						},
						{
							name: 'Tablet Games',
							link: '/tablet-ames',
							icon: require('../../assets/img/icons/nv10.svg')
						},
				]
			}
		}
	}
</script>	