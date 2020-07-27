import { ref, computed } from '@vue/composition-api'

export function authHandler(store, router) {
  // in
  const email = ref('')
  const password = ref('')
  const name = ref('')
  const isRegistered = ref(true)
  const isLoading = ref(false)

  const signIn = async () => {

    if (isRegistered.value) {
      try {
        isLoading.value = true
        await store.dispatch('signIn', {
          email: email.value,
          password: password.value
        })
        isLoading.value = false
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


  return { name, email, password, signIn, isRegistered, checkIsRegistered, isLoggedIn, logOut, userName, isLoading }
}

