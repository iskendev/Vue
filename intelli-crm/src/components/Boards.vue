<template lang='pug'>
  draggable.task-planner__list(
    v-bind='dragOptionsBoards'
    :list="list"
    :value="value"
    @input="emitter"
    @start='start')
      li.task-planner__list--item(v-for='(column, index) in boards' :key='index')
        div.task-planner__list--item-edit
          div.edit-board-title
            span(v-if='!column.isTitleChanging') {{ column.name }}
            input.edit-board-title__input(v-else v-model='column.name' @keyup.enter='DonechangeBoardTitleFunc(index, column.id)')
          span
            i.fas.fa-pencil-alt(v-if="!column.isTitleChanging" @click='changeBoardTitleFunc(index)')
            i.fas.fa-check(v-else @click='DonechangeBoardTitleFunc(index, column.id)')
            i.far.fa-trash-alt(@click='deleteBoard(index, column.id)')
        Tasks(v-model='column.tasks'  @input="emitter")
</template>

<script>
const draggable = require('vuedraggable')
import taskPlannerHandlers from '../composable/views/task-planner'
import Tasks from './Tasks'
import { computed } from '@vue/composition-api'
  export default {
    components: {
      Tasks, draggable
    },
    name: 'Boards',
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
    setup(props, { root: { $store }, emit }) {
      const {
        pullFunction, start, controlOnStart, clone,
        changeBoardTitle, DonechangeBoardTitleFunc, changeBoardTitleFunc, deleteBoard
      } = taskPlannerHandlers($store)

      const dragOptionsBoards = computed(() => ({
        tag: "ul",
        animation: 300,
        group: { name: 'columns', pull: pullFunction }
      }))

      const emitter = (value) => {
        emit("input", value)
      }

      const boards = computed(() => {
        return props.value ? props.value : props.list
      })

      return {
        emitter,
        boards,
        dragOptionsBoards,
        pullFunction,
        start,
        controlOnStart,
        clone,
        changeBoardTitle,
        DonechangeBoardTitleFunc,
        changeBoardTitleFunc,
        deleteBoard
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>