import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: window.sessionStorage.getItem('loginToken') || '', //登录token
    // nickName: window.sessionStorage.getItem('nickName') || '', //用户昵称
    token: '', //登录token
    nickName: ''
  },
  mutations: {
    //保存登录信息
    saveAccount (state,data) {
      state.token = data.user_id;
      state.nickName = data.nickname || '';
    },
  }
})
