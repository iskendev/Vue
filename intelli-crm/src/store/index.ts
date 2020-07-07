import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ui from './modules/ui'
import trello from './modules/trello'
import auth from './modules/auth'

// if (localStorage.getItem('columns')) {
  // columns = JSON.parse(localStorage.getItem('columns'))
// } else {
  // columns = trello.state.columns
// }

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    ui, trello, auth
  }
})