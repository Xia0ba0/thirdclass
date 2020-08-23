<template>
  <ul class="list-wrapper">
    <li v-for="(item, index) in activityData" class="list-item" :key="index"
        @click.prevent="goDetail(item)">
      <div class="activiyTitle">
        {{ item.title }}
      </div>
      <div class="activityStartTime">
        {{ item.start_time }}
      </div>
      <div class="activityLocation">
        {{ item.location }}
      </div>
      <div class="activityRequirement">
        <div>
          <span v-if="item.needRegister">需报名</span>
          <span v-else>无需报名</span>
          <span v-if="item.needSignIn">需签到</span>
          <span v-else>无需签到</span>
          <span class="activityOrg">{{ item.organization }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {getActivities} from '../../data/activity'
export default {
  name: 'activityView',
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
  },
  data () {
    return {
      activityData: []
    }
  },
  created () {
    // this is processed by webpack
    if (process.env.NODE_ENV === 'development') {
      alert('login from backdoor')
      this.$ajax.get('user/app_login_test')
        .then(res => {
          getActivities().then(res => {
            this.activityData = res
          }).catch(err => {
            console.log(err)
          })
        })
    } else {
      getActivities().then(res => {
        this.activityData = res
      }).catch(err => {
        alert(err.message)
      })
    }
  },
  methods: {
    goDetail (item) {
      this.$router.push({
        name: 'detail',
        params: {activity: item}
      }).catch(err => err)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
