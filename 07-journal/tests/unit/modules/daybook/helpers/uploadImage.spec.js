import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: 'dqf5buxhi',
    api_key: '434678388191695',
    api_secret: '5doJmGcQl3QFo1wK2SjH0sSZ1Pk',
})

describe('Upload Image', () => { 

    test('Debe de cargar un archivo y retornar el URL', async() => { 

        const {data} = await axios.get('https://res.cloudinary.com/dqf5buxhi/image/upload/v1680672461/journal-vue/nwwtxtbxzvqkhi3b5oiv.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg')

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length-1].replace('.jpg','')
        //console.log(imageId);
        await cloudinary.v2.api.delete_resources(['journal-vue/' +imageId])

    })

})