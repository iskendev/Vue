<template lang='pug'>
  div.navbar
    h1.navbar-title intelli-crm 
      i.fas.fa-power-off
    div.navbar-items
      ul
        li(v-for='(icon, i) in icons' :index='i')
          i(:class="`fas fa-${icon}`")
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    icons() {
      return ['info', 'toggle-on', 'user'] // info: weather, currency, date & time
    }
  }
}
</script>

<style lang="scss">
@import '../sass/_navbar.scss'
</style>