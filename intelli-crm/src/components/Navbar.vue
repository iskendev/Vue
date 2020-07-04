<template lang='pug'>
  div.navbar
    h1.navbar-title(@click='toggleSidebarVisibility') intelli-crm 
      i.fas.fa-power-off
    div.navbar-items
      ul
        li(v-for='(icon, i) in icons' :index='i')
          i(:class="`fas fa-${icon}`")
</template>

<script>
import { useStore } from '../composable/use-store'
import { computed } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

export default  defineComponent ({
  name: 'Navbar',
  setup() {
    const store = useStore()
    const toggleSidebarVisibility = () => {
      store.commit('toggleSidebarVisibility')
    }
    const icons = computed(() => ['info', 'toggle-on', 'user'])
    return { toggleSidebarVisibility, icons }
  }
})
</script>

<style lang="scss">
@import '../sass/_navbar.scss';
</style>