export default {
  state: {
    isSidebarVisible: true,
    theme: 'dark',
  },
  getters: {
    sidebarVisibility: (state: any) => state.isSidebarVisible,
    theme: (state: any) => state.theme,
  },
  mutations: {
    toggleSidebarVisibility(state: any) {
      state.isSidebarVisible = !state.isSidebarVisible
    },
    toggleTheme(state: any, payload: any) {
      state.theme = payload
    },
  }
}