<template>

  <div>
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

<style>

.skeleton-box{
  overflow: hidden;
  border-radius: 30px;
  margin-bottom: 25px;
}
.skeleton-img{
  height: 170px;
  position: relative;
}
.skeleton-body{
  padding: 20px 22px;
  background-color: #272459;
}
.skeleton-title{
  border-radius: 5px;
  width: 60%;
  height: 20px;
  background-color: #19173a;
  margin-bottom: 30px;
}
.skeleton-descr{
  border-radius: 5px;
  width: 30%;
  margin-bottom: 7px;
  height: 16px;
  background-color: #19173a;
}
.slider-skeleton{
  height: 450px;
  border-radius: 30px;
}


.skeleton {
  background-color: #19173a;
  background-image:
      linear-gradient(
          90deg,
          rgba(39,36,89, 0),
          rgba(39,36,89, 0.3),
          rgba(39,36,89, 0)
      );
  background-size: 50px 100%;
  background-repeat: no-repeat;
  background-position: left -40px top 0;
  animation: shine 1s ease infinite;
}

@keyframes shine {
  0% {
    background-position: left -40px top 0;
  }
  100% {
    background-position: right -40px top 0;
  }
}
</style>