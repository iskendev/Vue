<template lang='pug'>
  div#navbar.navbar(:class='{ light: theme === "light" }')
    h1.navbar-title(@click='toggleSidebarVisibility') intelli-crm 
      i.fas.fa-power-off
    div.navbar-items(v-if='isLoggedIn')
      ul
        li
          i.fas.fa-info
          i.fas.fa-moon(v-if='theme === "dark"' @click='toggleTheme("light")')
          i.fas.fa-sun(v-if='theme === "light"' @click='toggleTheme("dark")')
          span {{ userName }}
          div.tooltip <i class='fas fa-sign-in-alt' @click='logOut()'></i>
            span.tooltiptext Sign out
</template>

<script>
import { authHandler } from '../composable/views/auth'
export default ({
  name: 'Navbar',
  setup(_, { root: { $store, $router } }) {
    const { isLoggedIn, logOut, userName } = authHandler($store, $router)

    // ui
    const toggleSidebarVisibility = () => {
      $store.commit('toggleSidebarVisibility')
    }

    // TODO handle theme switcher 
    // const theme = computed(() => $store.getters.theme)
    // const = (theme) => {
    //   $store.commit('toggleTheme', theme)
    // }
    return { isLoggedIn, logOut, userName, toggleSidebarVisibility }
  }
})
</script>
<style lang="scss">
@import '../sass/components/_navbar.scss';
</style>