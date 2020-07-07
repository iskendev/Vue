import { uuid } from '../../utils/trello'
import { localStorageSaver } from "../../utils/trello"

let columns = localStorage.getItem('columns') ? 
  localStorage.getItem('columns') : [ {
    name: 'todo',
    tasks: [
      {
        description: '',
        name: 'first task',
        id: uuid(),
        isPrioritized: false,
        isEdit: false
      },
      {
        description: '',
        name: 'second task',
        id: uuid(),
        isPrioritized: false,
        isEdit: false
      },
      {
        description: '',
        name: 'third task',
        id: uuid(),
        isPrioritized: false,
        isEdit: false
      },
    ]
  },
  {
    name: 'todo',
    tasks: [
      {
        description: '',
        name: 'first task',
        id: 1,
        isPrioritized: false,
        isEdit: false
      },
      {
        description: '',
        name: 'second task',
        id: 2,
        isPrioritized: false,
        isEdit: false
      },
      {
        description: '',
        name: 'third task',
        id: 3,
        isPrioritized: false,
        isEdit: false
      },
    ]
  },
  {
    name: 'todo',
    tasks: [
      {
        description: '',
        name: 'first task',
        id: 1,
        isPrioritized: false,
        isEdit: false
      },
      {
        description: '',
        name: 'second task',
        id: 2,
        isPrioritized: false,
        isEdit: false
      },
      {
        description: '',
        name: 'third task',
        id: 3,
        isPrioritized: false,
        isEdit: false
      },
    ]
  },];

const trello = {
  plugins: [localStorageSaver],
  state: {
    // columns: [
      // {
      //   name: 'todo',
      //   tasks: [
      //     {
      //       description: '',
      //       name: 'first task',
      //       id: uuid(),
      //       isPrioritized: false,
      //     },
      //     {
      //       description: '',
      //       name: 'second task',
      //       id: uuid(),
      //       isPrioritized: false,
      //     },
      //     {
      //       description: '',
      //       name: 'third task',
      //       id: uuid(),
      //       isPrioritized: false,
      //     },
      //   ]
      // },
      // {
      //   name: 'todo',
      //   tasks: [
      //     {
      //       description: '',
      //       name: 'first task',
      //       id: 1,
      //       isPrioritized: false,
      //     },
      //     {
      //       description: '',
      //       name: 'second task',
      //       id: 2,
      //       isPrioritized: false,
      //     },
      //     {
      //       description: '',
      //       name: 'third task',
      //       id: 3,
      //       isPrioritized: false,
      //     },
      //   ]
      // },
      // {
      //   name: 'todo',
      //   tasks: [
      //     {
      //       description: '',
      //       name: 'first task',
      //       id: 1,
      //       isPrioritized: false,
      //     },
      //     {
      //       description: '',
      //       name: 'second task',
      //       id: 2,
      //       isPrioritized: false,
      //     },
      //     {
      //       description: '',
      //       name: 'third task',
      //       id: 3,
      //       isPrioritized: false,
      //     },
      //   ]
      // },
    // ]
    columns
  },
  getters: {
    columns: (state: any): Array<Object> => state.columns
  },
  mutations: {
    addTask(state: any, payload: any) {
      state.columns[payload.index].tasks.push(payload.task)
    },
    deleteTask(state: any, payload: any) {
      state.columns[payload.index].tasks = 
        state.columns[payload.index].tasks.filter((task: any) => task.id !== payload.id)
    },
    editTask(state: any, payload:any) {
      state.columns[payload.index].tasks[payload.i].isEdit = 
        !state.columns[payload.index].tasks[payload.i].isEdit;
    },
    prioritizeTask(state: any, payload: any) {
      state.columns[payload.index].tasks[payload.i].isPrioritized = 
        !state.columns[payload.index].tasks[payload.i].isPrioritized;
    },
    updateColumns(state: any, payload: any) {
      state.columns = payload
    }
  },
  actions: {

  }
}

export default trello;