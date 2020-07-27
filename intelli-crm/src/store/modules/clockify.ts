import firebase from 'firebase/app'
import axios from 'axios'
// import { axiosClockify } from './../../utils/axios'

const axiosClockify = axios.create({
  baseURL: 'https://api.clockify.me/api/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': ''
  }
})

const clockify = {
  state: {

  },
  getters: {},
  mutations: {},
  actions: {
    async assignUserClockifyKey({dispatch, commit}:any, payload: any) {
      try {
        axiosClockify.defaults.headers['X-Api-Key'] = payload
        const clockifyUserInfo = await axiosClockify.get('/user')
        console.log(clockifyUserInfo.data);

        const workspaceID = clockifyUserInfo.data.defaultWorkspace
        const groups = await axiosClockify.get(`/workspaces/${workspaceID}/projects`)
        // const groups = await axiosClockify.get(`/workspaces/${workspaceID}/time-entries/5e862663fbe9b56304188d44`)
        console.log(groups.data);

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
    }
  },
}

export default clockify