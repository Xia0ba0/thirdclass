<template>
  <div class="qrcode-wrapper">
    <div id="qrcode" class="qrcode-pic" :qr="code"></div>
    <p class="qrcode-remind">{{this.remind}}</p>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'

  export default {
    props: ['text', 'remind'],
    data () {
      return {
        first: true,
        qrcodeHandel: null
      }
    },
    computed: {
      code () {
        if (!this.first) {
          this.qrcodeHandle.clear()
          this.qrcodeHandle.makeCode(this.text)
        }
        return this.text
      }
    },
    mounted () {
      this.first = false
      this.qrcodeHandle = new QRCode('qrcode', {
        text: this.text,
        width: 220,
        height: 220,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .qrcode-wrapper
    text-align: center
    width: 300px
    height: 310px
    margin: 0 auto
    background-color: white
    border-radius: 25px
    padding-top: 40px

    .qrcode-pic
      width: 220px
      margin: 0 auto

    .qrcode-remind
      color: gray
      margin-top: 30px
</style>
