import { createStore } from "vuex"
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('Vuex - Journal Module', () => { 

    //Basicas
    test('Este es el estado inicial, debe de tener este estado', () => { 

        const store = createVuexStore(journalState)

        const {isLoading, entries} = store.state.journal
        
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)

    })

    //Mutations
    test('Mutation setEntries', () => { 

        const store = createVuexStore({isLoading: true, entries: []})

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(4)
        expect(store.state.journal.isLoading).toBe(false)

    })

    test('Mutation updateEntry', () => { 

        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: '-NSEsuO2kOUZd-Oy0Zbc',
            date: 1680672516890,
            picture: "https://res.cloudinary.com/dqf5buxhi/image/upload/v1680672780/journal-vue/cxa0fo0zdzizc10dgq7e.jpg",
            text: "Pruebas"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)

    })

    test('Mutations createEntry y deleteEntry', () => { 

        const store = createVuexStore(journalState)

        store.commit('journal/createEntry', {id: 'ABC-777', text: 'Vegetta'})

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e => e.id === 'ABC-777')).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-777')
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === 'ABC-777')).toBeFalsy()

    })

    //Getters
    test('Getters getEntriesByTerm y getEntryById', () => { 

        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('idk44').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('idk44')).toEqual([entry2])

        expect(store.getters['journal/getEntryById']('-NSEsuO2kOUZd-Oy0Zbc')).toEqual(entry1)

    })

    //Actions
    test('Action loadEntries', async () => { 

        const store = createVuexStore({isLoading: true, entries: []})

        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(4)

    })

    test('Action updateEntry', async () => { 

        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: '-NSEsuO2kOUZd-Oy0Zbc',
            date: 1680672516890,
            picture: "https://res.cloudinary.com/dqf5buxhi/image/upload/v1680672780/journal-vue/cxa0fo0zdzizc10dgq7e.jpg",
            text: "Pruebas",
            otroCampo: true
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
            id: '-NSEsuO2kOUZd-Oy0Zbc',
            date: 1680672516890,
            picture: "https://res.cloudinary.com/dqf5buxhi/image/upload/v1680672780/journal-vue/cxa0fo0zdzizc10dgq7e.jpg",
            text: "Pruebas",
        })

    })

    test('Actions createEntry y deleteEntry', async() => { 

        const store = createVuexStore(journalState)

        const newEntry = {
            date: 1680672517890,
            text: "New",
        }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect(typeof id).toBe('string')

        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)

        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()

    })

})