<template>
    <template v-if="entry">
    <div  class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{day}}</span>
            <span class="mx-1 fs-3">{{month}}</span>
            <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
        </div>
        <div>
            <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpeg">
            <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary" @click="onSelectImage">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea v-model="entry.text" placeholder="Que paso hoy?"></textarea>
    </div>
        <img v-if="entry.picture && !localImage" :src="entry.picture" alt="Entry Picture" class="img-thumbnail">
        <img v-if="localImage" :src="localImage" alt="Entry Picture" class="img-thumbnail">
    </template>
    <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";
import Swal from 'sweetalert2'


export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    },
    data(){
        return{
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day(){
            const {day} = getDayMonthYear(this.entry.date)
            return day
        },
        month(){
            const {month} = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay(){
            const {yearDay} = getDayMonthYear(this.entry.date)
            return yearDay
        },
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {

            this.localImage = null
            this.file = null

            let entry
            if(this.id === 'new'){
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            }else{
                entry = this.getEntryById(this.id)
                if(!entry) return this.$router.push({name: 'no-entry'})
            }

            this.entry = entry
        },
        async saveEntry(){

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            if(this.file){
                const imageURL = await uploadImage(this.file)
                this.entry.picture = imageURL
            }
            
            if(this.entry.id){
                //console.log('update');
                await this.updateEntry(this.entry)
            }else{
                //console.log('create');
                const id = await this.createEntry(this.entry)

                this.$router.push({name: 'entry', params: {id}})
            }

            Swal.fire('Guardado', 'Entrada guardada con exito', 'success')
            this.file = null
        },
        async onDeleteEntry(){
            const {isConfirmed} = await Swal.fire({
                title: 'Esta seguro?',
                text: 'Una vez eliminado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if(isConfirmed){
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()

                await this.deleteEntry(this.entry.id)
                this.$router.push({name: 'no-entry'})

                Swal.fire('Eliminado', 'Entrada eliminada con exito', 'success')
            }
            
        },
        onSelectedImage(event){
            const file = event.target.files[0]
            if(!file){
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)

            
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
        }
    },
    created(){
        this.loadEntry()
    },
    watch: {
        id(value, oldValue){
            this.loadEntry()
        }
    }

}
</script>

<style lang="scss" scoped>

textarea{
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }
}

img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2)
}

</style>