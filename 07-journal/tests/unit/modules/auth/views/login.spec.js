import { shallowMount } from '@vue/test-utils'
import Login from '@/modules/auth/views/Login.vue'

import createVuexStore from '../../../mock-data/mock-store'

import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))




import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
  } from 'vue-router-mock'

  import { config } from '@vue/test-utils'
  
  // create one router per test file
  const router = createRouterMock()
  beforeEach(() => {
    injectRouterMock(router)
  })
  
  // Add properties to the wrapper
  config.plugins.VueWrapper.install(VueRouterMock)





describe('Pruebas en el Login Component', () => {
    
    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks() )


    test('debe de hacer match con el snapshot', () => {
        
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('credenciales incorrectas, disparar el SWAL', async() => {
        
        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })

        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        await wrapper.find('form').trigger('submit')
        expect( store.dispatch ).toHaveBeenCalledWith('auth/signinUser', { email: '', password: ''})
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Error en credenciales', 'error')
    })
    
    
    test('debe de redirigir a la ruta no-entry', async() => {
        
        store.dispatch.mockReturnValueOnce({ ok: true })

        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        const [ txtEmail, txtPassword ] = wrapper.findAll('input')
        await txtEmail.setValue('josealirivas2110@gmail.com')
        await txtPassword.setValue('12345678')

        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toHaveBeenCalledWith('auth/signinUser', { email: 'josealirivas2110@gmail.com', password: '12345678' })
        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'no-entry' })

        // console.log(wrapper.vm.userForm)
    })
    


})




