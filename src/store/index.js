import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utilis/token.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    refresh_token: getToken() && getToken().refresh_token,
    token: getToken() && getToken().token,
  },
  mutations: {
    setRefresh (state, val) {
      state.refresh_token = val
    },
    setTokenfn (state, val) {
      state.token = val
    },

  },
  actions: {},
  modules: {}
})
