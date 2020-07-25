<template lang='pug'>
  div#navbar.navbar(:class='{ light: theme === "light" }')
    h1.navbar-title(@click='toggleSidebarVisibility') intelli-crm
      i.fas.fa-power-off
    div.navbar-items(v-if='isLoggedIn')
      ul
        li
          span.date-time {{ date | date('datetime')}}
          i.fas.fa-moon(v-if='theme === "light"'  @click='toggleTheme("dark")')
          i.fas.fa-sun(v-if='theme === "dark"' @click='toggleTheme("light")')
          SmallLoader(v-if='loading')
          span(v-else) {{ userName }}
          div.tooltip <i class='fas fa-sign-in-alt' @click='logOut()'></i>
            span.tooltiptext Sign out
</template>

<script>
import { authHandler } from '../composable/views/auth'
import { navbarHandlers } from '../composable/components/navbar'
import { watch, ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import SmallLoader from '../components/SmallLoader'
export default ({
  name: 'Navbar',
  components: { SmallLoader },
  setup(_, { root: { $store, $router } }) {
    const { isLoggedIn, logOut, userName } = authHandler($store, $router)
    const { toggleSidebarVisibility, theme, toggleTheme } = navbarHandlers($store)
    let loading = ref(true)

    watch(userName, () => {
      if (userName)
        loading.value = false
    })

    let date = ref(new Date())
    let interval = ref(null)

    onMounted(() => {
      interval.value = setInterval(() => {
        date.value = new Date()
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(interval.value)
    })

    return { isLoggedIn, logOut, userName, toggleSidebarVisibility, theme, toggleTheme, loading, date, interval }
  }
})
</script>
<style lang="scss">
@import '../sass/components/_navbar.scss';
</style>