<template lang='pug'>
  div.time-block
    input
    div.time-block__time
      div.time-block__time--hours
        span(v-for='hour in hours') {{ hour }}
      div.time-block__time--minutes
        span(v-for='minute in minutes') {{ minute }}
      div.time-block__time--period
        span AM
        span PM
</template>

<script>
  import { computed } from '@vue/composition-api'
  export default {
    name: 'Clockify_TimeBlock',
    setup(_, { root: { $store } }) {
      const hours = computed(() => {
        return [...Array(24).keys()].unshift()
      })

      const minutes = computed(() => {
        return [...Array(59).keys()].unshift()
      })

      return { hours, minutes }
    }
  }
</script>

<style lang="scss">
  @import '../sass/components/clockify-time-block.scss';
</style>