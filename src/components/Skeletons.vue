<template>

  <div class="games-row-box">
    <div class="row" v-for="row in rowCount">

      <!-- копировать это -->


      <div class="col-lg-3" v-for="item in elementPerCount">
        <div class="skeleton-box">
          <div class="skeleton-img skeleton"></div>
          <div class="skeleton-body">
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-descr skeleton"></div>
          </div>
        </div>
      </div>

      <!-- копировать это -->

    </div>
  </div>
</template>

<script>

export default {
  props: {
    rowCount: {
      type: Number,
      default: 1
    },
    elementPerCount: {
      type: Number,
      default: 4
    }
  },
  methods: {
    closeMessage() {
      this.$emit('closeMessage')
    }
  }
}
</script>