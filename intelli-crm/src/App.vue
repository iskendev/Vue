<template lang='pug'>
  div#app
    Navbar
    div.main
      Sidebar
      router-view.view
</template>

<script>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { provideStore } from './composable/use-store'

export default {
  name: 'App',
  components: {
    Navbar, Sidebar
  },
  setup(props, { root: { $store } }) {
    provideStore($store)
  }
}
</script>

<style lang="scss">
@import './sass/_app.scss';
</style>
