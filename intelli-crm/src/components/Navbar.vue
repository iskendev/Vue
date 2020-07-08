<template lang='pug'>
  div.navbar
    h1.navbar-title(@click='toggleSidebarVisibility') intelli-crm 
      i.fas.fa-power-off
    div.navbar-items(v-if='isLoggedIn')
      ul
        li
          i.fas.fa-info
          i.fas.fa-toggle-on
          span Iskender
          div.tooltip <i class='fas fa-sign-in-alt' @click='logOut()'></i>
            span.tooltiptext Sign out
</template>

<script>
import { defineComponent, computed, onMounted, ref } from '@vue/composition-api'

export default  defineComponent ({
  name: 'Navbar',
  setup(_, { root: { $store, $router } }) {
    const isLoggedIn = computed(() => $store.getters.isLoggedIn)
    const toggleSidebarVisibility = () => {
      $store.commit('toggleSidebarVisibility')
    }
    const logOut = async () => {
      await $store.dispatch('signOut')
      $router.push('/login')
    }
    return { toggleSidebarVisibility, isLoggedIn, logOut }
  }
})
</script>

<style lang="scss">
@import '../sass/_navbar.scss';
</style>