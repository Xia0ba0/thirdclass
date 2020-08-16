import Vue from 'vue'
import axios from 'axios'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://sclass.cafa.edu.cn/'
}

axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios
