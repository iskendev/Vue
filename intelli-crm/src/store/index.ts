import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ui from './modules/ui'
import trello from './modules/trello'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    ui, trello
  }
})