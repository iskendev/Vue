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

export default {
  name: 'App',
  components: {
    Navbar, Sidebar
  }
}
</script>

<style lang="scss">
@import './sass/_app.scss';
</style>