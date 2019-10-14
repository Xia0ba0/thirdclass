import Vue from 'vue'
import Router from 'vue-router'
import activity from '../components/activity'
import activityDetail from '../components/activityDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'activity',
      component: activity,
      meta: {
        keepAlive: true,
        level: 0
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: activityDetail,
      meta: {
        keepAlive: false,
        level: 1
      }
    }
  ]
})
