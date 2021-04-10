<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <div v-if="networks.length">
              <h2>{{ $t('social.name') }}</h2>

              <div class="row">
                <div class="col-lg-12 text-center" v-if="!hasNetworks">
                  <img src="../../assets/img/icons/nv6.svg" class="spin" alt="">
                </div>


                <div class="col-lg-3 col-sm-4" v-else v-for="network in networks">
                  <div class="document-box text-center">
                    <div class="text-center">
                      <h3>{{ network.network }}</h3>
                      <button class="btn-cont" v-if="network.is_deletable" @click="deleteNetwork(network.id)">
                        {{ $t('social.delete') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <br><br>

            <div class="row" v-if="availableNetworkList()">
              <h2>{{ $t('social.add_social') }}</h2>

              <div class="col-lg-3 col-sm-4" v-for="network in availableNetworkList()">
                <div class="document-box text-center">
                  <div class="text-center">
                    <h3>{{ network }}</h3>
                    <a class="btn-cont" :href="addNetwork(network)">{{ $t('social.add') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>


<script>
import Navbar from '../../components/ui/Navbar.vue'
import AcNav from '../../components/ui/AcNav.vue'
import {mapGetters} from 'vuex'
import {API} from '../../api'

export default {
  components: {Navbar, AcNav},
  data() {
    return {
      availableNetworks: ['google', 'facebook']
    }
  },
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
      networks: 'socialNetworks/getAll'
    }),
  },
  methods: {
    availableNetworkList() {
      return this.availableNetworks
    },
    hasNetworks() {
      return this.networks.length >= 0
    },
    deleteNetwork(networkId) {
      this.$store.dispatch('socialNetworks/deleteById', networkId)
    },
    addNetwork(networkName) {
      let apiUrl = process.env.SOCIAL_APP_URL
      let casinoUrl = process.env.CASINO_APP_URL
      let token = process.env.SOCIAL_APP_PUBLIC_TOKEN

      let backUrl = casinoUrl + '/social/callback';

      return apiUrl + '/social/login/' + networkName + '/' + token + '?back_url=' + backUrl
    }
  },
  created() {
    this.$store.dispatch('socialNetworks/loadAll')
  }
}

</script>

<style scoped>
select {
  width: 100% !important;
}

input#file-upload-button {
  background-color: #fff !important;
  border: none !important;
  text-transform: uppercase !important;
}

.document-box h3 {
  margin: 15px 0;
}
</style>
