<template>

  <div class="games-row-box">
    <div class="row" v-for="row in rowCount">
      <div :class="elementWrapperClass" v-for="item in elementPerCount">
        <div class="skeleton-box">
          <div class="skeleton-img skeleton"></div>
          <div class="skeleton-body">
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-descr skeleton"></div>
          </div>
        </div>
      </div>
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
    },
    elementWrapperClass: {
      type: String,
      default: 'col-lg-3'
    }
  },
  methods: {
    getElementColClassName() {
      return 'col-lg-3';
    },
    closeMessage() {
      this.$emit('closeMessage')
    }
  }
}
</script>