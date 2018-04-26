import Vue from 'vue'
import Vuex from 'vuex'
import portraito from '../assets/images/portraito.jpg' //默认头像
Vue.use(Vuex)

export const loginState = {
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
      state.head = data.head !== null && data.head !== '' ? data.head : portraito ;
      state.token = data.user_id;
      state.nickName = data.nickname || '';
    },

    //修改头像
    changePortraito (state,head) {
      state.head = head;
    },

    //修改昵称
    changeNickName (state,nickName) {
      state.nickName = nickName;
    },

    //清空登录状态
    cancelLoginState (state) {
      state.token = '';
      state.nickName = '';
    }
  }
}
