<template>
    <div id="back">
            <ion-button @click="getBack">
                <ion-icon :icon="chevronBack" size="large"></ion-icon>
            </ion-button>
    </div>
</template>

<script>
import { chevronBack } from 'ionicons/icons'
import { useRouter} from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        function getBack(){
            router.back()
        }
        return {
            chevronBack,
            getBack,
        }
    },
}
</script>