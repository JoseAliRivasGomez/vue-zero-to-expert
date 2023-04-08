import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const useTodos = () => {

    const store = useStore()
    const currentTab = ref('all')

    return{
        currentTab,
        all: computed(() => store.getters['allTodos']),
        pending: computed(() => store.getters['pendingTodos']),
        completed: computed(() => store.getters['completedTodos']),
        getTodosByTab: computed(() => store.getters['getTodosByTab'](currentTab.value)),
        
        toggleTodo: (id) => store.commit('toggleTodo', id),
        createTodo: (text) => store.commit('createTodo', text)
    }
    
}

export default useTodos