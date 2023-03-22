const app = Vue.createApp({
    // template: `
    // <h1>Hola mundo</h1>
    // <p>{{1+1}}</p>
    // `

    data() {
        return {
            quote: 'I am Batman',
            author: 'Bruce Wayne'
        }
    },

    methods: {
        changeQuote(event) {
            //console.log('Thorin', event);
            this.author = 'Thorin'
            this.capitalize()
        },
        capitalize() {
            this.quote = this.quote.toUpperCase()
        }
    }

})

app.mount('#myApp')