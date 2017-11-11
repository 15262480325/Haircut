import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index' // 首页
import Login from '../view/Login' //
import Register from '../view/Register' // 注册页

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
