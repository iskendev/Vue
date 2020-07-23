import { ref, onMounted, computed } from '@vue/composition-api'
import { uuid } from '../../utils/uuid'

export default function taskPlannerHandlers(store) {
  let showModal = ref(false)
  let modalHeader = ref('')
  let editableTask = ref({ index: null, i: null, columnID: null, task: { name: '', isPrioritized: false } })
  let boards = computed({
    get: () => store.getters.boards,
    set: (value) => store.dispatch('updateBoards', value)
  })

  // common handlers -----------------------------------
  const openModal_editTask = (index, i, columnID, task) => {
    modalHeader.value = 'task'
    editableTask.value.index = index
    editableTask.value.i = i
    editableTask.value.columnID = columnID
    editableTask.value.task = task
    showModal.value = true
  }

  const openModal_addBoard = () => {
    modalHeader.value = 'board'
    editableTask.value.task.name = ''
    showModal.value = true
  }

  const addBoard_editTask = async () => {
    if (modalHeader.value === 'board') {
      if (editableTask.value.task.name === '') {
        return false
      }
      try {
        await store.dispatch('addBoard', editableTask.value.task.name)
      } catch (e) {}
    } else {
      try {
        store.dispatch('editTask', editableTask.value)
        editableTask.value = { index: null, i: null, columnID: null, task: { name: '', isPrioritized: false } }
      } catch (e) {}
    }
    showModal.value = false
  }

  // boards handler -------------------------------------
  function boardsHandler() {
    const changeBoardTitle = ref(false)

    // fetch boards
    const fetchBoards = () => {
      onMounted(async () => {
        await store.dispatch('fetchBoards')
      })
    }

    // change board title
    const changeBoardTitleFunc = (index) => {
      store.commit('changeBoardTitle', index)
    }
    const DonechangeBoardTitleFunc = async (index, id) => {
      try {
        store.commit('DonechangeBoardTitle', index)
        await store.dispatch('DonechangeBoardTitle', {index, id})
      } catch (e) {}
    }

    // delete board
    const deleteBoard = async (index, id) => {
      try {
        await store.dispatch('deleteBoard', {index, id})
      } catch (e) {}
    }

    return {
      fetchBoards,
      deleteBoard,
      changeBoardTitle,
      DonechangeBoardTitleFunc,
      changeBoardTitleFunc
    }
  }

  // tasks handler --------------------------------------
  function tasksHandler() {
    // add task
    const addTask = async (e, index, id) => {
      let task = {
        name: e.target.value,
        id: '',
        isPrioritized: false
      }
      if (e.target.value) {
        try {
          await store.dispatch('addTask', { task, index, id })
          e.target.value = ''
        } catch (e) {}
      }
    }

    // rearrange tasks
    const reArrangeTasks = () => {
      store.dispatch('updateBoards', boards.value)
    }

    // delete task
    const deleteTask = async (index, columnID,  taskID) => {
      try {
        store.dispatch('deleteTask', { index, columnID,  taskID })
      } catch (e) {}
    }

    // prioritize task
    const prioritizeTask = (index, i, columnID,  taskID) => {
      store.dispatch('prioritizeTask', { index, i, columnID,  taskID })
    }
    return {
      addTask,
      reArrangeTasks,
      deleteTask,
      prioritizeTask
    }
  }

  // background handler ----------------------------------
  function backgroundHandler() {
    let url = ref('none')
    const changeBG = (path) => {
      url.value = path
    }
    const backgroundOptions = ref([
      { num: 0, path: 'none' },
      { num: 1, path: 'url(' + require('@/assets/1.jpg') + ')' },
      { num: 2, path: 'url(' + require('@/assets/2.jpg') + ')' },
      { num: 3, path: 'url(' + require('@/assets/3.jpg') + ')' },
      { num: 4, path: 'url(' + require('@/assets/4.jpg') + ')' },
      { num: 5, path: 'url(' + require('@/assets/5.jpg') + ')' },
    ])
    return { backgroundOptions, url, changeBG }
  }

  // drag & drop handler ----------------------------------
  function draggableHandler() {
    let controlOnStart = ref(true)
    const clone = ({ name }) => {
      return { name, id: uuid() };
    }
    const pullFunction = () => {
      return controlOnStart ? "clone" : true;
    }
    const start = ({ originalEvent }) => {
      controlOnStart = originalEvent.ctrlKey;
    }
    return { controlOnStart, clone, start, pullFunction }
  }

  return {
    showModal,
    modalHeader,
    editableTask,
    boards,
    openModal_addBoard,
    openModal_editTask,
    addBoard_editTask,
    ...boardsHandler(),
    ...tasksHandler(),
    ...backgroundHandler(),
    ...draggableHandler()
  }
}



