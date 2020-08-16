<template>
  <div class="container">
    <div class="me">
      <div class="myImage">
        <img src="https://pic2.zhimg.com/v2-50162912937dbe8f14caa7bb67098be2_r.jpg?source=1940ef5c"/>
      </div>
      <div class="name">
        测试
      </div>
    </div>
    <div class="menus">
      <div class="menu">
        <div class="leftText">
          <i class="cubeic-calendar">我的活动</i>
        </div>
        <div class="rightIcon">
          <i class="cubeic-arrow"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myView',
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
      } else {
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.me
  padding-right 20px
  height 150px
  width 100%
  background-color white
  display flex
  flex-direction column
  align-items center
  justify-content center

  border-
  .myImage
    height 52px
    width 52px
    padding 2px
    background-color white
    border-radius 52px
    box-shadow 0 0 2px rgba(0, 0, 0, 0.4)

    img
      line-height 0
      display inline-block
      border-radius 50%
      transition linear 0.25s
      width: 100%
      height auto

  .name
    margin-top 12px
    color gray
    font-size 10px

.menus
  margin-top 30px
  height 350px
  width 100%
  background-color white

  .menu
    height 40px
    width 100%
    font-size 16px
    padding-top 20px
    border-radius 6px
    border-bottom 1px rgba(0, 0, 0, 0.4) solid
    padding-left 5%
    padding-right 5%

    .leftText
      display inline-block

    .rightIcon
      display inline-block
      padding-left 68%
</style>
