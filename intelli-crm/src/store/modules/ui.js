export default {
  state: {
    isSidebarVisible: true
  },
  getters: {
    sidebarVisibility: (state) => state.isSidebarVisible
  },
  mutations: {
    toggleSidebarVisibility(state) {
      state.isSidebarVisible = !state.isSidebarVisible;
    }
  }
}