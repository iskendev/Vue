import firebase  from 'firebase/app'
export default {
  state: {
    isLoggedIn: false
  },
  getters: {
    isLoggedIn: (state: any) => state.isLoggedIn
  },
  mutations: {
    setUserLoggedIn(state: any) {
      state.isLoggedIn = true
    }
  },
  actions: {
    async signIn(context: any, payload: any) {
      const { dispatch, commit } = context
      const { email, password } = payload
      // try {
      //   await firebase.auth().signInWithEmailAndPassword(email, password)
      //   commit('setUserLoggedIn')
      // } catch (e) {
      //   console.log(e)
      // }
      console.log(context, payload );
      
    },
    async signOut() {
      await firebase.auth().signOut()
    }
  }
}