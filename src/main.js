import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios' //基于 Promise 的，为浏览器和 Node.js 设计的 HTTP 客户端
import {Header,Button,Swipe,SwipeItem,Toast,Indicator} from 'mint-ui' //mint-ui的部分组件
import * as filter from './filter/filter' //过滤器文件

// axios.defaults.baseURL = 'http://api.jswei.cn' //请求基地址

axios.defaults.timeout = 6000 //响应时间

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$Toast = Toast; //mint-ui 公共提示框组件

Vue.prototype.$Indicator = Indicator; //mint-ui 公共加载提示框组件

Object.keys(filter).forEach(key => {Vue.filter(key, filter[key])}) //循环过滤器

Vue.component(Header.name, Header) //mint-ui 公共头部组件

Vue.component(Button.name, Button) //mint-ui 公共按钮组件

Vue.component(Swipe.name, Swipe); //mint-ui 公共轮播图组件

Vue.component(SwipeItem.name, SwipeItem) //mint-ui 公共轮播图组件

router.beforeEach((to, from, next) => {window.document.title = to.meta.title; next()}) //通过路由修改每个页面的title

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
