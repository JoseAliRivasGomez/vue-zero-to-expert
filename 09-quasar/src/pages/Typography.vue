<template>
  <q-page class="flex column q-pa-md">
    <span class="text-h1">Headline 1</span>
    <span class="text-h2">Headline 2</span>
    <span class="text-h3">Headline 3</span>
    <span class="text-h4">Headline 4</span>
    <span class="text-h5">Headline 5</span>
    <span class="text-h6">Headline 6</span>
    <q-separator />
    <span class="text-subtitle1">Subtitle 1</span>
    <span class="text-subtitle2">Subtitle 2</span>
    <q-separator />
    <p class="text-body1">Dolore aliquip nisi do aliqua mollit tempor enim ea quis ipsum aliquip officia laboris. Magna ipsum magna do ex commodo minim. In consectetur officia sint deserunt. Veniam eu pariatur qui sunt cillum deserunt laboris id reprehenderit reprehenderit nulla excepteur irure ea. Nulla sint magna ullamco velit nostrud velit. Elit labore minim ea laboris ipsum ex est in excepteur dolor cillum do exercitation.</p>
    <p class="text-body2">Dolore aliquip nisi do aliqua mollit tempor enim ea quis ipsum aliquip officia laboris. Magna ipsum magna do ex commodo minim. In consectetur officia sint deserunt. Veniam eu pariatur qui sunt cillum deserunt laboris id reprehenderit reprehenderit nulla excepteur irure ea. Nulla sint magna ullamco velit nostrud velit. Elit labore minim ea laboris ipsum ex est in excepteur dolor cillum do exercitation.</p>
    <q-separator />
    <span class="text-weight-thin">Non deserunt est cillum velit excepteur ex sunt elit deserunt magna excepteur ea commodo.</span>
    <span class="text-weight-light">Minim excepteur occaecat in reprehenderit minim officia enim aute labore dolore aute consequat qui consequat.</span>
    <span class="text-weight-regular">Minim qui mollit ad elit consectetur.</span>
    <span class="text-weight-medium">Anim proident nostrud consectetur aliquip consequat sit esse laborum nostrud ad Lorem.</span>
    <span class="text-weight-bold">Adipisicing consequat ullamco ad anim id consequat dolore labore eu tempor reprehenderit proident cupidatat.</span>
    <span class="text-weight-bolder">Magna non deserunt cillum enim magna eu pariatur pariatur dolor quis fugiat cillum ullamco.</span>

    <q-btn color="primary" :label="sideMenuOpen ? 'Cerrar menu lateral' : 'Abrir menu lateral'" class="q-mt-md" @click="toggleSideMenu" />
  </q-page>
</template>

<script>
import useUI from 'src/composables/useUI'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Typography',
  setup(){
    const {sideMenuOpen, toggleSideMenu} = useUI()

    return {
      sideMenuOpen,
      toggleSideMenu,
    }
  }
})
</script>
