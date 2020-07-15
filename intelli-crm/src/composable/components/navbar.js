import { computed } from '@vue/composition-api'

export function navbarHandlers(store) {
  // logic
  
  // ui --------------------------------
  const toggleSidebarVisibility = () => {
    store.commit('toggleSidebarVisibility')
  }
  
  // TODO handle theme switcher 
  const theme = computed(() => store.getters.theme)
  const toggleTheme = (theme) => {
    store.commit('toggleTheme', theme)
  }

  return { toggleSidebarVisibility, theme, toggleTheme  }
}
