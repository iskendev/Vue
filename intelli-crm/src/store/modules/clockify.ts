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
    clockifyData: (state:any) => state.clockifyData
  },
  mutations: {
    setUserData(state: any, payload: any ) {
      state.clockifyData = payload
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

        console.log('entries res', response);


        userData.projects.map((project: any) => {
          response.data.forEach((entry: any) => {
            if (project.id === entry.projectId)
              project.entries.push({...entry, clientName: project.clientName})
          })
        })
        commit('setUserData', userData)
      } catch (e) { commit('errorHandler', e) }
    }
  },
}

export default clockify