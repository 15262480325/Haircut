import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {title: '首页'},
      component: resolve => require(['../view/Index'], resolve)
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {title: '登录'},
      component: resolve => require(['../view/Login'], resolve)
    },
    {
      path: '/Register',
      name: 'Register',
      meta: {title: '注册'},
      component: resolve => require(['../view/Register'], resolve)
    },
    {
      path: '/ForgotPsd',
      name: 'ForgotPsd',
      meta: {title: '找回密码'},
      component: resolve => require(['../view/forgotPsd/ForgotPsd'], resolve)
    },
    {
      path: '/ResetPass',
      name: 'ResetPass',
      meta: {title: '重置密码'},
      component: resolve => require(['../view/forgotPsd/ResetPass'], resolve)
    },
    {
      path: '/Personal/:id',
      name: 'Personal',
      meta: {title: '个人中心'},
      component: resolve => require(['../view/personal/index'], resolve)
    },
  ]
})

