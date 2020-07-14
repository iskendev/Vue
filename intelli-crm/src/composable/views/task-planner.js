import { ref, computed } from '@vue/composition-api'
import { uuid } from '../../utils/uuid'

// tasks handler -----------------------------------------
export function tasksHandler(store) {
  // add board
  let showModal = ref(false)
  let modalHeader = ref('')
  let editableTask = ref({ index: null, i: null, name: '' })

  const addBoard = () => {
    modalHeader.value = 'board'
    editableTask.value.name = ''
    showModal.value = true
  }
  // change board title
  const changeBoardTitle = ref(false)
  const changeBoardTitleFunc = (index) => {
    store.commit('changeBoardTitle', index)
  }
  const DonechangeBoardTitleFunc = (index) => {
    store.commit('DonechangeBoardTitle', index)
  }
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
  // let editableTask = ref({ index: null, i: null, name: '' })
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
    changeBoardTitle,
    DonechangeBoardTitleFunc,
    changeBoardTitleFunc
  }
}

// background handler ----------------------------------
export function backgroundHandler() {
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

// drag & drop handler ----------------------------------
export function draggableHandler(store) {
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
