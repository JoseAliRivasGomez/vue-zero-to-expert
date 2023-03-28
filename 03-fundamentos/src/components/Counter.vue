<template>
  <!-- <h2>{{title || 'Counter'}}</h2> -->
  <h2>{{customTitle}}</h2>
  <p>{{counter}} <sup>2</sup> = {{getSQRT()}} </p>
  <p data-testid="counter2">{{counter}}</p>

  <p>{{counter}} <sup>2</sup> = {{squareCounter}} </p>
  <p>{{counter}} <sup>2</sup> = {{squareCounter}} </p> 

  <div>
    <button @click="increase">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
    // props: ['title', 'start'],
    props: {
        title: String,
        // title: [String, Number],
        start: {
            type: Number,
            default: 100,
            // required: true,
            validator(value) {
                return value >= 0
            }
        },
        propE: {
            type: Object,
            // Object or array defaults must be returned from
            // a factory function. The function receives the raw
            // props received by the component as the argument.
            default(rawProps) {
                return { message: 'hello' }
            }
        },
        // Custom validator function
        propF: {
            validator(value) {
                // The value must match one of these strings
                return ['success', 'warning', 'danger'].includes(value)
            }
        },
        // Function with a default value
        propG: {
            type: Function,
            // Unlike object or array default, this is not a factory 
            // function - this is a function to serve as a default value
            default() {
                return 'Default function'
            }
        }
    },
    name: 'Counter',
    data() {
        return {
            counter: this.start
        }
    },
    methods: {
        getSQRT() {
            //console.log('getSQRT');
            return this.counter * this.counter
        },
        increase() {
            return this.counter++
        },
        decrease() {
            return this.counter--
        }
    },
    computed: {
        squareCounter() {
            //console.log('computed getSQRT');
            return this.counter * this.counter
        },
        customTitle() {
            return this.title || 'Counter'
        }
    },
    
}
</script>

<style>
    button{
        background-color: #64bb87;
        border-radius: 5px;
        border: 1px solid white;
        margin: 0 5px;
        color: white;
        cursor: pointer;
        padding: 5px 15px;
        transition: 0.3s ease-in-out;
    }

    button:hover{
        background-color: #5aa67b;
        transition: 0.3s ease-in-out
    }
</style>