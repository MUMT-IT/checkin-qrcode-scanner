<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">
          <span class="icon">
            <i class="far fa-hand-paper has-text-danger"></i>
          </span>
          <span>
            Help MUMT Fight Against COVID-19
          </span>
        </h1>
        <h2 class="subtitle has-text-centered">
          By simply scan your QR Code to check in everytime you enter the area.
        </h2>
        <div class="columns is-8">
          <div class="column is-one-third is-offset-3">
            <b-loading v-model="loading"></b-loading>
            <qrcode-stream :key="_uid"
                           :camera="camera"
                           @decode="onDecode"
                           :track="paintOutline" @init="onInit" />
          </div>
          <div class="column">
            <b-notification type="is-light is-success"
              v-if="info.checkedInAt !== null && isSaving === false">
              <h2 class="title">Recent Checked In</h2>
              <h1 class="title">{{ this.info.checkedInAt.toLocaleString() }}</h1>
              <h1 class="title is-size-4">{{ this.info.thTitle }} {{ this.info.thName }}</h1>
              <h1 class="subtitle is-size-4">{{ this.info.enTitle }} {{ this.info.enName }}</h1>
              <h1 class="title is-size-5">{{ this.info.thAffil }}</h1>
              <h1 class="subtitle is-size-5">{{ this.info.enAffil }}</h1>
            </b-notification>
            <b-notification type="is-light" v-if="info.checkedInAt === null && fail === false">
              <h1 class="title has-text-centered has-text-info">Please scan QR Code to check in.</h1>
            </b-notification>
            <b-notification type="is-danger" v-if="fail===true">
              <h1 class="title has-text-centered">
                Error saving your data.
              </h1>
              <h1 class="subtitle has-text-centered">
                Please contact IT unit at 092-279-9327.
              </h1>
            </b-notification>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: "Main",
  data () {
    return {
      fail: false,
      loading: false,
      result: null,
      camera: 'auto',
      isSaving: true,
      info: {
        thTitle: null,
        enTitle: null,
        thName: null,
        thAffil: null,
        enName: null,
        enAffil: null,
        checkedInAt: null,
      }
    }
  },
  components: {
    QrcodeStream,
  },
  methods: {
    reset () {
      this.info = {
        thTitle: null,
        enTitle: null,
        thName: null,
        thAffil: null,
        enName: null,
        enAffil: null,
        checkedInAt: null,
      }
    },
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    async onInit (promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async onDecode (content) {
      this.isSaving = true
      let result = content.split("|")
      this.info.thTitle = result[6]
      this.info.thName = result[7]
      this.info.enTitle = result[9]
      this.info.enName = result[10]
      this.info.thAffil = result[11]
      this.info.enAffil = result[12]
      this.info.checkedInAt = new Date()
      this.turnCameraOff()

      const ref = collection(db, 'checkins')
      addDoc(ref, this.info).then(async ()=>{
        this.$buefy.toast.open({
          message: 'บันทึกข้อมูลเรียบร้อยแล้ว..',
          type: "is-success"
        })
        this.isSaving = false
        await this.timeout(3000)
        this.reset()
        this.fail = false
        this.turnCameraOn()
      }).catch(e => {
        this.$buefy.toast.open({
          message: e.toString(),
          type: "is-danger"
        })
        this.isSaving = false
        this.fail = true
        setTimeout(()=>{ this.fail = false}, 5000)
        this.reset()
        this.turnCameraOn()
      })

      // pretend it's taking really long

    },
    logErrors (promise) {
      promise.catch(console.error)
    },
    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>

</style>