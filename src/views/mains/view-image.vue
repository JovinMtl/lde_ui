<template>
    <div style="text-align: center;">
        <p>Voici le Bordereau</p>
        <img :src="store.getters.getActualBordeau"
            style="border-radius: 10px;
            box-shadow: 0 0 35px black, 0 0 23px  black;"
             alt="Bordereau">
    </div>
    
</template>
<script>
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        
        return {
            store,
        }
        
    },
}
</script>