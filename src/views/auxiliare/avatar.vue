<template>
    <div style="text-align: center; margin-left: 45vw;">
                <div style="display: inline-flex; width: 30vw;
                height: 6vh; 
                /* background-color: red; */
                text-align: center;  line-height: 6vh;
                position:absolute">
                <div class="avatar" style="
                    ">
                    <ion-icon class="iconAvatar" :icon="personCircle"></ion-icon>
                </div>
                <div class="username">
                    {{ store.getters.getUsername }}
                </div>
            </div>
            </div>
</template>
<script>
import { useStore } from 'vuex'
import { personCircle } from 'ionicons/icons'
export default {
    setup() {
        const store = useStore()
        return {
            store,personCircle,
        }
    },
}
</script>