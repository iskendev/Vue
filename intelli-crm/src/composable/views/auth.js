import { ref, computed } from '@vue/composition-api'

export function authHandler(store, router) {
  // in
  const email = ref('')
  const password = ref('')
  const name = ref('')
  const isRegistered = ref(true)

  // const inputData = computed(() => ([
  //   { model: name.value, classs: 'name', isVisible: isRegistered.value, title: 'Name', icon: 'user', field: 'name', type: 'text' },
  //   { model: email.value, classs: 'icon', isVisible: true, title: 'E-mail', icon: 'envelope', field: 'e-mail', type: 'email' },
  //   { model: password.value, classs: 'password', isVisible: true, title: 'Password', icon: 'lock', field: 'password', type: 'password' },
  // ]))

  // let inputData = computed({
  //   get: () => [
  //     { model: name.value, classs: 'name', isVisible: isRegistered.value, title: 'Name', icon: 'user', field: 'name', type: 'text' },
  //     { model: email.value, classs: 'icon', isVisible: true, title: 'E-mail', icon: 'envelope', field: 'e-mail', type: 'email' },
  //     { model: password.value, classs: 'password', isVisible: true, title: 'Password', icon: 'lock', field: 'password', type: 'password' },
  //   ],
  //   set: (value) => value
  // })

  const signIn = async () => {
    if (isRegistered.value) {
      try {
        console.log(email.value);
        // await store.dispatch('signIn', {
        //   email: email.value,
        //   password: password.value
        // })
        router.push('/')
      } catch (e) {}
    } else {
      try {
        await store.dispatch('register', {
          name: name.value,
          email: email.value,
          password: password.value
        })
        router.push('/')
      } catch (e) {}
    }
  }
  const checkIsRegistered = (type) => {
    type === 'sign' ? isRegistered.value = false : isRegistered.value = true
  }

  // out
  const isLoggedIn = computed(() => store.getters.isLoggedIn)
  const userName = computed(() => store.getters.userInfo.name)
  const logOut = async () => {
    await store.dispatch('signOut')
    store.commit('clearUserInfo')
    router.push('/login')
  }


  return { name, email, password, signIn, isRegistered, checkIsRegistered, isLoggedIn, logOut, userName }
}

