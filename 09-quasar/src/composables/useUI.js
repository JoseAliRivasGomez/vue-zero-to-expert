const { computed } = require("vue")
const { useStore } = require("vuex")


const useUI = () => {
    
    const store = useStore()

    return{
    //   sideMenuOpen: computed(() => store.getters['ui/isSideMenuOpen']),
      sideMenuOpen: computed({
        get(){
            return store.getters['ui/isSideMenuOpen']
        },
        set(value){
            store.commit('ui/toggleSideMenu')
        }
      }),
      toggleSideMenu(){
        store.commit('ui/toggleSideMenu')
      },
    }

}

export default useUI