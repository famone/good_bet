<template>
  <div class="row">
    <div class="col-lg-10">
      <table>
        <thead>
        <tr>
          <td>{{ $t('bonus.name') }}</td>
          <td>{{ $t('bonus.status') }}</td>
          <td>{{ $t('bonus.transactionData') }}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in bonusTransactions">
          <td>{{ transaction.bonus ? transaction.bonus.title : 'Bonus isn\'t exist already' }}</td>
          <td>{{ $t('bonus.statuses.' + transaction.status) }}</td>
          <td>{{ getFormattedCreatedDateTime(transaction) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>


import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      bonusTransactions: 'bonusTransactions/getAllBonusTransactions',
      player: 'player/getCurrent'
    }),
  },
  watch: {
    player() {
      this.$store.dispatch('bonusTransactions/loadAll').then(() => {
        this.loading = false
      })
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  created() {
    this.$store.dispatch('bonusTransactions/loadAll').then(() => {
      this.loading = false
    })
  },
  methods: {

    //TODO create Dto move this
    getFormattedCreatedDateTime(transaction) {
      let date = new Date(transaction.time_create_as_iso8601).toLocaleDateString()
      let hours = new Date(transaction.time_create_as_iso8601).getHours()
      let minutes = new Date(transaction.time_create_as_iso8601).getMinutes()
      return date + ' ' + hours + ":" + minutes
    }
  }
}

</script>

