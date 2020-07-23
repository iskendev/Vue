<template lang='pug'>
  div.task-planner(:style="{ backgroundImage: url }")
    TaskPlanner_TaskModal(v-if='showModal' @close="addBoard_editTask()")
      h3(slot="header") {{ modalHeader === 'board' ? 'Type board title' : 'Edit task' }}
      input.modal-body__input(slot='body' v-model='editableTask.task.name' @keyup.enter='addBoard_editTask()')
    TaskPlanner_Header(@changeBGFunc='changeBGFunc' :image='url' @openModal='openModal')
    TaskPlanner_Boards(@openTaskModal='openTaskModal')
</template>

<script>
import TaskPlanner_Header from '../components/TaskPlanner_Header.vue'
import TaskPlanner_TaskModal from '../components/TaskPlanner_TaskModal.vue'
import TaskPlanner_Boards from '../components/TaskPlanner_Boards.vue'
import taskPlannerHandlers from '../composable/views/task-planner.js'

export default ({
  name: 'TaskPlanner',
  components: {
    TaskPlanner_Header,
    TaskPlanner_TaskModal,
    TaskPlanner_Boards
  },
  setup(_, { root: { $store } }) {

    const {
      url,
      changeBG,
      showModal,
      fetchBoards,
      modalHeader,
      editableTask,
      addBoard_editTask,
      openModal_addBoard,
      openModal_editTask
    } = taskPlannerHandlers($store)

    fetchBoards()

    const changeBGFunc = (path) => {
      changeBG(path)
    }
    const openModal = () => {
      openModal_addBoard()
    }
    const openTaskModal = ({ boardIndex, i, boardID, task }) => {
      openModal_editTask(boardIndex, i, boardID, task)
    }

    return {
      url,
      changeBG,
      showModal,
      openModal,
      fetchBoards,
      modalHeader,
      changeBGFunc,
      editableTask,
      openTaskModal,
      addBoard_editTask,
      openModal_editTask,
      openModal_addBoard,
    }
  },
})
</script>

<style lang="scss">
@import '../sass/views/_task-planner.scss';
</style>
