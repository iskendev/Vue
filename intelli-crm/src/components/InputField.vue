<template lang='pug'>
  div.login-form__input
    div(class=`login-form__input--label-${classs}` v-if='isVisible')
      label(for=`${field}`) {{ title }}
      i(class=`fas fa-${icon}`)
    input(id=`${field}` type=`${type}` v-model='model' v-if='isVisible' required)
</template>

<script>
  export default {
    name: 'InputField',
    props: ['classs', 'isVisible', 'title', 'icon', 'field', 'model', 'type']
  }
</script>