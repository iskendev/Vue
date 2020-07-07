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
          div.tooltip <i class='fas fa-sign-in-alt'></i>
            span.tooltiptext Sign out
          
</template>

<script>
import { useStore } from '../composable/use-store'
import { defineComponent, computed } from '@vue/composition-api'

export default  defineComponent ({
  name: 'Navbar',
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const toggleSidebarVisibility = () => {
      store.commit('toggleSidebarVisibility')
    }
   
    return { toggleSidebarVisibility, isLoggedIn }
  }
})
</script>

<style lang="scss">
@import '../sass/_navbar.scss';
</style>