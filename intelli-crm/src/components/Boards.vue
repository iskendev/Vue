<template lang='pug'>
  draggable.task-planner__list(
    v-model='columns'
    tag="ul",
    animation=300)
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index')
        div.task-planner__list--item-edit
          div.edit-board-title
            span(v-if='!column.isTitleChanging') {{ column.name }}
            input.edit-board-title__input(v-else v-model='column.name' @keyup.enter='DonechangeBoardTitleFunc(index, column.id)')
          span
            i.fas.fa-pencil-alt(v-if="!column.isTitleChanging" @click='changeBoardTitleFunc(index)')
            i.fas.fa-check(v-else @click='DonechangeBoardTitleFunc(index, column.id)')
            i.far.fa-trash-alt(@click='deleteBoard(index, column.id)')
        Tasks(:tasks='column.tasks' :columnID='column.id' :columnIndex='index')
</template>

<script>
  const draggable = require('vuedraggable')
  import taskPlannerHandlers from '../composable/views/task-planner'
  import Tasks from './Tasks'
  export default {
    name: 'BoardsTest',
    components: {
      draggable, Tasks
    },
    setup(_, { root: { $store } }) {
      const {
        columns,
        changeBoardTitle,
        DonechangeBoardTitleFunc,
        changeBoardTitleFunc,
        deleteBoard
      } = taskPlannerHandlers($store)

      return {
        columns,
        changeBoardTitle,
        DonechangeBoardTitleFunc,
        changeBoardTitleFunc,
        deleteBoard
      }
    }
  }
</script>