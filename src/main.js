// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRource from 'vue-resource'
Vue.use(VueRource)

//全局事件过滤器
import moment from 'moment'
Vue.filter("dataFomate",function (dataStr,pattern = "YYYY-MM-DD HH:MM:SS") {
  return moment(dataStr).format(pattern)
})


Vue.config.productionTip = false
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>',
  store
})
