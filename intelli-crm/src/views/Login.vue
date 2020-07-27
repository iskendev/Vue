<template lang='pug'>
  div.login
    form.login-form(@submit.prevent='signIn()')
      FormInputs(:name='name', :email='email', :password='password', :isRegistered='isRegistered')
      div.login-form__btn
        button {{ isRegistered ? 'Sign In' : 'Register' }}
        span(v-if='isRegistered' @click='checkIsRegistered("sign")') or Register
        span(v-else @click='checkIsRegistered("reg")') or Sign In
</template>

<script>
import { authHandler } from '../composable/views/auth'
import FormInputs from '../components/FormInputs'
export default ({
  name: 'Login',
  components: { FormInputs },
  setup(_, { root: { $store, $router } }) {
    const { signIn, isRegistered, checkIsRegistered, name, email, password } = authHandler($store, $router)
    return { signIn, isRegistered, checkIsRegistered,  name, email, password }
  }
})
</script>

<style lang="scss">
@import '../sass/views/_login.scss';
</style>
