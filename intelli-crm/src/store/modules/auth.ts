import firebase  from 'firebase/app'
import Vue from 'vue'
export default {
  state: {
    isLoggedIn: false,
    userInfo: {}
  },
  getters: {
    isLoggedIn: (state: any) => state.isLoggedIn,
    userInfo: (state: any) => state.userInfo
  },
  mutations: {
    setUserAuth(state: any, payload: any) {
      payload === 'in' ? state.isLoggedIn = true: state.isLoggedIn = false
    },
    setUserInfo(state: any, info: any) {
      state.userInfo = info
    },
    clearUserInfo(state: any) {
      state.userInfo = {}
    },
    errorHandler(state: any, e: any) {
      Vue.$toast.open({
        message: e.message,
        type: 'error'
      })
    }
  },
  actions: {
    async register({ commit, dispatch }: any, { name, email, password }: any) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({ name, email })
        commit('setUserAuth', 'in')
      } catch (e) {
        commit('errorHandler', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async getUserInfo({ dispatch, commit }: any) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setUserInfo', info)
      } catch (e) { 
        commit('errorHandler', e)
        throw e
      }
    },
    async signIn({ commit, dispatch }: any, { email, password }: any) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('getUserInfo')
        commit('setUserAuth', 'in')
      } catch (e) {
        commit('errorHandler', e)
        throw e
      }
    },
    async signOut({ commit }: any) {
      await firebase.auth().signOut()
      commit('setUserAuth', 'out')
    }
  }
}