<template lang='pug'>
  div#app
    Navbar
    div.main
      Sidebar(:class='{ hide:  sidebarVisibility}')
      router-view.view
</template>

<script>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Navbar, Sidebar
  },
  computed: {
    sidebarVisibility() {
      return this.$store.getters.sidebarVisibility;
    }
  }
  
}
</script>

<style lang="scss">
@import './sass/_app.scss';

@keyframes hide {
  from {
    flex: 1
  }

  to {
    flex: none;
    
  }
}

.hide {
      animation-name: hide;
      animation-duration: 1s;
    }


</style>