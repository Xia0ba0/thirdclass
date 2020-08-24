<template>
  <page title="我的活动" goback="true">
    <div slot="content">
      <cube-tab-bar v-model="selectedLabel" show-slider>
        <cube-tab v-for="(item,index) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
        </cube-tab>
      </cube-tab-bar>
      <cube-tab-panels v-model="selectedLabel">

        <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
          <ul class="list-wrapper">
            <li v-for="(item, index) in item.activities" class="list-item" :key="index"
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
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </page>
</template>

<script>
import page from '../../components/page'
import {getMyActivities, getMyEndActivities} from '../../data/activity'

export default {
  name: 'myActivity',
  data () {
    return {
      selectedLabel: '已发布',
      tabs: [{
        label: '已发布',
        icon: 'cubeic-like',
        activities: []
      }, {
        label: '已结束',
        icon: 'cubeic-square-right',
        activities: []
      }]
    }
  },
  created () {
    getMyActivities().then(res => {
      this.tabs[0].activities = res
    })
    getMyEndActivities().then(res => {
      this.tabs[1].activities = res
    })
  },
  methods: {
    goDetail (item) {
      this.$router.push({
        name: 'detail2',
        params: {activity: item}
      }).catch(err => err)
    }
  },
  components: {
    page
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
