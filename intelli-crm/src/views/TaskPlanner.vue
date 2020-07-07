<template lang='pug'>
  div.task-planner
    ul.task-planner__list
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index') 
        span {{ column.name }}
        draggable(v-model="column.tasks" v-bind='dragOptions'  @start="start")
          li(v-for='(task, i) in column.tasks' :key='i' :class='{prioritized_task: task.isPrioritized}')
            span {{ task.name }}
            div
              i.fas.fa-pen(@click='editTask(index, i)')
              i.fas.fa-exclamation(@click='prioritizeTask(index, i)')
              i.far.fa-times-circle(@click='deleteTask(index, task.id)')
          input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, index)')
</template>

<script lang='ts'> 
import { useStore } from '../composable/use-store'
import { computed, ref, onMounted } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'
import { uuid } from '../utils/trello'
const draggable = require('vuedraggable')

export default defineComponent({
  name: 'TaskPlanner',
  components: {
    draggable
  },
  setup(props, { refs }: any) {
    // store
    const store: any = useStore()
    
    // managing tasks handler
    const tasksHandler = () => {
     // add task
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
      // delete task
      const deleteTask = (index: number, id: string) => {
        store.commit('deleteTask', { index, id })
      }
      // prioritize task
      const prioritizeTask = (index:number, i:number) => {
        store.commit('prioritizeTask', { index, i })
      }
      // TODO edit task
      const editTask = (index:number, i:number) => {
        // store.commit('editTask', { index, i })
        console.log('nothing happened');
      }
      return { addTask, deleteTask, editTask, prioritizeTask }
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
