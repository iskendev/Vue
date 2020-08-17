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
              div.entry-date
                span Today
                span Total: 6:15
              div.entry-info
                div.entry-info__title
                  i.fas.fa-lock(v-if='entry.isLocked')
                  span.description {{ entry.description }}:
                  span.client-name {{ entry.clientName }}
                div.entry-info__details
                  div.entry-tags(v-if='entry.tagIds === null' title="No tags")
                    i.fas.fa-tag
                  div.entry-tags(v-else)
                    span.tags(v-for='tag in entry.tagTitles') {{ tag | cutExtraWords(entry.tagTitles) }}
                    span.dots ...
                  div
                    i.fas.fa-dollar-sign(
                    :title='entry.billable ? "Billable" : "Non-billable"'
                    :class='entry.billable ? "dollar_billable" : "dollar_not_billable"')
                  div.entry-start-end
                    span {{ entry.timeInterval.start | date('time') }} - {{ entry.timeInterval.end | date('time') }}
                    i.far.fa-calendar-alt
                  div
                    span {{ entry.timeInterval.duration | iso-duration }}
                  div
                    i.far.fa-play-circle
                  div
                    i.fas.fa-ellipsis-h
</template>

<script>
import { ref, computed, onMounted, watch } from '@vue/composition-api'
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
@import '../sass/views/_clockify.scss';
</style>
