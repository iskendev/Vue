<template lang='pug'>
  div#app
    Navbar 
    router-view
</template>

<script>
import Navbar from './components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  } 
}
</script>

<style lang="scss">
@import './sass/_app.scss';
</style>