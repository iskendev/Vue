<template lang='pug'>
  div.task-planner
    task-modal(v-if='showModal' @close="editTask()")
      h3(slot="header") Edit task
      input.modal-body__input(slot='body' v-model='editableTask.name')
    ul.task-planner__list
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index') 
        span {{ column.name }}
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
      let showModal = ref(false)
      let editableTask = ref({ index: null, i: null, name: '' })
      const openModal = (index, i, name) => {
        editableTask.value.index = index
        editableTask.value.i = i
        editableTask.value.name = name
        showModal.value = true 
      }
      const editTask = () => {
        store.commit('editTask', editableTask.value)
        showModal.value = false
      }
      
      return { addTask, deleteTask, openModal, prioritizeTask, showModal, editableTask, editTask }
    }

    // drag & drop handler 
    const draggableHandler = () => {
      let controlOnStart = ref(true)
      let idGlobal = 8
      let columns = computed({
        get: () => store.getters.columns,
        set: (value) => store.commit('updateColumns', value)
      })
      let dragOptions = computed(() => ({
        tag: "ul",
        animation: 300,
        group: { name: 'columns', pull: pullFunction }
      }))

      const clone = ({ name }) => {
        return { name, id: idGlobal++ };
      }
      const pullFunction = () => {
        return controlOnStart ? "clone" : true;
      }
      const start = ({ originalEvent }) => {
        controlOnStart = originalEvent.ctrlKey;
      }
      return { columns, controlOnStart, idGlobal, clone, pullFunction, start, dragOptions }
    }

    return { ...tasksHandler(), ...draggableHandler() }
  },
})
</script>

<style lang="scss">
@import '../sass/view/_task-planner.scss';
</style>
