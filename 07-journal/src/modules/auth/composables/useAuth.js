import { computed } from "vue"
import { useStore } from "vuex"


const useAuth = () => {
    
    const store = useStore()

    const createUser = async(user) => {
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const loginUser = async(user) => {
        const resp = await store.dispatch('auth/signinUser', user)
        return resp
    }

    const checkAuthStatus = async () => {
        const resp = await store.dispatch('auth/checkAuthStatus')
        return resp
    }

    const logout = async () => {
        store.commit('auth/logout')
        store.commit('journal/clearEntries')
    }

    return {
        authStatus: computed(() => store.getters['auth/currentState']),
        username: computed(() => store.getters['auth/username']),

        createUser,
        loginUser,
        checkAuthStatus,
        logout
    }
}

export default useAuth