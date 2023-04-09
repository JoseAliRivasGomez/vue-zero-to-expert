<template>
  <q-page class="q-pa-md">
    <span class="text-h3">Forms</span>
    <q-separator spaced />

    <div class="row justify-center">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-sm col-xs-12 col-sm-12 col-md-6 q-pt-xl"
        >
          <q-input
            filled
            v-model="userForm.email"
            label="Correo electronico"
            type="email"
            lazy-rules
            no-error-icon
            :rules="[
              val => val && val.length > 0 || 'Este campo es obligatorio',
              isValidEmail
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="userForm.password"
            label="Repetir contraseña"
            lazy-rules
            no-error-icon
            :rules="[
              val => val && val.length > 0 || 'Este campo es obligatorio'
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="userForm.password2"
            label="Contraseña"
            lazy-rules
            no-error-icon
            :rules="[
              val => val && val.length > 0 || 'Este campo es obligatorio',
              isSamePassword
            ]"
          />

          <q-checkbox v-model="userForm.conditions" label="Acepto las condiciones y terminos" :style="userForm.errorInConditions && !userForm.conditions && 'color: red'" />

          <div class="row justify-end">
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn unelevated label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
    </div>
    
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useQuasar from 'quasar/src/composables/use-quasar.js';

export default defineComponent({
  name: 'Forms',
  setup () {
    const $q = useQuasar()

    const userForm = ref({
      email: '',
      password: '',
      password2: '',
      conditions: false,
      errorInConditions: false
    })

    return {
      userForm,

      onSubmit () {

        userForm.value.errorInConditions = false
        if(!userForm.value.conditions){
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'las la-exclamation-circle',
            message: 'Debes aceptar las condiciones y terminos primero'
          })
          userForm.value.errorInConditions = true
          return 
        }
        
      },

      onReset () {
        userForm.value = {
          email: '',
          password: '',
          password2: '',
          conditions: false,
          errorInConditions: false
        }
      },
      isValidEmail( val ) {
          const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
          return emailPattern.test(val) || 'El correo no parece ser válido';
      },
      isSamePassword(val){
        return (val === userForm.value.password) || 'Las contraseñas no son iguales'
      }
    }
  }
})
</script>
