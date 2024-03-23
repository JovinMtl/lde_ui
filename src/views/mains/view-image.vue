<template>
    <p>Here we view our photo</p>
    <img :src="store.getters.getActualBordeau" alt="Bordereau">
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