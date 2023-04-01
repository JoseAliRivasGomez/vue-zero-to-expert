import { mount, shallowMount } from "@vue/test-utils"
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";


describe('PokemonPage', () => { 

    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    test('Debe de hacer match con el snapshot', () => { 

        expect(wrapper.html()).toMatchSnapshot() //or toMatchInlineSnapshot

    })

    test('Debe de llamar el mixPokemonArray al montar', () => { 

        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()
        
    })

    test('Debe de hacer match con el snapshot cuando cargan los pokemons', () => { 

        const wrapper = shallowMount(PokemonPage, { //el mount monta los componentes PokemonOptions y PokemonPicture, el shallowMount no
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
        
    })

    test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => { 

        const wrapper = shallowMount(PokemonPage, { //el mount monta los componentes PokemonOptions y PokemonPicture, el shallowMount no
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()

        expect(picture.attributes('pokemonid')).toBe('1')
        expect(options.attributes('pokemons')).toBeTruthy()
        
    })

    test('Pruebas con checkAnswer', async () => { 

        const wrapper = shallowMount(PokemonPage, { //el mount monta los componentes PokemonOptions y PokemonPicture, el shallowMount no
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[1],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(2)

        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[1].name}`)

        await wrapper.vm.checkAnswer(100)

        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[1].name}`)

    })

})