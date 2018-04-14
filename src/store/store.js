import Vue from 'vue'
import Vuex from 'vuex'
import {loginState} from './login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginState
  }
})
