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
                class="link">
              <li>{{ $t(lnk.title) }}</li>
            </router-link>
          </ul>
        </div>

        <div class="header-box-col al-center hidden-xs hidden-sm" v-if="player">
          <input type="text" class="search-inp" placeholder="Game name" @input="searchMethod" v-model="search">
          <div class="player-row">
            <div class="avatar-wrapper">
              <div class="avatar" v-if="player.avatars.length !== 0"
                   ref="miniChatOpenButton"
                   @click="showChat = !showChat"
                   :style="{'background-image': 'url(' + player.avatars.items[0].url + ')'}">
                <div v-if="unreadMessageCount > 0" class="ring"></div>
              </div>
              <div class="avatar" v-else @click="showChat = !showChat" ref="miniChatOpenButton">
                <div v-if="unreadMessageCount > 0" class="ring"></div>
                <span>{{ player.nickname.substr(0, 1) }}</span>
              </div>
              <messages-small-popup
                  v-if="showChat"
                  :openButton="miniChatOpenButton"
                  @closeMiniChat="showChat = false"
                  @openMessage="openCertainMessage"
              />
            </div>

            <div class="text-center">
              <p class="small-white" style="font-size: 14px;">{{ player.nickname }}</p>

              <account-select
                  v-if="player.accounts.length"
                  :accounts="player.accounts.items"
                  @onAccountSelect="changeAccount"
              />

            </div>

            <router-link tag="a" to="/deposit" class="coins">
              <img src="../../assets/img/coinsgold.svg" alt="">
            </router-link>

            <router-link tag="a" to="/profile" class="settings">
              <img src="../../assets/img/settings.svg" alt="">
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

    <message-popup v-if="activeMessage !== '' "
                   :activeMessage="activeMessage"
                   @closeMessage="closeMessage"/>


    <mobileSidebar :class="{mobSideAc : mobileMenuOpened}" @closeMobileSidebar="closeMobileSidebar"/>


    <socket v-if="player"/>

    <restore-password-popup v-if="openPasswordChangePopup" :player-id="player.id" :closable="false"/>

    <profile-verify-popup v-if="openProfileVerifyPopup" :player-id="player.id" :closable="false"/>
  </header>
</template>


<script>
import {mapGetters} from 'vuex'
import LangSwitcher from "./LangSwitcher";
import mobileSidebar from '../ui/mobileSidebar.vue'
import accountSelect from '../ui/AccountSelect.vue'
import Socket from "./Socket";
import MessagesSmallPopup from "./MessagesSmallPopup";
import MessagePopup from "./MessagePopup";
import RestorePasswordPopup from "../../components/accounts/RestorePasswordPopup";
import ProfileVerifyPopup from "../accounts/ProfileVerifyPopup";

export default {
  components: {
    MessagePopup,
    MessagesSmallPopup,
    Socket,
    LangSwitcher,
    mobileSidebar,
    accountSelect,
    RestorePasswordPopup,
    ProfileVerifyPopup
  },
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      messages: "messages/getMessages",
      searchResults: "games/getSearchResult",
      unreadMessageCount: "messages/getUnread",
      isAuth: "auth/getAuthenticated",
      counter: "counter/get",
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
    closeMobileSidebar() {
      this.mobileMenuOpened = false
    },
    closeMessage() {
      this.activeMessage = ''
    },
    openCertainMessage(message) {
      this.activeMessage = message
    },
    logOut() {
      this.$store.dispatch('auth/logOut').then(() => {
        this.$router.replace("/enter");
      });
    },
    changeAccount(accountId) {
      this.$store.dispatch('account/changeAccount', accountId)
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
      if (newVersion.player.is_need_change_password === true) {
        if (this.$router.currentRoute.path !== '/new-password') {
          this.openPasswordChangePopup = true
        }
      } else {
        this.openPasswordChangePopup = false
      }

      this.openProfileVerifyPopup = newVersion.player.is_verified === false;

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
      miniChatOpenButton: null,
      activeMessage: '',
      showChat: false,
      search: '',
      stickyHeader: false,
      openPasswordChangePopup: false,
      openProfileVerifyPopup: false,
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
      ],
      opened: false
    }
  },
  mounted() {
    this.miniChatOpenButton = this.$refs.miniChatOpenButton;

    window.addEventListener('scroll', () => {
      let winScroll = document.documentElement.scrollTop
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