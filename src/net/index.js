import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://10.128.2.113/'
axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios
