<template lang='pug'>
  div.task-planner
    ul.task-planner__list
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index') 
        span {{ column.name }}
        draggable(v-model="column.tasks" v-bind='dragOptions'  @start="start")
          li(v-for='(task, i) in column.tasks' :key='i') 
            span {{ task.name }}
            i.far.fa-times-circle(@click='deleteTask(index, task.id)')
          input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, index)')
</template>

<script lang='ts'>
import { useStore } from '../composable/use-store'
import { computed, ref } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'
import { uuid } from '../utils/trello'
const draggable = require('vuedraggable')

export default defineComponent({
  name: 'TaskPlanner',
  components: {
    draggable
  },
  setup() {
    // store
    const store = useStore()
    
    // handler for deleting and adding tasks
    const tasksHandler = () => {
      const addTask = (e: any, index: number) => {
        let task = {
          description: '',
          name: e.target.value,
          id: uuid(),
          userAssigned: null
        }
        if (e.target.value) {
          store.commit('addTask', { task, index })
          e.target.value = ''
        }
      }
      const deleteTask = (index: number, id: string) => {
        store.commit('deleteTask', { index, id })
      }
      return { addTask, deleteTask }
    }

    // handler responsible for drag and drop events
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

      const clone = ({ name }: any) => {
        return { name, id: idGlobal++ };
      }
      const pullFunction = () => {
        return controlOnStart ? "clone" : true;
      }
      const start = ({ originalEvent }: any) => {
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
