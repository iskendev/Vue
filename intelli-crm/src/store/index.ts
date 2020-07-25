import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import trello from './modules/task-planner'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark',
    loading: false
  },
  getters: {
    theme: s => s.theme,
    loading: s => s.loading
  },
  mutations: {
    toggleTheme(state, payload) {
      state.theme = payload
    },
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
    ui, trello, auth
  }
})