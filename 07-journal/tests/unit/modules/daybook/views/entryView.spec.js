
import { journalState } from "../../../mock-data/test-journal-state";
import { shallowMount } from "@vue/test-utils";
import EntryView from '@/modules/daybook/views/EntryView.vue'
import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import Swal from "sweetalert2";

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('EntryView', () => { 

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn() //Para no borrar datos en la DB

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-NSEsuO2kOUZd-Oy0Zbc'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('Debe de sacar al usuario porque el id no existe', () => { 

        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'No existe'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store],
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})

    })

    test('Debe de mostrar la entrada correctamente', () => { 

        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()

    })

    test('Debe de borrar la entrada y salir', (done) => { 

        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))

        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Esta seguro?',
            text: 'Una vez eliminado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })

        setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-NSEsuO2kOUZd-Oy0Zbc')
            expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
            done()
        }, 1000);
    

    })

})