<template lang='pug'>
  div.task-planner__add-board
    i(@click='openModal').fas.fa-plus
    ul
      li(v-for="(option, i) in backgroundOptions"
        :key="i"
        :class='{ underlined: option.path === image }'
        @click='changeBG(option.path)')  {{ option.num }}
</template>

<script>
  import taskPlannerHandlers from '../composable/views/task-planner'

  export default {
    name: 'TaskPlanner_Header',
    props: ['image'],
    setup(_, { emit }) {
      const { backgroundOptions } = taskPlannerHandlers()

      const changeBG = (path) => {
        emit('changeBGFunc', path)
      }
      const openModal = () => {
        emit('openBoardModal')
      }

      return {
        changeBG,
        openModal,
        backgroundOptions,
      }
    }
  }
</script>