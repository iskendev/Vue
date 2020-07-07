<template lang='pug'>
  div.login
    form.login-form(@submit.prevent='signIn()')
      div.login-form__input
        div.login-form__input--label-icon
          label(for='email') E-mail
          i.fas.fa-envelope
        input(id='email' v-model='email' type='email')
        div.login-form__input--label-password
          label(for='password') Password
          i.fas.fa-lock
        input(id='password' type='password' v-model='password')
      div.login-form__btn
        button Sign In
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from '@vue/composition-api'
import { useStore } from '../composable/use-store'

export default defineComponent ({
  name: 'Login',
  setup() {
    const store = useStore()
    const email = ref('')
    const password = ref('')

    const signIn = () => {
      store.dispatch('signIn', { email: email.value, password: password.value })
    }

    return { email, password, signIn }
  }
  
})
</script>

<style lang="scss">
@import '../sass/view/_login.scss';
</style>
