
import {getEntriesByTerm } from "@/modules/daybook/store/journal/getters";
import { journalState } from "../../../mock-data/test-journal-state";
import { shallowMount } from "@vue/test-utils";
import EntryList from '@/modules/daybook/components/EntryList.vue'
import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('EntryList', () => { 

    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         //getEntriesByTerm: jest.fn(),
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }

    // const store = createStore({
    //     modules: {
    //         journal: {
    //             ...journalMockModule
    //         }
    //     }
    // })

    const store = createVuexStore(journalState)

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('Debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => { 

        expect(wrapper.findAll('entry-stub').length).toBe(2)
        expect(wrapper.html()).toMatchSnapshot()

    })

    test('Debe de llamar el getEntriesByTerm y filtrar las entradas', async() => { 

        const input = wrapper.find('input')

        await input.setValue('idk44')

        expect(wrapper.findAll('entry-stub').length).toBe(1)

    })

    test('El boton de nuevo debe de redireccionar a /new', () => { 

        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})

    })

})