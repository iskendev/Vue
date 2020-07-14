<template lang='pug'>
  div.login
    form.login-form(@submit.prevent='signIn()')
      div.login-form__input
        //- // TODO create universal component for common use // Validation
        div.login-form__input--label-name(v-if='!isRegistered')
          label(for='name') Name
          i.fas.fa-user
        input(id='name' type='text' v-model='name' v-if='!isRegistered' required)
        div.login-form__input--label-icon
          label(for='email') E-mail
          i.fas.fa-envelope
        input(id='email' v-model='email' type='email' required)
        div.login-form__input--label-password
          label(for='password') Password
          i.fas.fa-lock
        input(id='password' type='password' v-model='password' required)
      div.login-form__btn
        button {{ isRegistered ? 'Sign In' : 'Register' }}
        span(v-if='isRegistered' @click='checkIsRegistered("sign")') or Register
        span(v-else @click='checkIsRegistered("reg")') or Sign In
</template>

<script>
import { authHandler } from '../composable/views/auth'
export default ({
  name: 'Login',
  setup(_, { root: { $store, $router } }) {
    const { name, email, password, signIn, isRegistered, checkIsRegistered } = authHandler($store, $router)
    return { name, email, password, signIn, isRegistered, checkIsRegistered }
  }
})
</script>

<style lang="scss">
@import '../sass/views/_login.scss';
</style>
