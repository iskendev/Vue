const trello = {
  state: {
    columns: []
  },
  getters: {
    columns: (state: any): Array<Object> => state.columns
  },
  mutations: {
    addBoard(state: any, name: any) {
      state.columns.push({ name: name, isTitleChanging: false, tasks: [] })
    },
    DonechangeBoardTitle(state: any, index: any) {
      state.columns[index].isTitleChanging = false
    },
    changeBoardTitle(state: any, index: any) {
      state.columns[index].isTitleChanging = true
    },
    deleteBoard(state: any, i: any) {
      state.columns.splice(i, 1)
    },
    addTask(state: any, payload: any) {
      state.columns[payload.index].tasks.push(payload.task)
    },
    deleteTask(state: any, payload: any) {
      state.columns[payload.index].tasks = 
        state.columns[payload.index].tasks.filter((task: any) => task.id !== payload.id)
    },
    editTask(state: any, payload:any) {
      state.columns[payload.index].tasks[payload.i].name = payload.name 
    },
    prioritizeTask(state: any, payload: any) {
      state.columns[payload.index].tasks[payload.i].isPrioritized = 
        !state.columns[payload.index].tasks[payload.i].isPrioritized;
    },
    updateColumns(state: any, payload: any) {
      state.columns = payload
    }
  },
  actions: {}
}

export default trello;