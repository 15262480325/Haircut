import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import portraito from '../assets/images/portraito.jpg'
let head = window.localStorage.getItem('head');
export default new Vuex.Store({
  state: {
    account: window.localStorage.getItem('account') || '', //账号
    head:  head === null || head === '' ? portraito : 'http://api.jswei.cn' + head, //头像
    token: window.sessionStorage.getItem('loginToken') || '', //登录token
    nickName: window.sessionStorage.getItem('nickName') || '', //用户昵称
  },
  mutations: {
    //保存登录信息
    saveAccount (state,data) {
      state.account = data.phone;
      state.head = data.head;
      state.token = data.user_id;
      state.nickName = data.nickname || '';
    },
  }
})
