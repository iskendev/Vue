<template lang='pug'>
  div.time-tracker(:class='{center_form: !loading}')
    Loader(v-if='loading')
    div(v-else)
      // TODO must be with !
      form(v-if='!userInfo.clockifyKey && !clockifyData' @submit.prevent='assignUserClockifyKey()')
        div.time-tracker__field-wrapper
          Input(
            type='text'
            cssClass='time-tracker-input'
            v-model='clockifyKey'
            label='Enter the generated key')
          button Submit
      div(v-else)
        span JJJJJ
</template>

<script>
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import { axiosClockify } from '../utils/axios'
import Input from '../components/Input'
import Loader from '../components/Loader'
export default {
  name: '',
  components: { Input, Loader },
  setup(_, { root: { $store } }) {

    // const clockifyKeyVuex = computed(() => $store.getters.userInfo.clockifyKey)
    const clockifyData = computed(() => $store.getters.clockifyData)
    const clockifyKeyVuex = computed(() => $store.getters.userClockifyKey)
    const userInfo = computed(() => $store.getters.userInfo)
    const loading = ref(true)
    const clockifyKey = ref('')

    const assignUserClockifyKey = () => {
      if (clockifyKey.value) {
        $store.dispatch('assignUserClockifyKey', clockifyKey.value)
        loading.value = true
      }
    }

    watch(userInfo, () => {
      loading.value = false
    })

    watch(clockifyData, () => {
      loading.value = false
    })

    onMounted(() => {
      // if (clockifyKeyVuex.value !== null) {
      //   $store.dispatch('getUserData')
      // }
      // console.log(userInfo.value)
    })

    return { clockifyKey, clockifyKeyVuex, clockifyData, userInfo, assignUserClockifyKey, loading }
  }
}
</script>

<style lang="scss">
@import '../sass/views/_time-tracker.scss'
</style>
