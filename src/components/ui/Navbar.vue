<template>
  <div class="navbar hidden-xs" :class="{ma140 : this.$route.path !== '/'}">
    <div class="container">
      <div class="navbar-box" @click="chDynamicly($emit)">
        <router-link
            v-if="groups.length"
            tag="a"
            class="navbar-btn"
            :to=" '/game-groups/' + item.id"
            v-for="item in groups"
            v-bind:key="item.id">
          <div class="text-center">
            <img v-if="item.images.length" :src="item.images[0].url" alt="">
            <p class="small-white">{{ item.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      groups: "gameGroups/getMain",
      currentLang: "lang/getCurrent"
    }),
  },
  methods: {
    chDynamicly() {
      this.$emit('chDynPage')
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