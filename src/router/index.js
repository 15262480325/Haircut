import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    let position ;
    savedPosition ? position = savedPosition : position = { x: 0, y: 0 };
    return position;
  },
  routes: [
    {
      path: '*',
      redirect: '/'
    },
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
      meta: {title: '个人中心', requiresAuth: true},
      component: resolve => require(['../view/personal/Index'], resolve)
    },
    {
      path: '/Notice/:id',
      name: 'Notice',
      meta: {title: '消息中心', requiresAuth: true},
      component: resolve => require(['../view/personal/Notice'], resolve)
    },
    {
      path: '/Setting/:id',
      name: 'Setting',
      meta: {title: '个人信息', requiresAuth: true},
      component: resolve => require(['../view/personal/Setting'], resolve)
    },
    {
      path: '/Portrait/:id',
      name: 'Portrait',
      meta: {title: '个人头像', requiresAuth: true},
      component: resolve => require(['../view/personal/Portrait'], resolve)
    },
    {
      path: '/Account/:id',
      name: 'Account',
      meta: {title: '账号', requiresAuth: true},
      component: resolve => require(['../view/personal/Account'], resolve)
    },
    {
      path: '/Email/:id',
      name: 'Email',
      meta: {title: '邮箱', requiresAuth: true},
      component: resolve => require(['../view/personal/Email'], resolve)
    },
    {
      path: '/ChangePass/:id',
      name: 'ChangePass',
      meta: {title: '修改密码', requiresAuth: true},
      component: resolve => require(['../view/personal/ChangePass'], resolve)
    },
  ]
})

