<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('pages.account.transactions') }}</h2>

            <button class="switch-btn"
                    :class="{activeSwitch : switchDepo}"
                    @click="changeDepo(true)">{{ $t('pages.account.deposit') }}
            </button>
            <button class="switch-btn"
                    :class="{activeSwitch : !switchDepo}"
                    @click="changeDepo(false)">{{ $t('pages.account.withdrawal') }}
            </button>

            <!-- depo -->

            <div class="row" v-if="switchDepo">
              <div class="col-lg-10">
                <table>
                  <thead>
                  <tr>
                    <td>{{ $t('main.date') }}</td>
                    <td>{{ $t('main.amount') }}</td>
                    <td>{{ $t('main.status') }}</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="dep in depositTrans">
                    <td>
                      {{ new Date(dep.time_create_as_iso8601).toLocaleDateString() }}
                      {{
                        new Date(dep.time_create_as_iso8601).getHours()
                      }}:{{ new Date(dep.time_create_as_iso8601).getMinutes() }}
                    </td>
                    <td>{{ dep.amount_as_currency }}</td>
                    <td>{{ $t('main.' + dep.status) }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- withdrawl -->


            <div class="row" v-else>
              <div class="col-lg-10">
                <table>
                  <thead>
                  <tr>
                    <td>{{ $t('main.date') }}</td>
                    <td>{{ $t('main.amount') }}</td>
                    <td>{{ $t('main.status') }}</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="dep in withdrawalTrans">
                    <td>
                      {{ new Date(dep.time_create_as_iso8601).toLocaleDateString() }}
                      {{
                        new Date(dep.time_create_as_iso8601).getHours()
                      }}:{{ new Date(dep.time_create_as_iso8601).getMinutes() }}
                    </td>
                    <td>{{ dep.amount_as_currency }}</td>
                    <td>{{ $t('main.' + dep.status) }}</td>
                  </tr>
                  </tbody>
                </table>
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
import axios from 'axios'
import {API} from "../../api";

export default {
  components: {Navbar, AcNav},
  data() {
    return {
      depositTrans: null,
      withdrawalTrans: null
    }
  },
  computed: {
    ...mapGetters({player: "auth/getPlayer", switchDepo: "auth/getSwitchDepo"})
  },
  created() {
    API.get('payments', {
      params: {
        direction: 'deposit'
      }
    }).then(res => {
      this.depositTrans = res.data
    })

    API.get('payments', {
      params: {
        direction: 'withdrawal'
      }
    }).then(res => {
      this.withdrawalTrans = res.data
    })
  },
  methods: {
    changeDepo(res) {
      this.$store.dispatch('auth/depoSwitcher', res)
    }
  }
}

</script>