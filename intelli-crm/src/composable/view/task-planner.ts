import { computed } from '@vue/composition-api';
// import { computed, ref } from '@vue/composition-api'
import { ref } from '@vue/composition-api'

export function addDeleteTasksHandler() {



  // const store: object
  // const computed: Function
  // const computed = ((store) => store.getters.columns)

  // const columns = computed((store) =>store.getters.columns)



    const addTask = (e: any, index: number, store: any, cb: Function) => {
      let task = {
        description: '',
        name: e.target.value,
        id: cb(),
        userAssigned: null
      }
      if (e.target.value) {
        store.commit('addTask', { task, index })
        e.target.value = ''
      }
    }

    const deleteTask = (index: number, id: string, store: any) => {
      store.commit('deleteTask', { index, id })
    }

    return { addTask, deleteTask }
}