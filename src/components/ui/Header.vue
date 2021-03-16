<template>
  <header :class="{stickyHeader: stickyHeader}">
    <div class="container">
      <div class="header-box">
        <span class="hidden"> {{ closeOnEmpty }}</span>
        <div class="header-box-col al-center">
          <router-link tag="a" to="/">
            <img src="../../assets/img/logo.svg" class="logo" alt="">
          </router-link>
          <ul class="hidden-xs hidden-md hidden-sm">
            <router-link
                tag="a"
                :to="lnk.link"
                v-for="lnk in menuLinks"
                v-bind:key="lnk.id"
                class="link"><li>{{ $t(lnk.title) }}</li>
            </router-link>
          </ul>
        </div>

        <div class="header-box-col al-center hidden-xs hidden-sm" v-if="player">
          <input type="text" class="search-inp" placeholder="Game name" @input="searchMethod" v-model="search">
          <div class="player-row">
            <div class="avatar" v-if="player.avatars.length !== 0"
                 @click="showChat = !showChat"
                 :style="{'background-image': 'url(' + player.avatars.items[0].url + ')'}">
              <div v-if="unreadMessageCount > 0" class="ring"></div>
              <miniChat v-if="showChat"/>
            </div>
            <div class="avatar" v-else @click="showChat = !showChat">
              <div v-if="unreadMessageCount > 0" class="ring"></div>
              <miniChat v-if="showChat"/>
              <span>{{ player.nickname.substr(0, 1) }}</span>
            </div>
            <div class="text-center">
              <p class="small-white" style="font-size: 14px;">{{ player.nickname }}</p>
              <!-- <p class="small-white" v-if="player.accounts">
                <strong>{{player.accounts[0].amount.toLocaleString()}} {{player.accounts[0].currency_code}}</strong>
              </p> -->

              <select class="acc-select" v-if="player.accounts.length" :value="currentAccount.id"
                      @change="changeAccount($event)">
                <option :value="account.id" v-for="account in player.accounts.items">
                  {{ account.getFormattedAmount() }} {{ account.currency_code }}
                </option>
              </select>
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

        </div>


        <div class="header-box-col al-center hidden-xs hidden-sm" v-else>
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


        



        <div class="header-box-col al-center">
           <select class="acc-select hidden-lg" v-if="player && player.accounts.length" :value="currentAccount.id"
                      @change="changeAccount($event)" style="margin-right: 5px;">
                <option :value="account.id" v-for="account in player.accounts.items">
                  {{ account.getFormattedAmount() }} {{ account.currency_code }}
                </option>
              </select>

          <lang-switcher/>

          <div class="mobile-menu hidden-lg " 
          :class="{menuBtnAc: mobileMenuOpened}" @click="mobileMenuOpened = !mobileMenuOpened">
             <span></span>
             <span></span>
              <span></span>
          </div>
        </div>


      </div>
    </div>

    <messagePop v-if="activeMessage !== '' "
                :activeMessage="activeMessage"
                @closeMessage="closeMessage"/>


    <mobileSidebar :class="{mobSideAc : mobileMenuOpened}" @closeMobileSidebar="closeMobileSidebar" />


  </header>
</template>


<script>
import {mapGetters} from 'vuex'
import LangSwitcher from "./LangSwitcher";
import miniChat from '../ui/miniChat.vue'
import messagePop from '../ui/messagePop.vue'
import mobileSidebar from '../ui/mobileSidebar.vue'

export default {
  components: {LangSwitcher, miniChat, messagePop, mobileSidebar},
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      messages: "messages/getMessages",
      searchResults: "games/getSearchResult",
      unreadMessageCount: "messages/getUnread",
      isAuth: "auth/getAuthenticated",
      counter: "counter/get"
    }),
    currentAccount() {
      if (this.player) {
        return this.player.accounts.find(item => {
          return item.is_current === true
        })
      }
    },
    showSearchPanel() {
      return this.search !== '';
    },
    haveSearchResult() {
      return this.searchResults.length > 0;
    },
    closeOnEmpty() {
      let allApp = document.querySelector('#app');

      allApp.addEventListener('click', () => {
        this.search = ''
        this.$store.dispatch('games/emptySearch')
      })
      return this.search
    },
  },
  methods: {
    closeMobileSidebar(){
      this.mobileMenuOpened = false
    },
    closeMessage() {
      this.activeMessage = ''
    },
    lookMes(mes) {
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
      this.$store.dispatch('account/changeAccount', valuteCode)
    },
    searchMethod() {
      this.$store.dispatch('games/searchGame', this.search)
    },
    gameSearchRoute() {
      if (this.player) {
        return '/real-game/'
      }
      return '/demo-game/'
    },
    clearSearch() {
      this.search = ''
      this.$store.dispatch('games/emptySearch')
    },
    updateMessageCount() {
      this.updateMessageCountInterval = setInterval(() => {
        this.$store.dispatch('messages/getUnreadCount').catch(error => {
          if (error.response.status === 403) {
            this.$store.dispatch('auth/logOut').then(() => {
              this.$router.push('/enter')
              clearInterval(this.updateMessageCountInterval)
            })
          }
        })
      }, 3000);
    },
  },
  watch: {
    counter(newVersion, oldVersion) {
      if (oldVersion) {
        if (newVersion.balance.current === oldVersion.balance.current) {
          return;
        }
      }

      this.$store.dispatch('player/loadCurrent')
    },
    isAuth() {
      if (this.isAuth) {
        this.updateMessageCount()
      } else {
        clearInterval(this.updateMessageCountInterval)
      }
    },
  },
  data() {
    return {
      mobileMenuOpened: false,
      updateMessageCountInterval: null,
      activeMessage: '',
      showChat: false,
      search: '',
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
    window.addEventListener('scroll', () => {
      let winScroll = document.documentElement.scrollTop;


        this.stickyHeader = (winScroll > 5);

      
    })
  },
  created() {
    if (this.isAuth) {
      this.updateMessageCount()
    }
  }
}
</script>	