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
        state.boards[payload.index].tasks.filter((task: any) => task.id !== payload.taskID)
    },
    editTask(state: any, payload:any) {
      state.boards[payload.index].tasks[payload.i].name = payload.task.name
    },
    prioritizeTask(state: any, payload: any) {
      state.boards[payload.index].tasks[payload.i].isPrioritized =
        !state.boards[payload.index].tasks[payload.i].isPrioritized
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
        boards.map((board: any) => {
          if (board.tasks) {
            board.tasks =  Object.keys(board.tasks).map(key => ({ ...board.tasks[key], id: key }))
          } else {
            board.tasks = []
          }
        })
        commit('setBoards', boards)
      } catch (e) { commit('errorHandler', e) }
    },
    async addBoard({commit, dispatch}:any, name: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards`)
          .push({ name: name, isTitleChanging: false })
          .then((snapshot) => {
            commit('addBoard', {
              id: snapshot.key,
              name: name,
              isTitleChanging: false
            })
          })
      } catch(e) { commit('errorHandler', e) }
    },
    async DonechangeBoardTitle({dispatch, commit, state}: any, {index, id}: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards`)
          .child(id)
          .update({name: state.boards[index].name})
      } catch (e) { commit('errorHandler', e) }
    },
    async deleteBoard({dispatch, commit}: any, {index, id}: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards`)
          .child(id)
          .remove()
          .then(() => { commit('deleteBoard', index) })
      } catch (e) { commit('errorHandler', e) }
    },
    async updateColumns({dispatch, commit}:any, payload: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards`)
          .set(payload)
          .then(() => {
            commit('updateColumns', payload)
          })
        // await firebase.database()
        //   .ref(`/users/${uid}/boards`)
        //   .remove()
        //   .then(async () => {
        //     await firebase.database()
        //       .ref(`/users/${uid}/boards`)
        //       .set(payload)
        //       .then(() => {
        //         commit('updateColumns', payload)
        //       })
        //     // commit('updateColumns', payload)
        //   })
      } catch (e) { commit('errorHandler', e) }
    },
    async addTask({dispatch, commit}:any, {task, index, id}: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards/${id}/tasks`)
          .push({ name: task.name, isPrioritized: task.isPrioritized })
          .then((snapshot) => {
            task.id = snapshot.key
            commit('addTask', { index, task })
          })
      } catch (e) { commit('errorHandler', e) }
    },
    async editTask({dispatch, commit, state}:any, {index, i, columnID,  task}: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards/${columnID}/tasks`)
          .child(task.id)
          .update({ name: task.name })
          .then(() => { commit('editTask', { index, i, task }) })
      } catch (e) { commit('errorHandler', e) }
    },
    async deleteTask({dispatch, commit, state}:any, {index, columnID,  taskID}: any) {
      try {
        const uid = await dispatch('getUid')
        if (state.boards[index].tasks.length > 1) {
          await firebase.database()
            .ref(`/users/${uid}/boards/${columnID}/tasks`)
            .child(taskID)
            .remove()
            .then(() => { commit('deleteTask', { index, taskID }) })
        } else {
          await firebase.database()
            .ref(`/users/${uid}/boards/${columnID}/tasks`)
            .remove()
            .then(() => { commit('deleteTask', { index, taskID }) })
        }
      } catch (e) { commit('errorHandler', e) }
    },
    async prioritizeTask({dispatch, commit, state}:any, {index, i, columnID,  taskID}: any) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/boards/${columnID}/tasks`)
          .child(taskID)
          .update({ isPrioritized: !state.boards[index].tasks[i].isPrioritized })
          .then(() => { commit('prioritizeTask', { index, i }) })
      } catch (e) { commit('errorHandler', e) }
    }
  }
}
export default trello