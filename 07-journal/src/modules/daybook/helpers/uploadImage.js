import axios from "axios"


const uploadImage = async (file) => {
    if(!file) return

    try {

        const formData = new FormData()
        formData.append('upload_preset', 'journal-vue')
        formData.append('file', file)

        const url = 'https://api.cloudinary.com/v1_1/dqf5buxhi/image/upload'
        const {data} = await axios.post(url, formData)

        return data.secure_url
        
    } catch (error) {
        console.log('Error al cargar imagen');
        console.log(error);
        return null
    }
}

export default uploadImage