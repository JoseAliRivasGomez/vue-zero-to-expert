import axios from "axios";


const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyAJVgxk3PlfG2-xEkEteTKOfYnc1ULD8Uk'
    }
})

export default authApi