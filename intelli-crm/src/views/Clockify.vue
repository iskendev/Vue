<template lang='pug'>
  div.time-tracker
    Loader(v-if='loading')
    div(v-else)
      form.time-tracker--form-wrapper(v-if='!userInfo.clockifyKey && !clockifyData' @submit.prevent='assignUserClockifyKey()')
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
    const clockifyData = computed(() => $store.getters.clockifyData)
    const userInfo = computed(() => $store.getters.userInfo)
    const loading = ref(true)
    const clockifyKey = ref('')

    const assignUserClockifyKey = () => {
      if (clockifyKey.value) {
        $store.dispatch('assignUserClockifyKey', clockifyKey.value)
        loading.value = true
      }
    }

    watch(userInfo, async () => {
      if (userInfo.value.clockifyKey) {
        await $store.dispatch('getUserData', userInfo.value.clockifyKey)
        loading.value = false
      } else {
        loading.value = false
      }
    })

    watch(clockifyData, () => {
      loading.value = false
    })

    onMounted(async () => {
      if (userInfo.value.clockifyKey)
        loading.value = false
    })

    return { clockifyKey, clockifyData, userInfo, assignUserClockifyKey, loading }
  }
}
</script>

<style lang="scss">
@import '../sass/views/_time-tracker.scss'
</style>
