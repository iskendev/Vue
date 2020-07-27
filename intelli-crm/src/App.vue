<template lang='pug'>
  div#app(:class='{light: theme === "light"}')
    Navbar
    div.main.split_place(:class="{ full_width: !isLoggedIn }")
      Sidebar(v-if='isLoggedIn')
      router-view.view
</template>

<script>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { provideStore } from './composable/use-store.js'
import { onMounted, computed, ref } from '@vue/composition-api'
import firebase  from 'firebase/app'

export default {
  name: 'App',
  components: {
    Navbar, Sidebar
  },
  setup(props, { root: { $store, $router } }) {
    provideStore($store)
    const isLoggedIn = computed(() => $store.getters.isLoggedIn)
    const userInfo = computed(() => $store.getters.userInfo)
    const theme = computed(() => $store.getters.theme)
    const sidebarVisibility = computed(() => $store.getters.sidebarVisibility)

    onMounted(async () => {
      const user = firebase.auth().currentUser
      if (user) {
        $store.commit('setUserAuth', 'in')
        await $store.dispatch('getUserInfo')
      } else {
        $store.commit('setUserAuth', 'out')
        $router.push('/login').catch(() => {})
      }
    })
    return { isLoggedIn, userInfo, theme, sidebarVisibility }
  }
}
</script>

<style lang="scss">
@import './sass/app.scss';
</style>