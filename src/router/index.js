import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index' // 首页
import Login from '../view/Login' //登录页
import Register from '../view/Register' // 注册页
import ForgotPsd from '../view/forgotPsd/ForgotPsd' //找回密码
import ResetPass from '../view/forgotPsd/ResetPass.vue' //重置密码

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {title: '首页'},
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {title: '登录'},
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      meta: {title: '注册'},
      component: Register
    },
    {
      path: '/ForgotPsd',
      name: 'ForgotPsd',
      meta: {title: '找回密码'},
      component: ForgotPsd
    },
    {
      path: '/ResetPass',
      name: 'ResetPass',
      meta: {title: '重置密码'},
      component: ResetPass
    },
  ]
})

