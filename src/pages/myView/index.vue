<template>
  <div class="container">
    <div class="me">
      <div class="myImage">
        <img :src="userData.avatar"/>
      </div>
      <div class="name">
        {{ userData.userName }}
      </div>
    </div>
    <div class="menus">
      <div class="menu" @click="goMyactivity">
        <div class="leftText">
          <i class="cubeic-calendar"></i>
          <span>我的活动</span>
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
    },
    userData: {
      type: Object,
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
  },
  methods: {
    goMyactivity () {
      this.$router.push('/myActivity').catch(err => err)
    }
  }
}
</script>

<style lang="stylus" scoped>
.me
  padding-right 20px
  height 150px
  width 100%
  display flex
  flex-direction column
  align-items center
  justify-content center


  .myImage
    height 60px
    width 60px
    padding 2px
    background-color white
    border-radius 52px
    box-shadow 0 0 2px rgba(0, 0, 0, 0.4)
    overflow-y hidden

    img
      width: 100%
      height auto

  .name
    margin-top 20px
    color gray
    font-size 12px

.menus
  margin-top 30px
  height 350px
  width 100%

  .menu
    height 56px
    width 100%
    line-height 56px
    font-size 16px

    .leftText
      display inline-block
      margin-left 4%
      i
        margin-right 10px

    .rightIcon
      display inline-block
      color gray
      font-size 10px
      float right
      margin-right 4%

</style>
