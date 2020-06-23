<template lang='pug'>
  div.sidebar
    ul
      li(v-for='(title, i) in titles' :index='i')
          i(:class="`fas fa-${title.icon}`")
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    titles() {
      return ['pencil-alt', 'wallet', 'mug-hot', 'clock']
// 'info', 'wallet', 'money-check', 'mug-hot', 'toggle-on', 'toggle-off'
    }
  }
}
</script>

<style lang="scss">
@import '../sass/sidebar.scss'
</style>