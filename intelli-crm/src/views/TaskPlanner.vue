<!-- // <template lang='pug'>
//   div.task-planner(:style="{ backgroundImage: image }")
//     task-modal(v-if='showModal' @close="editTask()")
//       h3(slot="header") {{ modalHeader === 'board' ? 'Type board title' : 'Edit task' }}
//       input.modal-body__input(slot='body' v-model='editableTask.task.name' @keyup.enter='editTask()')
//     div.task-planner__add-board
//       i(@click='addBoard()').fas.fa-plus
//       ul
//         li(v-for="(option, i) in backgroundOptions"
//           :key="i"
//           :class='{ underlined: option.path === image }'
//           @click='image = option.path')  {{ option.num }}
//     draggable.task-planner__list(v-model="columns" v-bind='dragOptionsBoards'  @start="start")
//       li.task-planner__list--item(v-for='(column, index) in columns' :key='index')
//         div.task-planner__list--item-edit
//           div.edit-board-title
//             span(v-if='!column.isTitleChanging') {{ column.name }}
//             input.edit-board-title__input(v-else v-model='column.name' @keyup.enter='DonechangeBoardTitleFunc(index, column.id)')
//           span
//             i.fas.fa-pencil-alt(v-if="!column.isTitleChanging" @click='changeBoardTitleFunc(index)')
//             i.fas.fa-check(v-else @click='DonechangeBoardTitleFunc(index, column.id)')
//             i.far.fa-trash-alt(@click='deleteBoard(index, column.id)')
//         draggable(v-model="column.tasks" v-bind='dragOptions')
//           li(v-for='(task, i) in column.tasks' :key='i' :class='{prioritized_task: task.isPrioritized}')
//             span {{ task.name }}
//             div
//               i.fas.fa-pen(@click='openModal(index, i, column.id, task)')
//               i.fas.fa-exclamation(@click='prioritizeTask(index, i, column.id, task.id)')
//               i.far.fa-times-circle(@click='deleteTask(index, column.id, task.id)')
//           input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, index, column.id)')
// </template> -->
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
    Boards(v-model="columns")
</template>

<script>
import TaskModal from '../components/TaskModal.vue'
import Boards from '../components/Boards'
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
      columns,
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
      columns,
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
