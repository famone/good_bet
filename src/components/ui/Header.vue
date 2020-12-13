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


				<div class="header-box-col al-center">
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
	export default{
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