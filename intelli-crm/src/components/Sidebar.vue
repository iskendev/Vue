<template lang='pug'>
  div.sidebar(v-if='sidebarVisibility')
    ul
      li(v-for='(title, i) in titles' :index='i' @click='redirect(title.path)')
          i(:class="`fas fa-${title.icon}`")
          span {{ title.title }} 
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    redirect(path) {
      this.$router.push(path);
    }
  },
  computed: {
    titles() {
      return [
        { title: 'Home', icon: 'home', path: '/'},
        { title: 'Time tracker', icon: 'clock', path: '/time-tracker'},
        { title: 'Todo', icon: 'pencil-alt', path: '/todo'},
        { title: 'Expense Tracker', icon: 'wallet', path: '/expense-tracker'},
        { title: 'Relaxer', icon: 'mug-hot', path: '/relaxer'},
        { title: 'Charts', icon: 'chart-bar', path: '/charts'},
        { title: 'Settings', icon: 'wrench', path: '/settings'}
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