<template lang='pug'>
  div#app
    Navbar
    div.main
      Sidebar
      router-view.view
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { provideStore } from './composable/use-store'
import { defineComponent } from '@vue/composition-api'


export default defineComponent ({
  name: 'App',
  components: {
    Navbar, Sidebar
  },
  setup(props, { root: { $store } }) {
    provideStore($store) // Make store accessible for all components
  }
})
</script>

<style lang="scss">
@import './sass/_app.scss';
</style>
