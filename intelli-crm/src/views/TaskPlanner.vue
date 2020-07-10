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
            span(v-if='!changeBoardTitle') {{ column.name }}
            input.edit-board-title__input(v-else v-model='column.name' @keyup.enter='changeBoardTitle = false')
          span
            i.fas.fa-pencil-alt(v-if="!changeBoardTitle" @click='changeBoardTitle = true')
            i.fas.fa-check(v-else @click='changeBoardTitle = false')
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
import { useStore } from '../composable/use-store'
import { computed, ref, onMounted } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'
import { uuid } from '../utils/trello'
import TaskModal from '../components/TaskModal.vue'
const draggable = require('vuedraggable')

export default defineComponent({
  name: 'TaskPlanner',
  components: {
    draggable, TaskModal
  },
  setup(props) {
    // store
    const store = useStore()

    // tasks handler
    const tasksHandler = () => {
      // add board
      let showModal = ref(false)
      const modalHeader = ref('')
      const addBoard = () => {
        modalHeader.value = 'board'
        editableTask.value.name = ''
        showModal.value = true
      }
      // change board title
      const changeBoardTitle = ref(false)
      // delete board
      const deleteBoard = (index) => {
        store.commit('deleteBoard', index)
      }
      // add task
      const addTask = (e, index) => {
        let task = {
          name: e.target.value,
          id: uuid(),
          isPrioritized: false,
        }
        if (e.target.value) {
          store.commit('addTask', { task, index })
          e.target.value = ''
        }
      }
      // delete task
      const deleteTask = (index, id) => {
        store.commit('deleteTask', { index, id })
      }
      // prioritize task
      const prioritizeTask = (index, i) => {
        store.commit('prioritizeTask', { index, i })
      }
      // edit task
      let editableTask = ref({ index: null, i: null, name: '' })
      const openModal = (index, i, name) => {
        modalHeader.value = 'task'
        editableTask.value.index = index
        editableTask.value.i = i
        editableTask.value.name = name
        showModal.value = true 
      }
      const editTask = () => {
        if (modalHeader.value === 'board') {
          if (editableTask.value.name === '') {
            return false
          }
          store.commit('addBoard', editableTask.value.name)
        } else {
          store.commit('editTask', editableTask.value)
          editableTask.value = {}
        }
        showModal.value = false
      }
      
      return { 
        addBoard,
        deleteBoard,
        addTask, 
        deleteTask, 
        openModal, 
        prioritizeTask, 
        showModal, 
        editableTask, 
        editTask,
        modalHeader,
        changeBoardTitle 
      }
    }

    // background handler
    const backgroundHandler = () => {
      let image = ref('none')
      const backgroundOptions = ref([
        { num: 0, path: 'none' },
        { num: 1, path: 'url(' + require('@/assets/1.jpg') + ')' },
        { num: 2, path: 'url(' + require('@/assets/2.jpg') + ')' },
        { num: 3, path: 'url(' + require('@/assets/3.jpg') + ')' },
        { num: 4, path: 'url(' + require('@/assets/4.jpg') + ')' },
        { num: 5, path: 'url(' + require('@/assets/5.jpg') + ')' },
      ])
      return { backgroundOptions, image }
    }

    // drag & drop handler 
    const draggableHandler = () => {
      let controlOnStart = ref(true)
      let columns = computed({
        get: () => store.getters.columns,
        set: (value) => store.commit('updateColumns', value)
      })
      let dragOptions = computed(() => ({
        tag: "ul",
        animation: 300,
        group: { name: 'columns', pull: pullFunction }
      }))

      let dragOptionsBoards = computed(() => ({
        tag: "ul",
        animation: 300,
        group: { name: 'boards', pull: pullFunction }
      }))

      const clone = ({ name }) => {
        return { name, id: uuid() };
      }
      const pullFunction = () => {
        return controlOnStart ? "clone" : true;
      }
      const start = ({ originalEvent }) => {
        controlOnStart = originalEvent.ctrlKey;
      }
      return { columns, controlOnStart, clone, pullFunction, start, dragOptions, dragOptionsBoards }
    }

    return { ...tasksHandler(), ...draggableHandler(), ...backgroundHandler() }
  },
})
</script>

<style lang="scss">
@import '../sass/view/_task-planner.scss';
</style>
