import Vue from 'vue'
import App from './App'
import router from './router'

import 'mint-ui/lib/style.css' //饿了么mint-ui样式
import axios from 'axios' //基于 Promise 的，为浏览器和 Node.js 设计的 HTTP 客户端
import {Radio} from 'mint-ui' //mint-ui的部分组件
import * as filter from './filter/filter' //过滤器文件

axios.defaults.baseURL = '' //请求基地址

axios.defaults.timeout = 6000 //响应时间

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Object.keys(filter).forEach(key => {Vue.filter(key, filter[key])}) //循环过滤器

Vue.component(Radio.name, Radio); //mint 单选按钮组件

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
