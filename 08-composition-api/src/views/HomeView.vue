<template>
  <div class="home">
    <h1>Reactive vs Ref</h1>
    <h3>{{ironMan}}</h3>
    <h3>{{batman}}</h3>

    <button @click="changeIronMan">Cambiar Iron Man</button>
    <button @click="changeBatman">Cambiar Batman</button>

    <h3>Iron Man: {{ironManIsAlive}}</h3>
    <h3>Batman: {{batmanIsAlive}}</h3>
    <button @click="changeStatus">Cambiar status</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'HomeView',
  setup() { //REACTIVE FUNCIONA SOLO CON OBJETOS, NO CON PRIMITIVOS
    const ironMan = ref({name: 'Tony', age: 50})
    const batman = reactive({name: 'Bruce', age: 45})

    let ironManIsAlive = reactive(false)
    const batmanIsAlive = ref(true)

    const changeStatus = () => {
      batmanIsAlive.value = !batmanIsAlive.value
      ironManIsAlive = !ironManIsAlive
    }

    return{
      ironMan,
      batman,
      ironManIsAlive,
      batmanIsAlive,

      changeStatus,
      changeIronMan: () => {
        ironMan.value.name = 'Tony Stark'
        ironMan.value.age = 55
      },
      changeBatman: () => {
        batman.name = 'Bruce Wayne'
        batman.age = 40
      },
    }
  }
}
</script>
