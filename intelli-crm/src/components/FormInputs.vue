<template lang='pug'>
  //- div.login-form__input
  //-   InputField(
  //-     v-for='(info, i) in inputData'
  //-     :key='i'
  //-     :classs='info.classs'
  //-     :isVisible='info.isVisible'
  //-     :title='info.title'
  //-     :icon='info.icon'
  //-     :field='info.field'
  //-     :model='info.model'
  //-     :type='info.type')
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
</template>

<script>
// import { ref, customRef } from '@vue/composition-api'
import { authHandler } from '../composable/views/auth'
// import InputField from './InputField'

export default {
  name: 'FormInputs',
  // props: ['name', 'email', 'password', 'isRegistered'],
  props: ['isRegistered'],
  // components: { InputField },
  setup(_, { root: { $store, $router } }) {
    // const nameField = ref({ classs: 'name', title: 'Name', icon: 'user', field: 'name', type: 'text' })
    // const emailField = ref({ classs: 'icon', title: 'E-mail', icon: 'envelope', field: 'e-mail', type: 'email' })
    // const passwordField = ref({ classs: 'password', title: 'Password', icon: 'lock', field: 'password', type: 'password' })

    // const localName = props.name
    // const localEmail = props.email
    // const localPassword = props.password
    const { name, email, password } = authHandler($store, $router)

    return { name, email, password }
  }
}
</script>