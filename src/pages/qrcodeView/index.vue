<template>
  <div class="container">
    <qrcode :text="qrText" remind="置于扫码器上方签到"/>
  </div>
</template>

<script>
import qrcode from '../../components/qrcode'
import getQrcode from '../../data/signIn'

export default {
  name: 'qrcodeView',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isShow () {
      return this.show
    }
  },
  watch: {
    isShow (newValue, oldValue) {
      if (newValue) {
        this.onShow()
      } else {
        this.onHide()
      }
    }
  },
  data () {
    return {
      qrText: '',
      timer: -1
    }
  },
  methods: {
    onShow () {
      this.startRefresh()
    },
    onHide () {
      this.stopRefresh()
    },
    refresh () {
      getQrcode().then(
        res => {
          if (res.message === 'refresh') {
            this.qrText = res.data
          } else if (res.message === 'success') {
            this.signInSuccess()
          }
        }
      ).catch(
        err => {
          this.signInFailed(err.message, err.data)
        }
      )
    },
    startRefresh () {
      console.log('startRefresh')
      this.refresh()
      this.timer = setInterval(this.refresh, 5000)
    },
    stopRefresh () {
      console.log('stopRefresh')
      clearInterval(this.timer)
      this.timer = -1
    },
    signInSuccess () {
      this.$createDialog({
        type: 'alert',
        title: '签到成功',
        icon: 'cubeic-right'
      }).show()
    },
    signInFailed (message, data) {
      this.$createDialog({
        type: 'alert',
        title: message,
        content: data,
        icon: 'cubeic-wrong'
      }).show()
    }
  },
  components: {
    qrcode
  }
}
</script>

<style lang="stylus" scoped>
.container
  margin-top: 30%
</style>
