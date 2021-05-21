import Vue from 'vue'
import Vuex from 'vuex'
import Global from './module/global'
import User from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Global, User
  }
})
