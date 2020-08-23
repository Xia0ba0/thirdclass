// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  TabBar,
  TabPanels,
  ImagePreview,
  Scroll,
  Slide
} from 'cube-ui'
import App from './App'
import router from './router'
import './net'

Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(ImagePreview)
Vue.use(Scroll)
Vue.use(Slide)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
