import { shallowMount } from "@vue/test-utils"
import AboutView from '@/views/AboutView'

describe('Pruebas en el About View', () => { 

    test('Debe de renderizar el componente correctamente', () => { 

        const wrapper = shallowMount(AboutView)
        expect(wrapper.html()).toMatchSnapshot()

    })

})