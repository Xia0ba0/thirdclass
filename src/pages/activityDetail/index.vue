<template>
  <page showtitle="show" title="活动详情" goback="true">
    <div slot="content">
      <div class="detailContainer">
        <div class="topImage" ref="image">
          <img :src="topImage" @click="showPics"/>
        </div>
        <div class="info">
          <div class="infoHead">
            <div class="title">
              {{ title }}
            </div>
            <div class="heads">
              <div class="head">
                <i class="cubeic-tag"></i>
                主办机构： {{ org }}
              </div>
              <div class="head">
                <i class="cubeic-notification"></i>
                活动时间： {{ start_time }} ~ {{ end_time }}
              </div>
              <div v-if="needRegister" class="head">
                <i class="cubeic-hot"></i>
                报名时间： {{ reg_start_time }} ~ {{ reg_end_time }}
              </div>
              <div v-if="needRegister" class="head">
                <i class="cubeic-setting"></i>
                限定人数： {{ attendLimit }}人
              </div>
              <div v-if="needRegister" class="head">
                <i class="cubeic-square-right"></i>
                已报人数： {{ attendCount }}人
              </div>
              <div class="head">
                <i class="cubeic-location"></i>
                活动位置： {{ location }}
              </div>
              <div class="head">
                <div class="tags">
                  <div class="category">
                    {{ type }}
                  </div>
                  <span class="right" v-if="needRegister"> 需报名</span>
                  <span class="right" v-else>无需报名</span>
                  <span class="right" v-if="needSignIn"> 需签到</span>
                  <span class="right" v-else>无需签到</span>
                </div>
              </div>
            </div>
          </div>
          <div class="infoDetail">
            {{ detail }}
          </div>
        </div>
      </div>
      <div class="buttonContainer">
        <div class="bottomButton reg" v-if="showButton && needRegister && !ifRegistered" @click="register">
          <div class="btnText">
            <i class="cubeic-like">报名</i>
          </div>
        </div>
        <div class="bottomButton unReg" v-if="showButton && needRegister && ifRegistered" @click="unRegister">
          <div class="btnText">
            <i class="cubeic-close">取消报名</i>
          </div>
        </div>
        <div class="bottomButton noReg" v-if="showButton && !needRegister">
          <div class="btnText">
            <i class="cubeic-ok">无需报名</i>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import page from '../../components/page'

export default {
  name: 'activityDetail',
  created () {
    this.$route.params.activity.getDetails().then(
      () => {
        this.detail = this.$route.params.activity.text
      }
    )
    this.$route.params.activity.checkIfRegistered().then(ifRegistered => {
      this.showButton = true
      this.ifRegistered = ifRegistered
    }
    )
  },
  data () {
    return {
      // content
      topImage: this.$route.params.activity.images
        ? this.$route.params.activity.images[0]
        : 'http://sclass.cafa.edu.cn/web/static/images/activity_default.jpg',
      images: this.$route.params.activity.images,
      title: this.$route.params.activity.title,
      org: this.$route.params.activity.organization,
      start_time: this.$route.params.activity.start_time,
      end_time: this.$route.params.activity.end_time,
      reg_start_time: this.$route.params.activity.reg_start_time,
      reg_end_time: this.$route.params.activity.reg_end_time,
      attendLimit: this.$route.params.activity.attendLimit,
      attendCount: this.$route.params.activity.attendCount,
      location: this.$route.params.activity.location,
      needRegister: this.$route.params.activity.needRegister,
      needSignIn: this.$route.params.activity.needSignIn,
      type: this.$route.params.activity.type,
      detail: this.$route.params.activity.text,
      // control
      showButton: false,
      ifRegistered: false
    }
  },
  methods: {
    register () {
      this.$route.params.activity.register().then(
        () => {
          this.ifRegistered = true
          this.attendCount += 1
          this.regSuccess()
        }).catch(
        (err) => {
          this.failed(err.msg)
        }
      )
    },
    unRegister () {
      this.$route.params.activity.unRegister().then(
        () => {
          this.ifRegistered = false
          this.attendCount -= 1
          this.unRegSuccess()
        }).catch(
        err => {
          this.failed(err.msg)
        })
    },
    showPics () {
      if (this.$route.params.activity.images) {
        this.$createImagePreview({
          imgs: this.images
        }).show()
      }
    },
    showToast (type, text) {
      this.$createToast({
        txt: text,
        type: type
      }).show()
    },
    regSuccess () {
      this.showToast('correct', '报名成功')
    },
    unRegSuccess () {
      this.showToast('correct', '取消报名成功')
    },
    failed (warnning) {
      this.showToast('warn', warnning)
    }
  },
  components: {
    page
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detailContainer
  width 100%
  position fixed
  height calc(94% - 44px)
  overflow-y auto
  top 44px
  background-color: white;
  z-index 11

  .topImage
    z-index -1

    img
      width auto
      height auto
      max-width 100%
      min-width 100%

  .info
    padding-bottom 6%
    padding-left 2%
    padding-right: 2%
    padding-top: 3%

    .infoHead
      padding-bottom 10px
      color: #666667
      font-size 12px
      line-height 1.3
      border-bottom: 1px solid #666667

      .title
        font-size 20px
        font-weight bold
        margin-bottom: 10px

      .heads
        .head
          margin 8px 0

          .tags
            height 20px
            line-height 20px

            .category
              width: 100px
              height: 20px
              color: #1592e6
              border: 1px solid #1592e6
              border-radius: 18px
              text-align center
              display: inline-block

            .right
              color: black
              float: right
              margin 0 15px

    .infoDetail
      margin-top 18px
      color black
      line-height 1.5
      word-break break-all

.buttonContainer
  width 100%
  height 6%
  position fixed
  bottom 0
  z-index 11

  .bottomButton
    color white
    display flex
    align-items center
    justify-content center
    height 100%


    .btnText
      font-size 150%
      font-weight bolder

  .reg
    background-color dodgerblue
    box-shadow 5px 5px 5px 5px dodgerblue

  .unReg
    background-color gray
    box-shadow 5px 5px 5px 5px gray

  .noReg
    background-color darkseagreen
    box-shadow 5px 5px 5px 5px darkseagreen
</style>
