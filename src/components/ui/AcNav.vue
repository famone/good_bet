<template>
	<div class="col-lg-3">
		<div class="account-navigation">
			<h2>PROFILE</h2>
			<ul>
				<router-link tag="li" :to="item.link" v-for="item in profileNav" v-bind:key="item.id"
				:class="{gold: item.link === '/deposit' }">
					<img :src="item.icon" alt=""> <span>{{$t(item.text)}}</span>
				</router-link>
			</ul>
		</div>
	</div>
</template>


<script>
	export default{
		data(){
			return{
				profileNav: [
						{
							text: 'myProfile.myProfile',
							link: '/profile',
							icon: require('../../assets/img/icons/pr1.svg')
						},
          {
            text: 'myProfile.socials',
            link: '/account/socials',
            icon: require('../../assets/img/icons/pr1.svg')
          },
						{
							text: 'myProfile.deposit',
							link: '/deposit',
							icon: require('../../assets/img/icons/pr2.svg')
						},
						{
							text: 'myProfile.withdrawal',
							link: '/cash-withdrawal',
							icon: require('../../assets/img/icons/pr3.svg')
						},
						{
							text: 'myProfile.accounts',
							link: '/accounts',
							icon: require('../../assets/img/coins.svg')
						},
						{
							text: 'myProfile.transactions',
							link: '/transactions',
							icon: require('../../assets/img/icons/pr4.svg')
						},
						{
							text:  'myProfile.myBonusTransactions',
							link: '/my-bonuses/active',
							icon: require('../../assets/img/icons/pr5.svg')
						},
						{
							text: 'myProfile.documents',
							link: '/documents',
							icon: require('../../assets/img/icons/pr6.svg')
						},
          {
            text: 'myProfile.settings',
            link: '/settings',
            icon: require('../../assets/img/icons/pr1.svg')
          },
				]
			}
		}
	}
</script>	


<style>
	.gold{
		color: #db9e3f!important;
	}
</style>