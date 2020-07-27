<template lang='pug'>
  div.login
    Loader(v-if='isLoading' :class='{ no_absolute: isLoading }')
    form.login-form(v-else @submit.prevent='signIn()')
      div.login-form__input
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
import Loader from '../components/Loader';
export default ({
  name: 'Login',
  components: {Loader},
  setup(_, { root: { $store, $router } }) {
    const { signIn, isRegistered, checkIsRegistered, name, email, password, isLoading } = authHandler($store, $router)
    return { signIn, isRegistered, checkIsRegistered,  name, email, password, isLoading }
  }
})
</script>

<style lang="scss">
@import '../sass/views/_login.scss';
</style>
