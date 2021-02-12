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
                v-bind:key="lnk.id"
                class="link">{{ $t(lnk.title) }}
            </router-link>
          </ul>
        </div>

        <div class="header-box-col al-center" v-if="player">
          <input type="text" class="search-inp" placeholder="Game name" @input="searchMethod" v-model="search">
          <div class="player-row">
            <div class="avatar" v-if="player.avatars.length !== 0"
            @click="showChat = !showChat"
                 :style="{'background-image': 'url(' + player.avatars[0].url + ')'}">
                   <div class="ring"></div>
                   <miniChat v-if="showChat && messages" :messages="messages" @lookMes="lookMes($event)"/>
                 </div>
            <div class="avatar" v-else @click="showChat = !showChat">
              <div class="ring"></div>
              <miniChat v-if="showChat && messages" :messages="messages" @lookMes="lookMes($event)"/>
              <span>{{ player.nickname.substr(0, 1) }}</span>
            </div>
            <div class="text-center">
              <p class="small-white" style="font-size: 14px;">{{ player.nickname }}</p>
              <!-- <p class="small-white" v-if="player.accounts">
                <strong>{{player.accounts[0].amount.toLocaleString()}} {{player.accounts[0].currency_code}}</strong>
              </p> -->

              <select class="acc-select" id="" v-if="player.accounts" :value="getCurrentAccount.id"
                      @change="changeAccount($event)">
                <option :value="account.id" v-for="account in player.accounts">
                  {{ account.amount.toLocaleString() }} {{ account.currency_code }}
                </option>
              </select>
            </div>
            <router-link tag="button" to="/profile" class="settings">
              <img src="../../assets/img/settings.svg">
            </router-link>
            <router-link tag="button" to="/deposit" class="coins">
              <img src="../../assets/img/coinsgold.svg">
            </router-link>
            <router-link tag="button" to="/favorite" class="coins">
              <img src="../../assets/img/like2.svg">
            </router-link>
            <button class="reg-btn" @click="logOut()">
              <img src="../../assets/img/loguot.svg" style="margin: 0;">
            </button>
          </div>

        </div>


        <div class="header-box-col al-center" v-else>
          <input type="text" class="search-inp" :placeholder="$t('games.gamesSearchFieldTitle')" @input="searchMethod"
                 v-model="search">
          <router-link tag="button" to="/enter" class="login-btn"><img src="../../assets/img/login.svg" alt="">
            {{ $t('main.loginUPPER') }}
          </router-link>
          <router-link
              class="reg-btn" tag="button" to="/signup">
            <img src="../../assets/img/user.svg" alt="">
            {{ $t('main.registerUPPER') }}
          </router-link>
        </div>


        <div class="searchPanel" v-if="showSearchPanel">
          <div v-if="haveSearchResult">
            <router-link tag="div" :to=" gameSearchRoute() + res.id.toString() " class="game-result"
                         v-for="res in searchResults" v-bind:key="res.id" @click="clearSearch()">
              <img :src="res.images[0].url" @click="clearSearch()">
              <p class="small-white" @click="clearSearch()">{{ res.name }}</p>
            </router-link>
          </div>
          <div v-if="!haveSearchResult">
            <p class="small-white" @click="clearSearch()">Not found</p>
          </div>
        </div>

        <lang-switcher />


      </div>
    </div>

        <messagePop v-if="activeMessage !== '' " 
        :activeMessage="activeMessage" 
        @closeMessage="closeMessage"/>


  </header>
</template>


<script>
import {mapGetters} from 'vuex'
import LangSwitcher from "./LangSwitcher";
import {API} from "../../api";
import miniChat from '../ui/miniChat.vue'
import messagePop from '../ui/messagePop.vue'

export default {
  components: {LangSwitcher, miniChat, messagePop},
  computed: {
    ...mapGetters({player: "auth/getPlayer", messages: "auth/getMessages"}),
    getCurrentAccount() {
      if (this.player) {
        return this.player.accounts.find(item => {
          return item.is_current == true
        })
      }
    },
    showSearchPanel() {
      return this.search !== '';
    },
    haveSearchResult() {
      return this.searchResults.length > 0;
    }
  },
  methods: {
    closeMessage(){
      this.activeMessage = ''
    },
    lookMes(mes){
      this.activeMessage = mes
    },
    logOut() {
      this.$store.dispatch('auth/logOut')
          .then(() => {
            this.$router.replace("/enter");
          });
    },
    changeAccount(e) {
      let valuteCode = e.target.value
      this.$store.dispatch('auth/changeAccount', valuteCode)
    },
    searchMethod() {

      API.get('games', {
        params: {
          expand: 'images',
          q: this.search
        }
      }).then(res => {
        this.searchResults = res.data
      })
    },
    gameSearchRoute() {
      if (this.player) {
        return '/real-game/'
      }
      return '/demo-game/'
    },
    clearSearch() {
      this.search = ''
      this.searchResults = []
    }
  },
  data() {
    return {
      activeMessage: '' ,
      showChat: false,
      search: '',
      searchResults: [],
      stickyHeader: false,
      menuLinks: [
        {
          link: '/about',
          title: 'main.about'
        },
        {
          link: '/faq',
          title: 'main.faq'
        },
        {
          link: '/news',
          title: 'main.news'
        },
        {
          link: '/policy',
          title: 'main.responsibleGames'
        },
        {
          link: '/bonuses',
          title: 'main.bonuses'
        }
      ]
    }
  },
  mounted() {
    let pageHeight = document.documentElement.scrollHeight;
    // let headerHeight = document.querySelector('.header').clientHeight;

    window.addEventListener('scroll', () => {
      let winScroll = document.documentElement.scrollTop;

      this.stickyHeader = (winScroll > 5);
    })
  }
}
</script>	