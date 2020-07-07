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
import { onMounted, computed } from '@vue/composition-api'
export default {
  name: 'App',
  components: {
    Navbar, Sidebar
  },
  setup(props, { root: { $store, $router } }) {
    provideStore($store)
    const store = useStore()
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    onMounted(() => {
      if (!isLoggedIn.value) {
        $router.push('/login')
      }      
    })

    return { isLoggedIn }
  }
}
</script>

<style lang="scss">
@import './sass/_app.scss';
</style>