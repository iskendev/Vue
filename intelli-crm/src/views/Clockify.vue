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
          div.time-tracker__projects-description__single(v-for='name in clockifyDataProjects')
            span.single-title(
              :class='{highlight_title: name === projectTitle}'
              @click='setProjectName(name)') {{ name }}
        ul.time-tracker__projects-entry(v-for='project in clockifyData.projects')
          li(v-if='project.name === projectTitle' v-for='(date, iDate) in project.dates' :key='iDate')
            div.entry-date-time
              div.entry-date-time__date
                span.entry-date-time__date--date {{ date.date }}
                span.entry-date-time__date--length(@click='date.isVisible = !date.isVisible') {{ date.entries.length }}
              span Total: {{ date.total }}
            div(v-if='date.isVisible')
              div.entry-wrapper(v-for='(entry, iEntry) in date.entries' :key='iEntry')
                div.entry-info
                  div.entry-info__title
                    i.fas.fa-lock(v-if='entry.isLocked')
                    span.description(v-if='!entry.isInputVisible' @click='entry.isInputVisible = true') {{ entry.description }}:
                    input(v-else  v-model='entry.description')
                    span.client-name {{ entry.clientName }}
                  div.entry-info__details
                    div.entry-tags(v-if='entry.tagIds === null || !entry.tagIds.length' title="No tags")
                      i.fas.fa-tag
                    div.entry-tags(v-else)
                      span.tags(v-for='tag in entry.tagTitles') {{ tag | cutExtraWords(entry.tagTitles) }}
                      span.dots ...
                    div
                      i.fas.fa-dollar-sign(
                      :title='project.billable ? "Billable" : "Non-billable"'
                      :class='project.billable ? "dollar_billable" : "dollar_not_billable"')
                    div.entry-start-end
                      span(@click='openTimeBlock(project.name, iDate, iEntry, entry.timeInterval.start, "start")') {{ entry.timeInterval.start | date('time') }} -
                      span(@click='openTimeBlock(project.name, iDate, iEntry, entry.timeInterval.end, "end")') {{ entry.timeInterval.end | date('time') }}
                      i.far.fa-calendar-alt
                      Clockify_TimeBlock(v-if="entry.isTimeBlockVisible"
                        :timeBlockValue='timeBlockValue'
                        :timeBlockPeriod='timeBlockPeriod')
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
import Clockify_TimeBlock from '../components/Clockify_TimeBlock'
import { dateTime } from '../filters/dateTime'
export default {
  name: '',
  components: { Input, Loader, Clockify_TimeBlock },
  setup(_, { root: { $store } }) {
    const clockifyData = computed(() => $store.getters.clockifyData)
    const userInfo = computed(() => $store.getters.userInfo)
    const loading = ref(true)
    const clockifyKey = ref('')
    const projectTitle = ref('')

    const clockifyDataProjects = computed(() => {
      let projectWithEntries = []
      if (clockifyData.value) {
        clockifyData.value.projects.forEach(project => {

          if (project.dates.length > 0) {
            projectWithEntries.push(project.name)
          }
        })
      }
      return projectWithEntries
    })

    const assignUserClockifyKey = () => {
      if (clockifyKey.value) {
        $store.dispatch('assignUserClockifyKey', clockifyKey.value)
        loading.value = true
      }
    }

    // Setting a project name
    const setProjectName = (name) => {
      projectTitle.value = name
    }

    const filterProjectsByEntriesLength = (projects) => {
      let projectsLengthArr = [];
      projects.forEach(project => {
        if (project.dates.length) {
          projectsLengthArr.push(project.dates.length)
        }
      })
      return projectsLengthArr
    }

    const setProjectWithMaxEntries = (projects, projectsLengthArr) => {
        let max = Math.max.apply(null, projectsLengthArr)
        projects.filter(project => {
          if (project.dates.length == max)
            projectTitle.value = project.name
        })
    }

    const projectNameHandlers = () => {
      if (clockifyData.value) {
        filterProjectsByEntriesLength(clockifyData.value.projects)

        const projectsLengthArr = filterProjectsByEntriesLength(clockifyData.value.projects)
        setProjectWithMaxEntries(clockifyData.value.projects, projectsLengthArr)
      }
    }

    // time block
    const timeBlockValue = ref('')
    // const timeBlockEnd = ref('')
    const timeBlockPeriod = ref('')

    const openTimeBlock = (projectName, iDate, iEntry, time, period) => {
      $store.commit('openTimeBlock', {projectName, iDate, iEntry})
      timeBlockPeriod.value = period
      timeBlockValue.value = dateTime(time, 'time')
    }

    // watchers
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
      projectNameHandlers()
      console.log(clockifyData.value);
    })

    onMounted(async () => {
      if (userInfo.value.clockifyKey) {
        loading.value = false
      }
      projectNameHandlers()
    })

    return {
      clockifyKey,
      clockifyData,
      userInfo,
      assignUserClockifyKey,
      loading,
      projectTitle,
      setProjectName,
      clockifyDataProjects,
      filterProjectsByEntriesLength,
      setProjectWithMaxEntries,
      openTimeBlock,
      timeBlockValue,
      timeBlockPeriod
    }
  }
}
</script>

<style lang="scss">
@import '../sass/views/_clockify.scss';
</style>
