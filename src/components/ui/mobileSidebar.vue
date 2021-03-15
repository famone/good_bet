<template>
	<div class="mobile-sidebar">

		<router-link tag="a" to="/" >
            <img src="../../assets/img/logo.svg" class="logo" @click="closeMobileSidebar($emit)">
          </router-link>



    <div class="sidebar-box" @click="closeMobileSidebar($emit)" v-if="player">
      
          <div class="account-box">
            <div class="avatar" v-if="player.avatars.length !== 0"
                 @click="showChat = !showChat"
                 :style="{'background-image': 'url(' + player.avatars.items[0].url + ')'}">
              <div v-if="unreadMessageCount > 0" class="ring"></div>
              <!-- <miniChat v-if="showChat"/> -->
            </div>
        
        <div class="avatar" v-else @click="showChat = !showChat">
              <div v-if="unreadMessageCount > 0" class="ring"></div>
              <miniChat v-if="showChat"/>
              <span>{{ player.nickname.substr(0, 1) }}</span>
        </div>
        <p class="small-white" style="font-size: 14px;">{{ player.nickname }}</p>
          </div>


            <router-link tag="a" to="/profile" class="settings">
              <img src="../../assets/img/settings.svg" alt="">
            </router-link>
            <router-link tag="a" to="/deposit" class="coins">
              <img src="../../assets/img/coinsgold.svg" alt="">
            </router-link>
            <router-link tag="a" to="/favorite" class="coins">
              <img src="../../assets/img/like2.svg" alt="">
            </router-link>
            <button class="reg-btn" @click="logOut()">
              <img src="../../assets/img/loguot.svg" style="margin: 0;" alt="">
            </button>
    </div>
     

    <div class="sidebar-box" @click="closeMobileSidebar($emit)" v-else>
      <router-link tag="button" to="/enter" class="login-btn"><img src="../../assets/img/login.svg" alt="">
            {{ $t('main.loginUPPER') }}
          </router-link>
          <router-link
              class="reg-btn" tag="button" to="/signup">
            <img src="../../assets/img/user.svg" alt="">
            {{ $t('main.registerUPPER') }}
          </router-link>
    </div>
          

     	<h5>{{ $t('main.casinoName') }}</h5>
			<ul @click="closeMobileSidebar($emit)">
            	<router-link tag="a" to="/about"><li>{{ $t('main.about') }}</li></router-link>
            	<router-link tag="a" to="/faq"><li>{{ $t('main.faq') }}</li></router-link>
            	<router-link tag="a" to="/news"><li>{{ $t('main.news') }}</li></router-link>
            	<router-link tag="a" to="/policy"><li>{{ $t('main.responsibleGames') }}</li></router-link>
            	<router-link tag="a" to="/bonuses"><li>{{ $t('main.bonuses') }}</li></router-link>
			</ul>
			<br>

		<h5>GAMES</h5>
			<ul @click="closeMobileSidebar($emit)">
            	<router-link tag="a" to="/game-groups/124"><li>{{ $t('main.recommended') }}</li></router-link>
                <router-link tag="a" to="/game-groups/125"><li>{{ $t('main.new') }}</li></router-link>
                <router-link tag="a" to="/game-groups/115"><li>{{ $t('main.popular') }}</li></router-link>
                <router-link tag="a" to="/game-groups/126"><li>{{ $t('main.slots') }}</li></router-link>
                <router-link tag="a" to="/game-groups/127"><li>{{ $t('main.liveGame') }}</li></router-link>
                <router-link tag="a" to="/game-groups/128"><li>{{ $t('main.roulette') }}</li></router-link>
                <router-link tag="a" to="/game-groups/129"><li>{{ $t('main.card') }}</li></router-link>
                <router-link tag="a" to="/game-groups/130"><li>{{ $t('main.virtualSport') }}</li></router-link>
                <router-link tag="a" to="/game-groups/131"><li>{{ $t('main.loto') }}</li></router-link>
                <router-link tag="a" to="/game-groups/132"><li>{{ $t('main.tableGames') }}</li></router-link>
			</ul>
			<br>

		<div class="cont-footer-box">
			<img src="../../assets/img/tel.svg" alt="">
			<a href="tel: +420 605 000 888" class="tel">+420 605 000 888</a>
		</div>
		<div class="cont-footer-box">
			<img src="../../assets/img/teleph.svg" alt="">
			<a href="mailto:guest.relation@mail.com" class="mail">guest.relation@mail.com</a>
		</div>

		<br>

    </div>
</template>


<script>
import {mapGetters} from 'vuex'

  export default{
    methods: {
      closeMobileSidebar(){
        this.$emit('closeMobileSidebar')
      },
      logOut() {
      this.$store.dispatch('auth/logOut')
          .then(() => {
            this.$router.replace("/enter");
          });
      }
    },
    computed: {
       ...mapGetters({
          player: "player/getCurrent",
          messages: "messages/getMessages",
          searchResults: "games/getSearchResult",
          unreadMessageCount: "messages/getUnread",
          isAuth: "auth/getAuthenticated",
          counter: "counter/get"
        }),
    }
  }
</script>