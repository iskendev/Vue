import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import trello from './modules/task-planner'
import auth from './modules/auth'
import clockify from './modules/clockify'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  getters: {
    loading: s => s.loading
  },
  mutations: {
    loadingOFF(state) {
      state.loading = false
    },
    loadingON(state) {
      state.loading = true
    }
  },
  actions: {

  },
  modules: {
    ui, trello, auth,
    clockify
  }
})