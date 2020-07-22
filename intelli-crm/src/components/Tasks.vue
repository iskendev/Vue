<template lang='pug'>
  draggable(
    :list="list"
    :value="value"
    @input="emitter"
    v-bind='dragOptionsTasks'
    @start='start')
    li(v-for='(task, i) in tasks' :key='i' :class='{prioritized_task: task.isPrioritized}')
      span {{ task.name }}
      div
        i.fas.fa-pen(@click='openModal_editTask(index, i, column.id, task)')
        i.fas.fa-exclamation(@click='prioritizeTask(index, i, column.id, task.id)')
        i.far.fa-times-circle(@click='deleteTask(index, column.id, task.id)')
    input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, index, column.id)')
</template>

<script>
  import taskPlannerHandlers from '../composable/views/task-planner'
  import { computed } from '@vue/composition-api'
  const draggable = require('vuedraggable')
  export default {
    name: 'Tasks',
    props: {
      value: {
        required: false,
        type: Array,
        default: null
      },
      list: {
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
        showModal,
        modalHeader,
        editableTask,
        openModal_editTask,
        addTask, deleteTask, prioritizeTask,
        pullFunction, start, controlOnStart, clone
      } = taskPlannerHandlers($store)

      const dragOptionsTasks = computed(() => ({
        tag: "ul",
        animation: 300,
        group: { name: 'tasks', pull: pullFunction }
      }))
      const emitter = (value) => {
        emit("input", value)
      }
      let tasks = computed(() => {
        return props.value ? props.value : props.list
      })

      return {
        addTask,
        deleteTask,
        prioritizeTask,
        openModal_editTask,
        showModal,
        modalHeader,
        editableTask,
        dragOptionsTasks,
        emitter,
        tasks,
        pullFunction,
        start,
        controlOnStart,
        clone
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>