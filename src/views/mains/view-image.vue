<template>
    <div style="text-align: center;">
        <p>Voici le Bordereau</p>
        <img :src="store.getters.getActualBordeau" alt="Bordereau">
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