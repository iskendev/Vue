<template lang='pug'>
  div.task-planner(:style="{ backgroundImage: image }") 
    task-modal(v-if='showModal' @close="editTask()")
      h3(slot="header") {{ modalHeader === 'board' ? 'Type board title' : 'Edit task' }}
      input.modal-body__input(slot='body' v-model='editableTask.name' @keyup.enter='editTask()')
    div.task-planner__add-board
      i(@click='addBoard()').fas.fa-plus
      ul
        li(v-for="(option, i) in backgroundOptions" 
          :key="i" 
          :class='{ underlined: option.path === image }' 
          @click='image = option.path')  {{ option.num }}  
    draggable.task-planner__list(v-model="columns" v-bind='dragOptionsBoards'  @start="start")
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index')
        div.task-planner__list--item-edit
          div.edit-board-title
            span(v-if='!column.isTitleChanging') {{ column.name }}
            input.edit-board-title__input(v-else v-model='column.name' @keyup.enter='DonechangeBoardTitleFunc(index)')
          span
            i.fas.fa-pencil-alt(v-if="!column.isTitleChanging" @click='changeBoardTitleFunc(index)')
            i.fas.fa-check(v-else @click='DonechangeBoardTitleFunc(index)')
            i.far.fa-trash-alt(@click='deleteBoard(index)')
        draggable(v-model="column.tasks" v-bind='dragOptions'  @start="start")
          li(v-for='(task, i) in column.tasks' :key='i' :class='{prioritized_task: task.isPrioritized}')
            span {{ task.name }}
            div
              i.fas.fa-pen(@click='openModal(index, i, task.name)')
              i.fas.fa-exclamation(@click='prioritizeTask(index, i)')
              i.far.fa-times-circle(@click='deleteTask(index, task.id)')
          input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, index)')
</template>

<script> 
import TaskModal from '../components/TaskModal.vue'
import { tasksHandler, backgroundHandler, draggableHandler } from '../composable/views/task-planner.js'
const draggable = require('vuedraggable')

export default ({
  name: 'TaskPlanner',
  components: {
    draggable, TaskModal
  },
  setup(_, { root: { $store } }) {
    return { ...tasksHandler($store), 
    ...draggableHandler($store), 
    ...backgroundHandler() 
    }
  },
})
</script>

<style lang="scss">
@import '../sass/views/_task-planner.scss';
</style>
