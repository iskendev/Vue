<template lang='pug'>
  div.sidebar 
    ul
      li(v-for='(title, i) in titles' :index='i')
          i(:class="`fas fa-${title.icon}`")
          span {{ title.title }} 
</template>
//(v-if='sidebarVisibility')
<script>
export default {
  name: 'Navbar',
  computed: {
    titles() {
      return [
        { title: 'Time tracker', icon: 'clock'},
        { title: 'Todo', icon: 'pencil-alt'},
        { title: 'Expense Tracker', icon: 'wallet'},
        { title: 'Relaxer', icon: 'mug-hot'},
        { title: 'Charts', icon: 'chart-bar'},
        { title: 'Settings', icon: 'wrench'}
      ]
    },
    sidebarVisibility() {
      return this.$store.getters.sidebarVisibility;
    }
  }
}
</script>

<style lang="scss">
@import '../sass/sidebar.scss'
</style>