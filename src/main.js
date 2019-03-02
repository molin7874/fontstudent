// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
import qs from 'qs'
import '@/icons' // icon
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import { getToken, removeToken } from '@/utils/auth'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
/* eslint-disable no-new */
// Vue.prototype.$axios.defaults.headers['authorization'] = 'STDTOKEN'
Vue.prototype.$axios.interceptors.request.use(
  config => {
    let localtoken = getToken()
    if (localtoken) {
      config.headers['STDTOKEN'] = localtoken
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
Vue.prototype.$axios.interceptors.response.use(
  response => {
    const rescode = response.data.code
    if (rescode === '0') {
      return response
    } else if (rescode === '-4') {
      Vue.prototype.$message('格式不正确')
      removeToken()
      router.push({path: '/login'})
    } else {
      console.log(response.data.msg)
      return response
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
router.beforeEach((to, from, next) => {
  if (to.path === '/dashboard') {
    let localtoken = getToken()
    if (!localtoken) {
      next({path: '/login'})
    } else {
      console.log(111)
      next()
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
