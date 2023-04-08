import axios from "axios";


const journalApi = axios.create({
    baseURL: 'https://journal-vue-e7e40-default-rtdb.firebaseio.com'
})

journalApi.interceptors.request.use((config) => {

    config.params = {
        auth: localStorage.getItem('idToken')
    }

    // config.headers = {
    //     authorization: 'bearer idToken'
    // }

    return config
})

export default journalApi