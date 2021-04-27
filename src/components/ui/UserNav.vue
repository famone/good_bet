<template>
  <div class="user-nav hidden-lg hidden-md" v-if="player">


    <div class="avatar" v-if="player.avatars.length !== 0"
         @click="showChat = !showChat"
         :style="{'background-image': 'url(' + player.avatars.items[0].url + ')'}">
      <div v-if="unreadMessageCount > 0" class="ring"></div>
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
  z-index: 50;
  display: flex;
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
</style>
