<template lang='pug'>
  div.time-block
    div.time-block__default(v-if='timeBlockValue')
      input(v-model='time')
    div.time-block__time
      div.time-block__time--hours
        span(v-for='hour in hours' @click='setTime(hour, "hours")') {{ hour }}
      div.time-block__time--minutes
        span(v-for='minute in minutes' @click='setTime(minute, "minutes")') {{ minute }}
      //- div.time-block__time--period
      //-   span.period(@click='setTime("AM", "period")') AM
      //-   span.period(@click='setTime("PM", "period")') PM
    div.time-block__apply
      button Apply
</template>

<script>
  import { computed, ref } from '@vue/composition-api'
  export default {
    name: 'Clockify_TimeBlock',
    props: ['timeBlockValue'],
    setup(props, { root: { $store } }) {
      const hours = computed(() => {
        return [...Array(23).keys()].unshift()
      })

      const minutes = computed(() => {
        return [...Array(59).keys()].unshift()
      })


      // set time
      const hour = ref('')
      const minute = ref('')
      const period = ref('')
      const time = computed(() => {
        return `${props.timeBlockValue}`
      })

      const setTime = (chosenTime, timeValue) => {
        if (timeValue === 'hours') {
          hour.value = chosenTime.toString().length < 2 ? '0' + chosenTime : chosenTime
        } else if (timeValue === 'minutes') {
          minute.value = chosenTime.toString().length < 2 ? '0' + chosenTime : chosenTime
        } else {
          period.value = chosenTime
        }
      }


      return { hours, minutes, hour, minute, period, time, setTime }
    }
  }
</script>

<style lang="scss">
  @import '../sass/components/clockify-time-block.scss';
</style>