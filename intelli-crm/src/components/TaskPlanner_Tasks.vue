<template lang='pug'>
  draggable(
    :list='tasks'
    @change='reArrangeTasks()'
    tag="ul",
    animation=300,
    :group="{ name: 'column' }")
    li(v-for='(task, i) in tasks' :key='i' :class='{prioritized_task: task.isPrioritized}')
      span {{ task.name }}
      div
        i.fas.fa-pen(@click='openModal(boardIndex, i, boardID, task)')
        i.fas.fa-exclamation(@click='prioritizeTask(boardIndex, i, boardID, task.id)')
        i.far.fa-times-circle(@click='deleteTask(boardIndex, boardID, task.id)')
    input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, boardIndex, boardID)')
</template>

<script>
  import taskPlannerHandlers from '../composable/views/task-planner'
  const draggable = require('vuedraggable')

  export default {
    name: 'TaskPlanner_Tasks',
    props: {
      boardID: {
        required: false,
        type: String,
        default: ''
      },
      boardIndex: {
        required: false,
        type: Number,
        default: 0
      },
      tasks: {
        required: false,
        type: Array,
        default: null
      }
    },
    components: {
      draggable
    },
    setup(props, { root: { $store }, emit }) {
      const {
        addTask, reArrangeTasks,
        deleteTask, prioritizeTask,
      } = taskPlannerHandlers($store)

      const openModal = (boardIndex, i, boardID, task) => {
        emit('openModal', { boardIndex, i, boardID, task })
      }

      return {
        addTask,
        openModal,
        deleteTask,
        reArrangeTasks,
        prioritizeTask,
      }
    }
  }
</script>