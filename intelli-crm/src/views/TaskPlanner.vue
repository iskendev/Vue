<template lang='pug'>
  div.task-planner
    ul.task-planner__list
      li.task-planner__list--item(v-for='(column, index) in columns' :key='index') {{ column.name }}
        ul 
          li(v-for='(task, i) in column.tasks' :key='i') {{ task.name }}
</template>

<script lang='ts'>
import { useStore } from '../composable/use-store'
import { computed } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TaskPlanner',
  setup() {
    const store: any = useStore()
    const columns = computed(() => store.getters.columns)

    return { columns }
  },
})
</script>

<style lang="scss">
@import '../sass/view/_task-planner.scss';
</style>
