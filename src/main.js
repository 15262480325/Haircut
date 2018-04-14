import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import 'mint-ui/lib/style.css'
import './assets/icon/iconfont.css'
import axios from 'axios' //基于 Promise 的，为浏览器和 Node.js 设计的 HTTP 客户端
import {Button, Swipe, SwipeItem,Toast, Popup, Radio, MessageBox, Indicator} from 'mint-ui' //mint-ui的部分组件
import * as filter from './filter/filter' //过滤器文件

axios.defaults.baseURL = '/agent' //请求基地址

axios.defaults.timeout = 6000 //响应时间

Vue.config.productionTip = false

Vue.prototype.$imageBasicUrl = 'http://api.jswei.cn' //图片地址

Vue.prototype.$axios = axios

Vue.prototype.$Toast = Toast; //mint-ui 公共提示框组件

Vue.prototype.$Indicator = Indicator; //mint-ui 公共加载提示框组件

Vue.prototype.$MessageBox = MessageBox; //mint-ui 公共询问框

Object.keys(filter).forEach(key => {Vue.filter(key, filter[key])}) //循环过滤器

Vue.component(Button.name, Button) //mint-ui 公共按钮组件

Vue.component(Swipe.name, Swipe); //mint-ui 公共轮播图组件

Vue.component(SwipeItem.name, SwipeItem) //mint-ui 公共轮播图组件

Vue.component(Popup.name, Popup) //mint-ui 公共Popup组件

Vue.component(Radio.name, Radio) //mint-ui 公共Radio组件

//通过路由修改每个页面的title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if (store.state.loginState.token === '' && to.meta.requiresAuth) {
    MessageBox.confirm('请登录!').then(action => {next('/Login');}).catch(error => {next('/')});
  }else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
