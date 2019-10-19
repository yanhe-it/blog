import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import './assets/iconfont/iconfont.css'
import './plugins/element.js'
import './global'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')