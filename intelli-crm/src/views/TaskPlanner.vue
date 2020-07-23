<template lang='pug'>
  div.task-planner(:style="{ backgroundImage: image }")
    task-modal(v-if='showModal' @close="addBoard_editTask()")
      h3(slot="header") {{ modalHeader === 'board' ? 'Type board title' : 'Edit task' }}
      input.modal-body__input(slot='body' v-model='editableTask.task.name' @keyup.enter='addBoard_editTask()')
    div.task-planner__add-board
      i(@click='openModal_addBoard()').fas.fa-plus
      ul
        li(v-for="(option, i) in backgroundOptions"
          :key="i"
          :class='{ underlined: option.path === image }'
          @click='image = option.path')  {{ option.num }}
    Boards
</template>

<script>
import TaskModal from '../components/TaskModal.vue'
import Boards from '../components/Boards.vue'
import taskPlannerHandlers from '../composable/views/task-planner.js'

export default ({
  name: 'TaskPlanner',
  components: {
     TaskModal, Boards
  },
  setup(_, { root: { $store } }) {

    const {
      showModal,
      modalHeader,
      editableTask,
      addBoard_editTask,
      openModal_addBoard,
      fetchBoards,
      backgroundOptions,
      image
    } = taskPlannerHandlers($store)

    fetchBoards()

    return {
      showModal,
      modalHeader,
      editableTask,
      openModal_addBoard,
      fetchBoards,
      addBoard_editTask,
      backgroundOptions,
      image
    }
  },
})
</script>

<style lang="scss">
@import '../sass/views/_task-planner.scss';
</style>
