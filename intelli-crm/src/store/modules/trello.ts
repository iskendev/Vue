import uuid from '../../utils/uuid'
const trello: object = {
  state: {
    columns: [
      {
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
      },
    ] 
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