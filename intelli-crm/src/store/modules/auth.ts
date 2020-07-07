import firebase  from 'firebase/app'
export default {
  state: {
    isLoggedIn: true
  },
  getters: {
    isLoggedIn: (state: any) => state.isLoggedIn
  },
  mutations: {
     
  },
  actions: {
    async signIn(context: any, payload: any) {
      const { dispatch, commit } = context
      const { email, password } = payload
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {

      }
    }
  }
}