import authApi from "@/api/authAPI";


export const createUser = async ({commit}, user) => {
    const {name, email, password} = user

    try {
        const {data} = await authApi.post(':signUp', {email, password, returnSecureToken: true})
        const {idToken, refreshToken} = data
        //console.log(data)

        const resp = await authApi.post(':update', {displayName: name, idToken})
        //console.log(resp)

        delete user.password
        commit('loginUser', {user, idToken, refreshToken})

        return {ok: true}
    } catch (error) {
        //console.log(error.response)
        return {ok: false, message: error.response.data.error.message}
    }
}

export const signinUser = async ({commit}, user) => {
    const {email, password} = user

    try {
        const {data} = await authApi.post(':signInWithPassword', {email, password, returnSecureToken: true})
        const {idToken, refreshToken, displayName} = data
        user.name = displayName
        //console.log(data)

        delete user.password
        commit('loginUser', {user, idToken, refreshToken})

        return {ok: true}
    } catch (error) {
        //console.log(error.response)
        return {ok: false, message: error.response.data.error.message}
    }
}

export const checkAuthStatus = async ({commit}) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!idToken){
        commit('logout')
        return {ok: false, message: 'No hay token'}
    }

    try {
        const {data} = await authApi.post(':lookup', {idToken})
        //console.log(data)
        const {email, displayName} = data.users[0]

        const user = {
            name: displayName,
            email,
        }

        commit('loginUser', {user, idToken, refreshToken})

        return {ok: true}

    } catch (error) {
        commit('logout')
        return {ok: false, message: error.response.data.error.message}
    }
}