<template>
    <div id="app">
      
      <Header/>
      
      
      <router-view></router-view>

      <Footer />
      <Copyright />



    </div>
</template>

<script>
import './assets/css/style.css'
import Header from './components/ui/Header.vue'
import Footer from './components/ui/Footer.vue'
import Copyright from './components/ui/Copyright.vue'


  export default{
  	components: {Header, Footer, Copyright},
  	
  }
</script>






