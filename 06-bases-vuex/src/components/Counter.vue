<template>
  <h1>Counter - Vuex</h1>
  <h2>Direct access: {{$store.state.counter.count}}</h2>
  <h2>Computed: {{countComputed}}</h2>

  <button @click="increment">+1</button>
  <button @click="incrementBy">+5</button>
  <button @click="incrementRandomInt" :disabled="isLoading">Random</button>

  <h1>mapState</h1>
  <h2>count: {{count}}</h2>
  <h2>lastMutation: {{lastMutation}}</h2>

  <h2>Direct getter: {{$store.getters['counter/squareCount']}}</h2>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  // computed: mapState(['count'])
  computed: {
    countComputed() {
      return this.$store.state.counter.count
    },
    ...mapState('counter', ['count', 'lastMutation', 'isLoading'])
    // ...mapState({
    //   count: state => state.counter.count,
    //   lastMutation: state => state.counter.lastMutation
    //   lastMutation: 'lastMutation'
    // })
  },
  methods: {
    increment(){
      this.$store.commit('counter/increment')
    },
    incrementBy(){
      this.$store.commit('counter/incrementBy', 5)
      //this.incrementRandomInt()
    },
    ...mapActions('counter', ['incrementRandomInt'])
    // ...mapActions('counter', {
    //   randomInt: 'incrementRandomInt',
    // })
    // incrementRandomInt(){
    //   this.$store.dispatch('counter', 'incrementRandomInt')
    // }
  }
}
</script>

<style>

</style>