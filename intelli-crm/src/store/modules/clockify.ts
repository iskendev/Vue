// import { axiosClockify } from './../../utils/axios';
import firebase from 'firebase/app'
import axios from 'axios'

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

        response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/user/${userData.info.id}/time-entries?consider-duration-format=true`)
        const tags = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/tags`)

        commit('sortEntriesByProject', {userData, response, tags: tags.data})
        commit('sortTagsByEntries', userData)
        commit('setUserData', userData)

      } catch (e) { commit('errorHandler', e) }
    }
  },
}

export default clockify