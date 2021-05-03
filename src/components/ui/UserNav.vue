<template>
  <div class="user-nav hidden-lg hidden-md" v-if="player">


    <div class="avatar" v-if="player.avatars.length !== 0"
         @click="userBottomNav = !userBottomNav"
         :style="{'background-image': 'url(' + player.avatars.items[0].url + ')'}">
    </div>


    <router-link tag="button" to="/deposit" class="user-nav-link">
      <img src="../../assets/img/coinsgold.svg" alt="">
    </router-link>
    <router-link tag="button" to="/profile" class="user-nav-link" style="margin-right:25px;">
      <img src="../../assets/img/userlinks/user2.svg" alt="">
    </router-link>
    <router-link tag="button" to="/favorite" class="user-nav-link" style="margin-left:25px;">
      <img src="../../assets/img/userlinks/user3.svg" alt="">
    </router-link>
    <button class="user-nav-link" @click="logOut()">
      <img src="../../assets/img/userlinks/user4.svg" alt="">
    </button>

    <div class="user-bottom-nav" v-if="userBottomNav" @click="userBottomNav = false">
        <router-link tag="a" :to="item.link" v-for="item in profileNav">
            <p>{{$t(item.text)}}</p>
        </router-link>
    </div>


  </div>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      messages: "messages/getMessages",
      searchResults: "games/getSearchResult",
      unreadMessageCount: "messages/getUnread",
      isAuth: "auth/getAuthenticated",
      counter: "counter/get",
    }),
  },
  data(){
      return{
          userBottomNav: false,
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
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logOut').then(() => {
        this.$router.replace("/enter");
      });
    },
  }
}
</script>


<style scoped>
.user-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #111029;
  width: 100%;
  z-index: 49;
  display: flex;
  flex-wrap: wrap ;
  justify-content: space-around;
  padding: 18px 0;
  align-items: center;
  border-radius: 30px 30px 0 0;
}

.user-nav-link {
  background-color: transparent;
  border: none;
}

.user-nav .avatar {
  position: absolute;
  left: calc(50% - 35px);
  top: -35px;
  margin-right: 0;
  width: 70px;
  height: 70px;
  border: 2px #fff solid;
}
.user-nav .avatar:before{
    content: '';
    position: absolute;
    width: 24px;
    height: 10px;
    background-image: url('../../assets/img/navarr.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    bottom: -20px;
    left: calc(50% - 12px);
}
.user-bottom-nav{
    width: 100% ;
    text-align: center;
    padding: 45px 0 25px 0;
    display: block;
}
.user-bottom-nav a{
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.17em;
}
.user-bottom-nav a p{
    margin-bottom: 15px;
}
.user-bottom-nav .router-link-exact-active{
    color: #4D2ADC;
}
</style>
