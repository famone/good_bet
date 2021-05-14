<template>
  <div class="mobile-sidebar">

    <router-link tag="a" to="/">
      <img src="../../assets/img/logo.svg" class="logo" @click="closeMobileSidebar($emit)"><br><br>
    </router-link>

    <div class="sidebar-box" @click="closeMobileSidebar($emit)" v-if="!player">
      <router-link tag="button" to="/enter" class="login-btn"><img src="../../assets/img/login.svg" alt="">
        {{ $t('main.loginUPPER') }}
      </router-link>
      <router-link
          class="reg-btn" tag="button" to="/signup">
        <img src="../../assets/img/user.svg" alt="">
        {{ $t('main.registerUPPER') }}
      </router-link>
    </div>

    <h5>GAMES</h5>
    <ul @click="closeMobileSidebar($emit)" class="mobile-games-btns">
      <router-link v-if="groups.length" tag="a"
          :to="'/game-groups/' + item.id"
          v-for="item in groups"
          v-bind:key="item.id">
        <li><img  v-if="item.images.length" :src="item.images[0].url" alt=""><br>{{ item.name }}</li>
      </router-link>
    </ul>
    <br>

    <h5>{{ $t('main.casinoName') }}</h5>
    <ul @click="closeMobileSidebar($emit)">
      <router-link tag="a" to="/about">
        <li>{{ $t('main.about') }}</li>
      </router-link>
      <router-link tag="a" to="/faq">
        <li>{{ $t('main.faq') }}</li>
      </router-link>
      <router-link tag="a" to="/news">
        <li>{{ $t('main.news') }}</li>
      </router-link>
      <router-link tag="a" to="/policy">
        <li>{{ $t('main.responsibleGames') }}</li>
      </router-link>
      <router-link tag="a" to="/bonuses">
        <li>{{ $t('main.bonuses') }}</li>
      </router-link>
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

export default {
  computed: {
    ...mapGetters({
      player: "player/getCurrent",
      groups: "gameGroups/getMain",
      currentLang: "lang/getCurrent"
    }),
  },
  data() {
    return {
      showChat: false
    }
  },
  methods: {
    closeMobileSidebar() {
      this.$emit('closeMobileSidebar')
    },
    logOut() {
      this.$store.dispatch('auth/logOut')
          .then(() => {
            this.$router.replace("/enter");
          });
    }
  },
  created() {
    this.$store.dispatch('gameGroups/loadMain')
  },
  watch: {
    currentLang() {
      this.$store.dispatch('gameGroups/loadMain')
    },
  }
}
</script>