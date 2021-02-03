<template>
  <div>
    <Navbar/>
    <section id="faq">
      <div class="container">
        <div class="col-lg-12">
          <div class="about-box">
            <div class="faq" v-for="item in faq">
              <h2 v-html="item.question"></h2>
              <p class="white-txt" v-html="item.answer"></p>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>


<script>
import Navbar from '../components/ui/Navbar.vue'
import {mapGetters} from 'vuex'

export default {
  components: {Navbar},
  computed: {
    ...mapGetters({faq: "auth/getFaq"}),
  }
}
</script>
