<template>
  <h1>Aprendiendo Slots</h1>
  <button @click="openModal">Abrir Modal</button>

  <modal v-if="isOpen" @on:close="closeModal" title="Hola" title2="Hola2">
    <!-- <p>Laborum eu cupidatat aliquip proident duis ipsum exercitation commodo exercitation elit proident.</p>
    <button>Salir</button>
    <h2>Titulo</h2> -->
    <template v-slot:footer>
        <button @click="closeModal">Salir</button>
    </template>
    <template v-slot:body>
        <p>Laborum eu cupidatat aliquip proident duis ipsum exercitation commodo exercitation elit proident.</p>
    </template>
    <template v-slot:header>
        <h2>Titulo</h2>
    </template>
    <template v-slot:exposed="{newTitle}">
        <h2>{{newTitle}}</h2>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

export default {
    components: {
        Modal
    },
    setup(){

        const isOpen = ref(false)

        return{
            isOpen,

            openModal: () => isOpen.value = true,
            closeModal: () => isOpen.value = false,
        }

    }
}
</script>

<style>

</style>