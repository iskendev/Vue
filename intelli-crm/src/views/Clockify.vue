<template lang='pug'>
  div.time-tracker
    Loader(v-if='loading')
    div(v-else)
      // TODO must be with !
      form(v-if='userInfo.clockifyKey' @submit.prevent='assignUserClockifyKey()')
        div.time-tracker__field-wrapper
          Input(
            type='text'
            cssClass='time-tracker-input'
            v-model='clockifyKey'
            label='Enter generated key')
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

    const assignUserClockifyKey = () => {
      if (clockifyKey.value) {
        $store.dispatch('assignUserClockifyKey', clockifyKey.value)
      }
    }
    const userInfo = computed(() => $store.getters.userInfo)
    const loading = ref(true)
    const clockifyKey = ref('')

    watch(userInfo, () => {
      loading.value = false
    })

    // onMounted(() => {
      // axiosClockify.get('/workspaces/5e8395d5261ba37dee85a378/projects')
        // .then(function (response) {
          // console.log(response);
        // })
      //  console.log(isKey.value.email);
    // })
    // const log = () => {
      // console.log(clockifyKey.value);
    // }

    return { clockifyKey, userInfo, assignUserClockifyKey, loading }
  }
}
</script>

<style lang="scss">
@import '../sass/views/_time-tracker.scss'
</style>
