import firebase from 'firebase/app'
import axios from 'axios'
import { dateTime } from '../../filters/dateTime'

const axiosClockify = axios.create({
  baseURL: 'https://api.clockify.me/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': ''
  }
})

const clockify = {
  state: {
    clockifyData: null
  },
  getters: {
    clockifyData: (state:any) => state.clockifyData,
  },
  mutations: {
    setUserData(state: any, payload: any) {
      console.log(payload);
      state.clockifyData = payload
    },
    sortEntriesByProject(state: any, { userData, response, tags }: any) {
      userData.projects.map((project: any) => {
        response.data.forEach((entry: any) => {
          if (project.id === entry.projectId) {
            project.entries.push({...entry, clientName: project.clientName, tags, tagTitles: []})
          }
        })
      })
    },
    sortTagsByEntries(state: any, payload: any) {
      let projects = payload.projects
      projects.forEach((project: any) => {
        if (project.entries) {
          project.entries.forEach((entry: any) => {
            entry.tags.forEach((tag: any) => {
              if (entry.tagIds) {
                entry.tagIds.forEach((id: any) => {
                  if (tag.id === id) {
                    entry.tagTitles.push(tag.name)
                  }
                })
              }
            })
          })
        }
      })
    },
    sortByDate(state: any, payload: any) {
      console.log(payload);

      // let projects = payload.projects
      // projects.forEach((project: any) => {
      //   project.byDays = []
      //   if (project.entries) {
      //     project.entries.forEach((entry: any) => {
      //       let start = dateTime(entry.timeInterval.start, 'date')
      //       let end = dateTime(entry.timeInterval.end, 'date')
      //       let arrayOfDates = []
      //       let entryByDate = {}
      //       if (start == end) {
      //         project.byDays.push({start, end})
      //       }
      //       console.log(arrayOfDates.length);

      //       // project.entriesByDate = {  }
      //       console.log('start', start);
      //       console.log('end', end);
      //     })
      //   }

      //   console.log(project.byDays);

      // })
      // console.log(projects);

    }
  },
  actions: {
    async assignUserClockifyKey({dispatch, commit}:any, payload: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`users/${uid}/info`)
          .update({ clockifyKey: payload })
        await dispatch('getUserData', payload)
      } catch (e) {
        commit('errorHandler', e)
        throw e
      }
    },
    async getUserData({ commit }: any, payload: any) {
      axiosClockify.defaults.headers['X-Api-Key'] = payload

      let userData: any = {}
      let response: any

      try {
        response = await axiosClockify.get('/user')
        userData.info = response.data

        response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/projects`)
        userData.projects = response.data.map((project: any) => ({...project, entries: []}))

        response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/user/${userData.info.id}/time-entries?description=#2038 - Products page using Vue`)
        console.log('hope', response);

        const tags = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/tags`)

        commit('sortEntriesByProject', {userData, response, tags: tags.data})
        commit('sortTagsByEntries', userData)
        commit('sortByDate', userData)
        commit('setUserData', userData)

      } catch (e) { commit('errorHandler', e) }
    }
  },
}

export default clockify