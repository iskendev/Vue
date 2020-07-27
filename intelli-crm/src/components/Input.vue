<template lang='pug'>
  div(:class='cssClass')
    label {{ label }}
    input(
      :type='type'
      @input='$emit("input", $event.target.value)')
</template>

<script>
  export default {
    name: 'Input',
    props: [
      'type',
      'label',
      'value',
      'cssClass'
    ]
  }
</script>

<style lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
}
</style>