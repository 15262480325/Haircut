import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import portraito from '../assets/images/portraito.jpg' //默认头像
export default new Vuex.Store({
  state: {
    account: '', //账号
    head: portraito, //头像
    token: '', //登录token
    nickName: '', //用户昵称
  },
  mutations: {
    //保存登录信息
    saveAccount (state,data) {
      state.account = data.phone;
      state.head = data.head;
      state.token = data.user_id;
      state.nickName = data.nickname || '';
    },

    //修改头像
    changePortraito (state,head) {
      state.head = head;
    },

    //清空登录状态
    cancelLoginState (state) {
      state.token = '';
    }
  }
})
