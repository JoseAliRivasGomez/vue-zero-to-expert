import { createStore } from 'vuex'
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    todos: [
      {id: '1', text: 'Recolectar la piedra del alma', completed: true},
      {id: '2', text: 'Recolectar la piedra del poder', completed: true},
      {id: '3', text: 'Recolectar la piedra de la realidad', completed: false},
      {id: '4', text: 'Recolectar la piedra del tiempo', completed: false},
      {id: '5', text: 'Recolectar la piedra del espacio', completed: false},
      {id: '6', text: 'Recolectar la piedra de la mente', completed: false},
    ]
  },
  getters: {
    allTodos(state, getters, rootState){
      return state.todos
    },
    pendingTodos(state, getters, rootState){
      return state.todos.filter(todo => !todo.completed)
    },
    completedTodos(state, getters, rootState){
      return state.todos.filter(todo => todo.completed)
    },
    getTodosByTab: (_, getters, rootState) => (tab) => {
      switch (tab) {
        case 'all': return getters.allTodos
        case 'pending': return getters.pendingTodos
        case 'completed': return getters.completedTodos
      }
    },
  },
  mutations: {
    toggleTodo(state, id){
      const todoIdx = state.todos.findIndex(todo => todo.id === id)
      state.todos[todoIdx].completed = !state.todos[todoIdx].completed
    },
    createTodo(state, text = ''){
      if(text.length <= 1) return

      state.todos.push({
        id: uuidv4(),
        completed: false,
        text
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
