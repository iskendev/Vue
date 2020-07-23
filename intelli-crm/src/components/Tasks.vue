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
        i.fas.fa-pen(@click='openModal_editTask(columnIndex, i, columnID, task)')
        i.fas.fa-exclamation(@click='prioritizeTask(columnIndex, i, columnID, task.id)')
        i.far.fa-times-circle(@click='deleteTask(columnIndex, columnID, task.id)')
    input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, columnIndex, columnID)')
</template>

<script>
  import taskPlannerHandlers from '../composable/views/task-planner'
  const draggable = require('vuedraggable')
  export default {
    name: 'Tasks',
    props: {
      columnID: {
        required: true,
        type: String,
        default: ''
      },
      columnIndex: {
        required: true,
        type: Number,
        default: 0
      },
      tasks: {
        required: true,
        type: Array,
        default: null
      }
    },
    components: {
      draggable
    },
    setup(props, { root: { $store }, emit }) {
      const {
        columns,
        openModal_editTask,
        addTask, reArrangeTasks,
        deleteTask, prioritizeTask,
      } = taskPlannerHandlers($store)

      return {
        addTask,
        reArrangeTasks,
        deleteTask,
        prioritizeTask,
        openModal_editTask,
      }
    }
  }
</script>