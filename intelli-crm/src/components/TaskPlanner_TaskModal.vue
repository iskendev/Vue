<template lang='pug'>
  div.task-modal
    transition(name='modal')
        div.modal-mask
          div.modal-wrapper
            div.modal-container
              div.modal-header
                slot(name='header')

              div.modal-body
                slot(name='body')

              div.modal-footer
                slot(name='footer')
                  button.modal-default-button(@click="$emit('close')") OK
</template>
<script>
export default {
  name: 'TaskPlanner_TaskModal'
}
</script>
<style lang="scss">
  @import '../sass/components/_task-modal.scss';
</style>