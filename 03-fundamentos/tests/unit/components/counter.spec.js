
import {shallowMount} from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter);
    })
  
    // test('Debe de hacer match con el snapshot', () => {
        
    //     expect(wrapper.html()).toMatchSnapshot();
  
    // })

    test('h2 debe de tener el valor por defecto "Counter"', () => { 

        expect(wrapper.find('h2').exists()).toBeTruthy()

        const h2Value = wrapper.find('h2').text() //first h2

        //console.log(h2.text());
        //console.log(h2.html());

        expect(h2Value).toBe('Counter')

    })

    test('El valor por defecto debe de ser 100 en el p', () => { 

        //const pTags = wrapper.findAll('p')
        const value = wrapper.find('[data-testid="counter2"]').text()

        //expect(pTags[1].text()).toBe('100')
        expect(value).toBe('100')

    })

    test('Debe de incrementar en 1 el valor del contador', async () => { 

        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');

        const value = wrapper.find('[data-testid="counter2"]').text()

        expect(value).toBe('101')

    })
  
  })