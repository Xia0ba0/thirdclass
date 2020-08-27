<template>
  <page class="tab-composite-view" :title="selectedLabel">
    <div slot="content">
      <cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="transition"
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
          :threshold="threshold"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 活动 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              <activity-view :show="activityViewShow" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 签到 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              <qrcode-view :show="qrcodeViewShow" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 我的 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
              <my-view :show="myViewShow" :user-data="userData" />
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </page>
</template>

<script type="text/ecmascript-6">
import page from '../../components/page'
import activityView from '../activityView'
import qrcodeView from '../qrcodeView'
import myView from '../myView'
import findIndex from './utils'

export default {
  name: 'appMain',
  data () {
    return {
      // Navbar options
      selectedLabel: '活动',
      transition: false,
      tabLabels: [{
        label: '活动',
        icon: 'cubeic-home'
      }, {
        label: '签到',
        icon: 'cubeic-qr-code'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }],
      // Slides options
      loop: false,
      autoPlay: false,
      showDots: false,
      threshold: 0.2,
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
      // Pages options
      activityViewShow: true,
      qrcodeViewShow: false,
      myViewShow: false,
      // User data
      userData: {
        avatar: '',
        userName: ''
      }
    }
  },

  methods: {
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
      if (current === 0) {
        this.activityViewShow = true
        this.qrcodeViewShow = false
        this.myViewShow = false
      } else if (current === 1) {
        this.activityViewShow = false
        this.qrcodeViewShow = true
        this.myViewShow = false
      } else if (current === 2) {
        this.activityViewShow = false
        this.qrcodeViewShow = false
        this.myViewShow = true
      }
    },
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    }
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  created () {
    if (process.env.NODE_ENV === 'development') {
      this.$ajax.get('/user/getMyUserInfo').then(res => {
        this.userData = res.data
      })
    } else {
      this.$ajax.get('/user/app_login_test').then(() => {
        this.$ajax.get('/user/getMyUserInfo').then(res => {
          this.userData = res.data
        })
      })
    }
  },
  components: {
    page,
    activityView,
    qrcodeView,
    myView
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

  .tab-slide-container
    position: fixed
    top: 44px
    left: 0
    right: 0
    bottom: 6%
</style>
