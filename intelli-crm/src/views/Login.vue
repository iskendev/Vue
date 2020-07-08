<template lang='pug'>
  div.login
    form.login-form(@submit.prevent='signIn()')
      div.login-form__input
        //- // TODO create universal component for common use // Validation
        div.login-form__input--label-name(v-if='!isRegistered')
          label(for='name') Name
          i.fas.fa-user
        input(id='name' type='text' v-model='name' v-if='!isRegistered')
        div.login-form__input--label-icon
          label(for='email') E-mail
          i.fas.fa-envelope
        input(id='email' v-model='email' type='email')
        div.login-form__input--label-password
          label(for='password') Password
          i.fas.fa-lock
        input(id='password' type='password' v-model='password')
      div.login-form__btn
        button {{ isRegistered ? 'Sign In' : 'Register' }}
        span(v-if='isRegistered' @click='checkIsRegistered("sign")') or Register
        span(v-else @click='checkIsRegistered("reg")') or Sign In
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent ({
  name: 'Login',
  setup(_, { root: {$store, $router } }) {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const isRegistered = ref(true)
    const signIn = async () => {
      if (isRegistered.value) {
        try {
          await $store.dispatch('signIn', {
            email: email.value, 
            password: password.value 
          })
          $router.push('/')
        } catch (e) {}
      } else {
        try {
          await $store.dispatch('register', { 
            name: name.value, 
            email: email.value, 
            password: password.value 
          })
          $router.push('/')
        } catch (e) {}
      }
    }
    const checkIsRegistered = (type: string) => {
      type === 'sign' ? isRegistered.value = false : isRegistered.value = true      
    }
    return { name, email, password, signIn, isRegistered, checkIsRegistered }
  }
})
</script>

<style lang="scss">
@import '../sass/view/_login.scss';
</style>
