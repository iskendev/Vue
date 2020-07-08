import firebase  from 'firebase/app'
export default {
  state: {
    isLoggedIn: false
  },
  getters: {
    isLoggedIn: (state: any) => state.isLoggedIn 
  },
  mutations: {
    setUserAuth(state: any, payload: any) {
      payload === 'in' ? state.isLoggedIn = true: state.isLoggedIn = false
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
        console.log(e)
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async signIn({ commit }: any, { email, password }: any) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUserAuth', 'in')
      } catch (e) {
        console.log(e)
      }
    },
    async signOut({ commit }: any) {
      await firebase.auth().signOut()
      commit('setUserAuth', 'out')
    }
  }
}