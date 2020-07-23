<template lang='pug'>
  draggable.task-planner__list(
    v-model='boards'
    tag="ul",
    animation=300)
      li.task-planner__list--item(v-for='(board, index) in boards' :key='index')
        div.task-planner__list--item-edit
          div.edit-board-title
            span(v-if='!board.isTitleChanging') {{ board.name }}
            input.edit-board-title__input(v-else v-model='board.name' @keyup.enter='DonechangeBoardTitleFunc(index, board.id)')
          span
            i.fas.fa-pencil-alt(v-if="!board.isTitleChanging" @click='changeBoardTitleFunc(index)')
            i.fas.fa-check(v-else @click='DonechangeBoardTitleFunc(index, board.id)')
            i.far.fa-trash-alt(@click='deleteBoard(index, board.id)')
        TaskPlanner_Tasks(:tasks='board.tasks' :boardID='board.id' :boardIndex='index' @openModal='openModal')
</template>

<script>
  const draggable = require('vuedraggable')
  import taskPlannerHandlers from '../composable/views/task-planner'
  import TaskPlanner_Tasks from './TaskPlanner_Tasks'

  export default {
    name: 'TaskPlanner_Boards',
    components: {
      draggable, TaskPlanner_Tasks
    },
    setup(_, { root: { $store }, emit }) {
      const {
        boards,
        deleteBoard,
        changeBoardTitle,
        changeBoardTitleFunc,
        DonechangeBoardTitleFunc,
      } = taskPlannerHandlers($store)

      const openModal = (payload) => {
        emit('openTaskModal', payload)
      }

      return {
        boards,
        openModal,
        deleteBoard,
        changeBoardTitle,
        changeBoardTitleFunc,
        DonechangeBoardTitleFunc,
      }
    }
  }
</script>