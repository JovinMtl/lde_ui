<template>
    <div id="back">
            <ion-button @click="getBack">
                <ion-icon :icon="chevronBack" size="large"></ion-icon>
            </ion-button>
    </div>
</template>

<script>
import { IonButton, IonIcon } from '@ionic/vue'
import { arrowBack, chevronBack } from 'ionicons/icons'
import { useRouter} from 'vue-router'

export default {
    components:{
        IonButton, IonIcon,
    },
    setup() {
        const router = useRouter()
        function getBack(){
            router.back()
        }
        return {
            arrowBack, chevronBack,
            getBack,
        }
    },
}
</script>