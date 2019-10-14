<template>
  <page class="tab-composite-view" :title="selectedLabel">
    <div slot="content">
      <cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabLabels">
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 活动 -->
          <cube-slide-item>
            <cube-scroll :data="activityData" :options="scrollOptions">
              <ul class="list-wrapper">
                <li v-for="(item, index) in activityData" class="list-item" :key="index"
                    @click.prevent="goDetail(item)">
                  <div class="activiyTitle">
                    {{item.title}}
                  </div>
                  <div class="activityStartTime">
                    {{item.start_time}}
                  </div>
                  <div class="activityLocation">
                    {{item.location}}
                  </div>
                  <div class="activityRequirement">
                    <div>
                      <span v-if="item.needRegister">需报名</span>
                      <span v-else>无需报名</span>
                      <span v-if="item.needSignIn">需签到</span>
                      <span v-else>无需签到</span>
                      <span class="activityOrg">{{item.organization}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </cube-scroll>
          </cube-slide-item>
          <!-- 签到 -->
          <cube-slide-item @click="signInSuccess">
            <cube-scroll :options="scrollOptions">
              <qrcode class="qrcode" :text="qrText" remind="置于扫码器上方签到"/>
            </cube-scroll>
          </cube-slide-item>
          <!-- 我的 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              <div class="me">
                <div class="myImage">
                  <img :scr="userImage"/>
                </div>
                <div class="name">
                  {{username}}
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
                <div class="menu">
                </div>
              </div>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </page>
</template>

<script type="text/ecmascript-6">
  import page from './page'
  import qrcode from './qrcode'

  import findIndex from '../data/utils'
  import getActivities from '../data/activity'
  import getQrcode from '../data/signIn'

  export default {
    name: 'activity',
    data () {
      return {
        selectedLabel: '活动-test1',
        disabled: false,
        tabLabels: [{
          label: '活动-test1',
          icon: 'cubeic-home'
        }, {
          label: '签到-test1',
          icon: 'cubeic-qr-code'
        }, {
          label: '我的-test1',
          icon: 'cubeic-person'
        }],
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        activityData: [],
        qrText: '',
        username: '',
        userImage: 'https://p1.cshome.com/851e4e128a7e8c8da595ac0747e61028a43fd0b3_bigger',
        timer: -1,
        ifClicked: false
      }
    },
    created () {
      this.$ajax.get('user/app_login_test')
        .then(res => {
          this.username = res.data.userInfo.username
          getActivities().then(res => {
            this.activityData = res
          }).catch(err => {
            console.log(err)
          })
        })
    },
    mounted () {
    },
    methods: {
      changePage (current) {
        this.selectedLabel = this.tabLabels[current].label

        // refresh/stopRefresh Qrcode
        if (current === 1 && this.timer === -1) {
          this.startRefresh()
        } else if (current !== 1 && this.timer !== -1) {
          this.stopRefresh()
        }

        // showTitle
        if (current === 2) {
          this.showTitle = ''
        } else {
          this.showTitle = 'show'
        }
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
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
      goDetail (item) {
        if (this.ifClicked) {
          this.ifClicked = !this.ifClicked
        } else {
          this.ifClicked = !this.ifClicked
          this.$router.push({
            name: 'detail',
            params: {activity: item}
          })
        }
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
    computed: {
      initialIndex () {
        let index = 0
        index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
        return index
      }
    },
    components: {
      page,
      qrcode
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .tab-composite-view
    .cube-tab-bar
      background-color: white
      position: fixed
      bottom: 0
      margin: 0
      width: 100%
      z-index 10

    //.cube-tab, .cube-tab_active
    //color: black

    //.cube-tab-bar-slider
    //background-color: black

    .tab-slide-container
      position: fixed
      top: 44px
      left: 0
      right: 0
      bottom: 6%

    .list-wrapper
      overflow: hidden

      li
        padding: 15px 10px
        margin: 10px 10px 0
        text-align: left
        line-height 1.3
        background-color: white
        border-radius: 15px
        box-shadow: 0 1px 6px #ccc
        font-size: 14px
        white-space: normal

        .activiyTitle
          font-size: 16px
          font-weight bolder
          color black

        .activityStartTime
          margin: 15px 0 0

        .activityLocation
          margin: 5px 0 0

        .activityRequirement
          margin: 10px 0 0
          line-height 1.5

          .activityOrg
            display inline-block
            float right
            padding: 0 4px
            border-radius: 3px
            font-size: 12px
            color white
            background-color mediumseagreen

    .qrcode
      margin-top: 30%

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
