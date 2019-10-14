<template>
  <page class="tab-composite-view" showtitle="show" title="活动详情" goback="true">
    <div slot="content">
      <div class="detailContainer">
        <div class="topImage" ref="image">
          <img :src="topImage"/>
        </div>
        <div class="info">
          <div class="infoHead">
            <div class="title">
              {{title}}
            </div>
            <div class="heads">
              <div class="head">
                <i class="cubeic-tag"></i>
                {{org}}
              </div>
              <div class="head">
                <i class="cubeic-notification"></i>
                活动时间: {{start_time}} ~ {{end_time}}
              </div>
              <div v-show="needRegister" class="head">
                <i class="cubeic-hot"></i>
                报名时间: {{reg_start_time}} ~ {{reg_end_time}}
              </div>
              <div class="head">
                <i class="cubeic-location"></i>
                {{location}}
              </div>
              <div class="head">
                <div class="head">
                  <div class="category">
                    {{type}}
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
            {{ detail}}
          </div>
        </div>
        <div class="bottomButton" @click="register">
          <div class="btnText">
            <i class="cubeic-good">报名</i>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
  import page from './page'

  export default {
    name: 'activityDetail',
    created () {
      this.$route.params.activity.getDetails().then(
        () => {
          this.detail = this.$route.params.activity.text
        }
      )
    },
    data () {
      return {
        topImage: /* this.$route.params.activity.image
          ? this.$route.params.activity.image
          : */ 'https://image.diyiyou.com/gamelib/201908/19/19141925gkgh.jpg',
        title: this.$route.params.activity.title,
        org: this.$route.params.activity.organization,
        start_time: this.$route.params.activity.start_time,
        end_time: this.$route.params.activity.end_time,
        reg_start_time: this.$route.params.activity.reg_start_time,
        reg_end_time: this.$route.params.activity.reg_end_time,
        location: this.$route.params.activity.location,
        needRegister: this.$route.params.activity.needRegister,
        needSignIn: this.$route.params.activity.needSignIn,
        type: this.$route.params.activity.type,
        detail: this.$route.params.activity.text
      }
    },
    methods: {
      register () {
        this.$route.params.activity.register().then(
          () => {
            this.regSuccess()
          }).catch(
          (err) => {
            this.regFailed(err.msg)
          }
        )
      },
      showToast (type, text) {
        this.$createToast({
          txt: text,
          type: type
        }).show()
      },
      regSuccess () {
        console.log('regSuccess')
        this.showToast('correct', '报名成功')
      },
      regFailed (warnning) {
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

            .category
              width: 100px
              height: 20px
              color: #1592e6
              border: 1px solid #1592e6
              border-radius: 18px
              text-align: center
              display: inline-block

            .right
              color: black
              float: right
              margin 0 15px

      .infoDetail
        margin-top 18px
        color black
        line-height 1.5

  .bottomButton
    width 100%
    height 6%
    background-color dodgerblue
    color white
    position fixed
    bottom 0
    display flex
    align-items center
    justify-content center
    box-shadow 5px 5px 5px 5px dodgerblue

    .btnText
      font-size 150%
      font-weight bolder
</style>
