<template>
  <div class="accordions">
    <div v-for="(item, index) in data" :class="{accActive: item.active}">
      <div class="acc-btn" @click="toggle(index)">
        <span>{{ item.name }}</span>
        <img src="../../assets/img/downarr.svg" alt="">
      </div>
      <div class="acc-item">
        <div class="white-txt" v-html="item.desc"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  methods: {
    toggle(index) {
      this.data.forEach((item, indexInArray) =>{
        if (indexInArray === index) {
          this.data[index].active = !this.data[index].active
        }
        else {
          this.data[indexInArray].active = false
        }
      })

    }
  }
}
</script>

<style>
/*accordeons*/
.accordions {
  height: 100%;
}

.acc-btn{
  border-radius: 15px;
  background-color: #272459;
  padding:20px;
  color: #fff;
  font-size: 16px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.acc-btn img{
  height: 10px;
  transition: all .3s ease;
  cursor: pointer;
}
.acc-item{
  transition: all .3s ease;
  margin-bottom: 20px;
  overflow: hidden;
  max-height: 0;
  padding:0px 10px;
}

.accActive {
  height: 100%;
}

.accActive .acc-item {
  height: calc(100% - 70px);
  max-height: 800px;
  overflow-y: auto;
}
.accActive .acc-btn img{
  transform: rotate(180deg);
}


/*account nav*/

</style>