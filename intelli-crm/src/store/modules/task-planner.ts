import firebase  from 'firebase/app'

const trello = {
  state: {
    boards: []
  },
  getters: {
    boards: (state: any): Array<Object> => state.boards
  },
  mutations: {
    addBoard(state: any, board: any) {
      state.boards.push(board)
    },
    setBoards(state: any, boards: any) {
      state.boards = boards
    },
    DonechangeBoardTitle(state: any, index: any) {
      state.boards[index].isTitleChanging = false

    },
    changeBoardTitle(state: any, index: any) {
      state.boards[index].isTitleChanging = true
    },
    deleteBoard(state: any, i: any) {
      state.boards.splice(i, 1)
    },
    addTask(state: any, payload: any) {
      state.boards[payload.index].tasks.push(payload.task)
    },
    deleteTask(state: any, payload: any) {
      state.boards[payload.index].tasks = 
        state.boards[payload.index].tasks.filter((task: any) => task.id !== payload.id)
    },
    editTask(state: any, payload:any) {
      state.boards[payload.index].tasks[payload.i].name = payload.name 
    },
    prioritizeTask(state: any, payload: any) {
      state.boards[payload.index].tasks[payload.i].isPrioritized = 
        !state.boards[payload.index].tasks[payload.i].isPrioritized;
    },
    updateColumns(state: any, payload: any) {
      state.boards = payload
    }
  },
  actions: {
    async fetchBoards({ commit, dispatch }: any) {
      try {
        const uid = await dispatch('getUid')
        let boards = (await firebase.database().ref(`/users/${uid}/boards`).once('value')).val()
        boards = Object.keys(boards).map(key => ({ ...boards[key], id: key })) 
        commit('setBoards', boards)
      } catch (e) { commit('errorHandler', e) }
    },
    async addBoard({commit, dispatch}:any, name: any) {
      try {
        const uid = await dispatch('getUid')
        const board = await firebase.database().ref(`/users/${uid}/boards`).push({ name: name, isTitleChanging: false, tasks: [] })
        commit('addBoard', {
          id: board.key,
          name: name,
          isTitleChanging: false, 
          tasks: [] 
        })
      } catch(e) { commit('errorHandler', e) }
    },
    async DonechangeBoardTitle({dispatch, commit, state}: any, {index, id}: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/boards`).child(id).update({name: state.boards[index].name})
      } catch (e) { commit('errorHandler', e) }
    },
    async deleteBoard({dispatch, commit}: any, {index, id}: any) {
      commit('deleteBoard', index)
      const uid = await dispatch('getUid')
      await firebase.database().ref(`/users/${uid}/boards`).child(id).remove()
    }
  }
}

export default trello