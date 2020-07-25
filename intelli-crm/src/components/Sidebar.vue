<template lang='pug'>
  div.sidebar(v-if='sidebarVisibility' :class='{ light: theme === "light" }')
    ul
      router-link(v-for='(title, i) in titles'
        :key='i'
        :to='title.path'
        v-slot="{ href, route, navigate, isActive, isExactActive }"
        exact)
        li(@click="navigate"
          :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']")
          a(:href="href")
            i(:class="`fas fa-${title.icon}`")
            span {{ title.title }}
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'Navbar',
  setup(_, {root: {$store}}) {
    const titles = computed(() => [
        { title: 'Home', icon: 'home', path: '/' },
        { title: 'Time tracker', icon: 'clock', path: '/time-tracker'},
        { title: 'Todo', icon: 'pencil-alt', path: '/todo'},
        { title: 'Chat', icon: 'comment-dots', path: '/chat'},
        { title: 'Code Snippets', icon: 'code', path: '/code-snippets'},
        { title: 'Calendar Notes', icon: 'calendar-alt', path: '/calendar-notes'},
        { title: 'Expense Tracker', icon: 'wallet', path: '/expense-tracker'},
        { title: 'Relaxer', icon: 'mug-hot', path: '/relaxer'},
        { title: 'Charts', icon: 'chart-bar', path: '/charts'},
        { title: 'Settings', icon: 'wrench', path: '/settings'},
    ])
    const sidebarVisibility = computed(() => $store.getters.sidebarVisibility)
    const theme = computed(() => $store.getters.theme)

    return { titles, sidebarVisibility, theme }
  }
}
</script>

<style lang="scss">
@import '../sass/components/_sidebar.scss';
</style>
