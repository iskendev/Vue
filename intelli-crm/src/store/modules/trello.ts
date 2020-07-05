import uuid from '../../utils/uuid'
import localStorageSaver from "../../utils/trello-boards-saver"

let columns = localStorage.getItem('columns') ? 
  localStorage.getItem('columns') : [ {
    name: 'todo',
    tasks: [
      {
        description: '',
        name: 'first task',
        id: uuid(),
        userAssigned: null
      },
      {
        description: '',
        name: 'second task',
        id: uuid(),
        userAssigned: null
      },
      {
        description: '',
        name: 'third task',
        id: uuid(),
        userAssigned: null
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
        userAssigned: null
      },
      {
        description: '',
        name: 'second task',
        id: 2,
        userAssigned: null
      },
      {
        description: '',
        name: 'third task',
        id: 3,
        userAssigned: null
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
        userAssigned: null
      },
      {
        description: '',
        name: 'second task',
        id: 2,
        userAssigned: null
      },
      {
        description: '',
        name: 'third task',
        id: 3,
        userAssigned: null
      },
    ]
  },];

const trello = {
  state: {
    // columns: [
      // {
      //   name: 'todo',
      //   tasks: [
      //     {
      //       description: '',
      //       name: 'first task',
      //       id: uuid(),
      //       userAssigned: null
      //     },
      //     {
      //       description: '',
      //       name: 'second task',
      //       id: uuid(),
      //       userAssigned: null
      //     },
      //     {
      //       description: '',
      //       name: 'third task',
      //       id: uuid(),
      //       userAssigned: null
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
      //       userAssigned: null
      //     },
      //     {
      //       description: '',
      //       name: 'second task',
      //       id: 2,
      //       userAssigned: null
      //     },
      //     {
      //       description: '',
      //       name: 'third task',
      //       id: 3,
      //       userAssigned: null
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
      //       userAssigned: null
      //     },
      //     {
      //       description: '',
      //       name: 'second task',
      //       id: 2,
      //       userAssigned: null
      //     },
      //     {
      //       description: '',
      //       name: 'third task',
      //       id: 3,
      //       userAssigned: null
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

  },
  actions: {

  }
}

export default trello;