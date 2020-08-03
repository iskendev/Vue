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
      div.time-tracker__projects(v-else)
        div.time-tracker__projects-email
          span {{ clockifyData.info.email }}
        div.time-tracker__projects-description
          div.time-tracker__projects-description__single(v-for='project in clockifyData.projects')
            span.single-title(
              :class='{highlight_title: project.name === projectName}'
              @click='setProjectName(project.name)') {{ project.name }}
        ul.time-tracker__projects-entry(v-for='project in clockifyData.projects')
          li(v-for='entry in project.entries')
            div.entry-wrapper(v-if='project.name === projectName')
              div
                i.fas.fa-lock(v-if='entry.isLocked')
                span.description {{ entry.description }}
              div
                i.fas.fa-dollar-sign(:title='entry.billable ? tags : "Not Billable"' :class='entry.billable ? "dollar_billable" : "dollar_not_billable"')
                  //- div.tooltip
                //- span.tooltiptext {{  }}
                //- div.tooltip(v-if='entry.tagIds !== null')
                //-   i.fas.fa-tag
                //-   span.tooltiptext tags tags tags
                //- div.tooltip
                //-   i.far.fa-stop-circle
                //-   i.far.fa-play-circle
                //-   span.tooltiptext {{ }}
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
    const projectName = ref('belliata.com')

    const assignUserClockifyKey = () => {
      if (clockifyKey.value) {
        $store.dispatch('assignUserClockifyKey', clockifyKey.value)
        loading.value = true
      }
    }

    const tags = ref(['one', 'two', 'three'])

    const setProjectName = (name) => {
      projectName.value = name
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
      console.log(clockifyData.value);
    })

    onMounted(async () => {
      if (userInfo.value.clockifyKey)
        loading.value = false
    })

    return { clockifyKey, clockifyData, userInfo, assignUserClockifyKey, loading, projectName, setProjectName, tags }
  }
}
</script>

<style lang="scss">
@import '../sass/views/_clockify.scss'
</style>
