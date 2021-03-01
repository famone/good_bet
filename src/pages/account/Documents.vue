<template>
  <div>
    <Navbar/>


    <section id="account" v-if="player">
      <div class="container">
        <div class="row">
          <AcNav/>
          <div class="col-lg-9">
            <h2>{{ $t('pages.account.documents') }}</h2>

            <div class="row">
              <div class="col-lg-12 text-center" v-if="!documents">
                <img src="../../assets/img/icons/nv6.svg" class="spin">
              </div>
              <div class="col-lg-3" v-else v-for="doc in documents">
                <div class="document-box text-center">
                  <div class="text-center">


                    <a class="download-link" target="_blank" :href="doc.file_preview">Download document</a>
                    <p class="white-txt">{{ doc.type.value }}</p>
                    <img src="../../assets/img/success.svg" class="status-icon"
                         v-if="doc.status === 'verified' ">
                    <img src="../../assets/img/new.svg" class="status-icon"
                         v-if="doc.status === 'new' ">
                    <img src="../../assets/img/progress.svg" class="status-icon"
                         v-if="doc.status === 'in_progress' ">
                    <img src="../../assets/img/declined.svg" class="status-icon"
                         v-if="doc.status === 'declined' ">
                  </div>
                </div>
              </div>
            </div>

            <br><br>

            <h2>{{ $t('pages.account.addDocuments') }}</h2>

            <div class="row new-doc" v-if="avilable">
              <div class="col-lg-4">
                <select name="" id="" v-model="addedId">
                  <option v-for="av in avilable" :value="av.id">{{ av.value }}</option>
                </select>
              </div>
              <div class="col-lg-4">
                <input type="file" @change="changeFile($event)">
              </div>
            </div>

            <div class="row">


              <div class="col-lg-3">

              </div>
              <button v-if="isLoading" class="save-btn"><img src="../../assets/img/icons/nv6.svg" class="spin"></button>
              <button class="save-btn" v-if="!isLoading" @click="applyDocs">{{
                  $t('pages.account.applyDocuments')
                }}
              </button>
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
import { mapGetters } from 'vuex'
import { API } from '../../api'

export default {
  components: { Navbar, AcNav },
  data () {
    return {
      isLoading: false,
      documents: null,
      avilable: null,
      addedId: null,
      addedFile: ''
    }
  },
  computed: {
    ...mapGetters({ player: 'auth/getPlayer' }),
  },
  methods: {
    getDocName (id) {
      let docum = this.avilable.find(item => {
        return item.id == id
      })
      return docum.value
    },
    changeFile (e) {
      this.addedFile = event.target.files[0]
    },
    documentType () {
      API.get('player-uploads', {
        params: {
          expand: 'type'
        }
      }).then(res => {
        this.documents = res.data
      })
    },
    applyDocs () {
      this.isLoading = true

      let emailBody = {
        type_id: this.addedId,
        file: this.addedFile
      }

      let form2 = new FormData()

      for (let field in emailBody) {
        form2.append(field, emailBody[field])
      }

      API.post('player-uploads', form2)
          .then(res => {
            this.documentType()
            console.log(res)
            this.isLoading = false
          }).catch(error => {
        this.isLoading = false
      })
    }
  },
  created () {
    this.documentType()

    API.get('player-upload-types')
        .then(res => {
          this.avilable = res.data
        })
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
</style>