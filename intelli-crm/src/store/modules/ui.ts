export default {
  state: {
    isSidebarVisible: true
  },
  getters: {
    sidebarVisibility: (state: any) => state.isSidebarVisible
  },
  mutations: {
    toggleSidebarVisibility(state: any) {
      state.isSidebarVisible = !state.isSidebarVisible;
    }
  }
}