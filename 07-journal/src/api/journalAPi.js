import axios from "axios";


const journalApi = axios.create({
    baseURL: 'https://journal-vue-e7e40-default-rtdb.firebaseio.com'
})

export default journalApi