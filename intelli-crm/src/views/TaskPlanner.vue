<template lang='pug'>
  div.task-planner(:style="{ backgroundImage: url }")
    TaskPlanner_TaskModal(v-if='showModal' @close="addBoard_editTask()")
      h3(slot="header") {{ modalHeader === 'board' ? 'Type board title' : 'Edit task' }}
      input.modal-body__input(slot='body' v-model='editableTask.task.name' @keyup.enter='addBoard_editTask()')
    TaskPlanner_Header(@changeBGFunc='changeBGFunc' :image='url' @openBoardModal='openBoardModal')
    Loader.loader(v-if='loading')
    TaskPlanner_Boards(v-else @openTaskModal='openTaskModal')
</template>

<script>
import TaskPlanner_Header from '../components/TaskPlanner_Header.vue'
import TaskPlanner_TaskModal from '../components/TaskPlanner_TaskModal.vue'
import TaskPlanner_Boards from '../components/TaskPlanner_Boards.vue'
import taskPlannerHandlers from '../composable/views/task-planner.js'
import Loader from '../components/Loader';

export default ({
  name: 'TaskPlanner',
  components: {
    Loader,
    TaskPlanner_Boards,
    TaskPlanner_Header,
    TaskPlanner_TaskModal,
  },
  setup(_, { root: { $store } }) {

    const {
      url,
      loading,
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
    const openBoardModal = () => {
      openModal_addBoard()
    }
    const openTaskModal = ({ boardIndex, i, boardID, task }) => {
      openModal_editTask(boardIndex, i, boardID, task)
    }

    return {
      url,
      loading,
      changeBG,
      showModal,
      fetchBoards,
      modalHeader,
      changeBGFunc,
      editableTask,
      openTaskModal,
      openBoardModal,
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
