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
          span Iskender
          div.tooltip <i class='fas fa-sign-in-alt' @click='logOut()'></i>
            span.tooltiptext Sign out
</template>

<script>
import { defineComponent, computed, onMounted, ref } from '@vue/composition-api'

export default  defineComponent ({
  name: 'Navbar',
  setup(_, { root: { $store, $router } }) {
    // logic
    const isLoggedIn = computed(() => $store.getters.isLoggedIn)
    const logOut = async () => {
      await $store.dispatch('signOut')
      $router.push('/login')
    }

    // ui
    const toggleSidebarVisibility = () => {
      $store.commit('toggleSidebarVisibility')
    }
    const theme = computed(() => $store.getters.theme)
    const toggleTheme = (theme) => {
      $store.commit('toggleTheme', theme)
    }
    
    return { toggleSidebarVisibility, isLoggedIn, logOut, theme, toggleTheme }
  }
})
</script>

<style lang="scss">
@import '../sass/_navbar.scss';
</style>