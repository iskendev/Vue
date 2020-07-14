import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import trello from './modules/task-planner'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark'
  },
  getters: {
    theme: s => s.theme
  },
  mutations: {
    toggleTheme(state, payload) {
      state.theme = payload
      console.log(state.theme);
      
    }
  },
  actions: {

  },
  modules: {
    ui, trello, auth
  }
})