<template>
	<header :class="{stickyHeader: stickyHeader}">
		<div class="container">
			<div class="header-box">
				<div class="header-box-col al-center">
					<router-link tag="a" to="/">
					    <img src="../../assets/img/logo.svg" class="logo">
				    </router-link>
				    <ul>
				    	<router-link 
					    	tag="li" 
					    	:to="lnk.link" 
					    	v-for="lnk in menuLinks"
					    	class="link">{{lnk.title}}
					    </router-link>
				    </ul>
				</div>

				<div class="header-box-col al-center" v-if="player">
					<input type="text" class="search-inp" placeholder="Game name">
					<div class="player-row">
						<div class="avatar" v-if="player.avatars.length !== 0" :style="{'background-image': 'url(' + player.avatars[0].url + ')'}"></div>
						<div class="avatar" v-else>
							<span>{{player.nickname.substr(0, 1)}}</span>
						</div>
						<div class="text-center">
							<p class="small-white" style="font-size: 14px;">{{player.nickname}}</p>
							<!-- <p class="small-white" v-if="player.accounts">
								<strong>{{player.accounts[0].amount.toLocaleString()}} {{player.accounts[0].currency_code}}</strong>
							</p> -->

							<select class="acc-select" id="" v-if="player.accounts" :value="getCurrentAccount.currency_id"@change="changeAccount($event)">
								<option :value="account.currency_id" v-for="account in player.accounts">
									{{account.amount.toLocaleString()}} {{account.currency_code}}
								</option>
							</select>
						</div>
						<router-link tag="button" to="/profile" class="settings">
							<img src="../../assets/img/settings.svg">
						</router-link>
						<button class="reg-btn" @click="logOut()">
							<img src="../../assets/img/loguot.svg" style="margin: 0;">
						</button>
					</div>
					
				</div>
				


				<div class="header-box-col al-center" v-else>
					<input type="text" class="search-inp" placeholder="Game name">
					<router-link tag="button" to="/enter" class="login-btn"><img src="../../assets/img/login.svg" alt="">LOGIN</router-link>
					<router-link 
					class="reg-btn" tag="button" to="/signup">
					<img src="../../assets/img/user.svg" alt="">
						REGISTRATION
					</router-link>
				</div>

			</div>
		</div>
	</header>
</template>


<script>
import {mapGetters} from 'vuex'

	export default{
		computed: {
			...mapGetters({ player: "auth/getPlayer"}),
			getCurrentAccount(){
				if(this.player){
					let currentValute = this.player.accounts.find(item => {
						return item.is_current == true
					})
					return currentValute
				}
			}
		},
		methods: {
			logOut(){
				this.$store.dispatch('auth/logOut')
				.then(() => {
	        		this.$router.replace("/enter");
	      		});
			},
			changeAccount(e){
				let valuteCode = e.target.value
				this.$store.dispatch('auth/changeAccount', valuteCode)
			}
		},
		data(){
			return{
				stickyHeader: false,
				menuLinks: [
					{
						link: '/about',
						title: 'ABOUT'
					},
					{
						link: '/faq',
						title: 'FAQ'
					},
					{
						link: '/news',
						title: 'NEWS'
					},
					{
						link: '/policy',
						title: 'RESPONSIBLE GAMING'
					},
					{
						link: '/bonuses',
						title: 'BONUSES'
					}
				]
			}
		},
		mounted(){
			let pageHeight = document.documentElement.scrollHeight;
			// let headerHeight = document.querySelector('.header').clientHeight;

			window.addEventListener('scroll', ()=>{
				let winScroll = document.documentElement.scrollTop;

				if(winScroll > 5){
					this.stickyHeader = true
				}else{
					this.stickyHeader = false
				}
			})
		}
	}
</script>	