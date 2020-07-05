<template lang='pug'>
  div.task-planner
    ul.task-planner__list
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index') 
        span {{ column.name }}
        ul
          li(v-for='(task, i) in column.tasks' :key='i') {{ task.name }}
        input.task-planner__list--item-add(placeholder='+ Add another card' @keyup.enter='addTask($event, index)')
</template>

<script lang='ts'>
import { useStore } from '../composable/use-store'
import { computed } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'
import { uuid } from '../utils/trello'

export default defineComponent({
  name: 'TaskPlanner',
  setup() {
    const store: any = useStore()
    const columns = computed(() => store.getters.columns)

    const addTask = (e: any, index: number):void => {
      let task = {
        description: '',
        name: e.target.value,
        id: uuid(),
        userAssigned: null
      }
        
      store.commit('addTask', { task, index })
    }



    return { columns, addTask }
  },
})
</script>

<style lang="scss">
@import '../sass/view/_task-planner.scss';
</style>
