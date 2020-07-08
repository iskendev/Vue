<template lang='pug'>
  div#app
    Navbar
    div.main
      Sidebar(v-if='isLoggedIn')
      router-view.view
</template>

<script>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { provideStore, useStore } from './composable/use-store'
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
    onMounted(() => {
      const user = firebase.auth().currentUser
      if (user) {
        $store.commit('setUserAuth', 'in')
      } else {
        $store.commit('setUserAuth', 'out')
        $router.push('/login').catch(() => {})
      }
    })
    return { isLoggedIn }
  }
}
</script>

<style lang="scss">
@import './sass/_app.scss';
</style>