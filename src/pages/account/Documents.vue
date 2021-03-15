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
                <img src="../../assets/img/icons/nv6.svg" class="spin" alt="">
              </div>
              <div class="col-lg-3 col-sm-4" v-else v-for="doc in documents">
                <div class="document-box text-center">
                  <div class="text-center">


                    <a class="download-link" target="_blank" :href="doc.file_preview">Download document</a>
                    <p class="white-txt">{{ doc.type.value }}</p>
                    <img src="../../assets/img/success.svg" class="status-icon"
                         v-if="doc.status === 'verified' " alt="">
                    <img src="../../assets/img/new.svg" class="status-icon"
                         v-if="doc.status === 'new' " alt="">
                    <img src="../../assets/img/progress.svg" class="status-icon"
                         v-if="doc.status === 'in_progress' " alt="">
                    <img src="../../assets/img/declined.svg" class="status-icon"
                         v-if="doc.status === 'declined' " alt="">
                  </div>
                </div>
              </div>
            </div>

            <br><br>

            <h2>{{ $t('pages.account.addDocuments') }}</h2>

            <div class="row new-doc" v-if="available">
              <div class="col-lg-4">
                <vue2Dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue2Dropzone>
              </div>
              <div class="col-lg-4">
                <select name="" id="" v-model="addedId">
                  <option v-for="availableDocument in available" :value="availableDocument.id">{{ availableDocument.value }}</option>
                </select>
                <br>

                <button v-if="isLoading" class="save-btn"><img src="../../assets/img/icons/nv6.svg" class="spin" alt="">
                </button>
                <button class="save-btn" v-if="!isLoading" @click="uploadDocs">{{ $t('pages.account.applyDocuments') }}
                </button>
                <p style="color: red;" v-if="error"><br>Please attach the file!</p>
              </div>
            </div>

            <div class="row" style="margin: 0;">


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

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {Navbar, AcNav, vue2Dropzone},
  data() {
    return {
      isLoading: false,
      addedId: null,
      addedFile: '',
      error: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: {"My-Awesome-Header": "header value"}
      }
    }
  },
  computed: {
    ...mapGetters({
      player: 'player/getCurrent',
      available: 'playerUploadTypes/getAll',
      currentLang: 'lang/getCurrent',
      documents: 'playerUpload/getAll'
    }),
  },
  watch: {
    currentLang() {
      this.$store.dispatch('playerUploadTypes/loadAll')
      this.$store.dispatch('playerUpload/loadAll')
    },
  },
  methods: {
    uploadDocs() {

      this.addedFile = this.$refs.myVueDropzone.getAcceptedFiles()

      if (this.addedFile === '') {
        this.error = true
        return
      } else if (!this.addedId) {
        this.error = true
        return
      } else {
        this.error = false
      }


      this.isLoading = true


      let uploadData = new FormData()
      uploadData.append('type_id', this.addedId)
      uploadData.append('file', this.addedFile[0])

      this.$store.dispatch('playerUpload/upload', uploadData).then(() => {
        this.isLoading = false
        this.$refs.myVueDropzone.removeAllFiles()
        this.addedFile = ''
      }).catch(() => {
        this.isLoading = false
      })

    }
  },
  created() {
    this.$store.dispatch('playerUpload/loadAll')
    this.$store.dispatch('playerUploadTypes/loadAll')
  }
}

</script>

<style scoped>
select {
  width: 100% !important;
}


/*TODO refactor this class name create custom wrapper, don't use global class names for customization*/
.vue-dropzone {
  border-radius: 15px;
  border: none;
}

.save-btn {
  width: 100%;
}
</style>