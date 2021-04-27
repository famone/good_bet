<template>
    <div id="app">
      
      <Header/>
      <UserNav v-if="player"/>
      
      
      <router-view></router-view>

      <Footer />
      <Copyright />



    </div>
</template>

<script>
import './assets/css/style.css'
import Header from './components/ui/Header.vue'
import Footer from './components/ui/Footer.vue'
import Copyright from './components/ui/Copyright.vue'
import UserNav from './components/ui/UserNav.vue'
import {mapGetters} from 'vuex'


  export default{
  	components: {Header, Footer, Copyright, UserNav},
    computed:{
      ...mapGetters({
        player: "player/getCurrent",
        messages: "messages/getMessages",
        searchResults: "games/getSearchResult",
        unreadMessageCount: "messages/getUnread",
        isAuth: "auth/getAuthenticated",
        counter: "counter/get",
      }),
    }
  }
</script>






