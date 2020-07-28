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
    clockifyData: null,
    userClockifyKey: null
  },
  getters: {
    clockifyData: (state:any) => state.clockifyData,
    userClockifyKey: (state:any) => state.userClockifyKey
  },
  mutations: {
    setUserData(state: any, payload: any ) {
      state.clockifyData = payload
      console.log('hey', state.clockifyData);

    },
    setClockifyKey(state: any, payload: any) {
      state.userClockifyKey = payload
      console.log('test', state.userClockifyKey)
    }
  },
  actions: {
    async assignUserClockifyKey({dispatch, commit}:any, payload: any) {

      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`users/${uid}/info`)
          .update({ clockifyKey: payload })

        commit('setClockifyKey', payload)
        await dispatch('getUserData', payload)


        // let userData: any = {}
        // axiosClockify.defaults.headers['X-Api-Key'] = payload
        // let response: any
        // response = await axiosClockify.get('/user')
        // userData.info = response.data

        // response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/projects`)
        // userData.projects = response.data.map((project: any) => ({...project, entries: []}))

        // response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/user/${userData.info.id}/time-entries`)

        // userData.projects.map((project: any) => {
        //   response.data.forEach((entry: any) => {
        //     if (project.id === entry.projectId)
        //       project.entries.push(entry)
        //   })
        // })

        // console.log(userData.projects);
        // const workspaceID = userData.info.defaultWorkspace
        // const groups = await axiosClockify.get(`/workspaces/${workspaceID}/user/5e86305249d1693a9266b96b/time-entries`)
        // const groups = await axiosClockify.get(`/workspaces/${workspaceID}/time-entries/5e862663fbe9b56304188d44`)
        // console.log(groups.data);

        // console.log(clockifyUserInfo.data.defaultWorkspace);

        // const uid = await dispatch('getUid')
        // await firebase.database()
        //   .ref(`users/${uid}/info`)
        //   .update({ clockifyKey: payload })

        // commit('setUsersClockifyKey', userInfo)
          // .then(res => {
            // if (res.status === 200) {
              // console.log('kkkk');
            // }
          // })
        // .then(res => {
        //   if (res.status === 200) {

        //   }
        // }).catch(e => {
        //   axiosClockify.defaults.headers['X-Api-Key'] = ''
        // })

        // const uid = await dispatch('getUid')
        // const res = await firebase.database()
        //   .ref(`users/${uid}/info`)
        //   .update({ clockifyKey: payload })
          // .then(response => {
          //   console.log(response);
          // })
        // console.log(res);

      } catch (e) {
        commit('errorHandler', e)
        throw e
      }
    },
    async getUserData({ commit, state }: any, payload: any) {
      if (state.userClockifyKey !== null) {
        axiosClockify.defaults.headers['X-Api-Key'] = state.userClockifyKey
      } else {
        axiosClockify.defaults.headers['X-Api-Key'] = payload
      }

      let userData: any = {}
      let response: any

      try {
        response = await axiosClockify.get('/user')
        userData.info = response.data

        response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/projects`)
        userData.projects = response.data.map((project: any) => ({...project, entries: []}))

        response = await axiosClockify.get(`/workspaces/${userData.info.defaultWorkspace}/user/${userData.info.id}/time-entries`)

        userData.projects.map((project: any) => {
          response.data.forEach((entry: any) => {
            if (project.id === entry.projectId)
              project.entries.push(entry)
          })
        })
        commit('setUserData', userData)
      } catch (e) { commit('errorHandler', e) }
    }
  },
}

export default clockify