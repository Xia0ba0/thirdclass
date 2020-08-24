import Vue from 'vue'
import Router from 'vue-router'
import appMain from '../pages/appMain'
import activityDetail from '../pages/activityDetail'
import myActivity from '../pages/myActivity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'appMain',
      component: appMain,
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
    },
    {
      path: '/myActivity',
      name: 'myActivity',
      component: myActivity,
      meta: {
        keepAlive: false,
        level: 1
      }
    },
    {
      path: '/detail2',
      name: 'detail2',
      component: activityDetail,
      meta: {
        keepAlive: false,
        level: 2
      }
    }
  ]
})
