<template>
  <div class="page">
    <header class="header">
      <i class="cubeic-back" v-show="goback" @click="back"></i>
      <h1>{{title}}</h1>
    </header>
    <div class="wrapper">
      <section v-show="desc" class="desc">
        <slot name="desc">{{desc}}</slot>
      </section>
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      goback: {
        type: String,
        default: ''
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .page
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4

    .header
      position: relative
      height: 44px
      line-height: 44px
      text-align: center
      background-color: #edf0f4
      //box-shadow: 0 1px 6px #ccc
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      z-index: 5

      i
        display inline-block
        font-size 20px
        float left
        font-weight 800

      h1
        font-size: 16px
        font-weight: 700
        float left
        margin-left 20px

    > .wrapper
      height: calc(100% - 44px)
      overflow-x: hidden
      overflow-y: auto
      // -webkit-overflow-scrolling: touch

      .desc
        padding: 10px
        margin: 10px 0
        line-height: 20px
        font-size: 14px
</style>
