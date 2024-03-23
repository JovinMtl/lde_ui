<template>
    <div style="text-align: center;">
        <p>Here we see depot, we want to view an image</p>
        <img src="http://127.0.0.1:8002/prof/depots/image_RKJV27N.jpeg" 
            alt="Depot2" v-show="allowImage">
        <ion-list>
            <ion-item>
                Depot, <ion-thumbnail
                        @click="turnImage">
                    <img src="http://127.0.0.1:8002/prof/depots/image_RKJV27N.jpeg"
                            alt="Bordereau"  style="border-radius: 15px;
                            border: 1px solid orange;"/>
                </ion-thumbnail>
            </ion-item>
        </ion-list>

    </div>
    
</template>

<script>
import { IonThumbnail, IonList, IonItem, } from '@ionic/vue'
import { ref, } from 'vue'
import { all } from 'axios'
export default {
    components: {
        IonThumbnail, IonList, IonItem, 
    },
    setup() {
        const allowImage = ref(false)

        function turnImage(){
            allowImage.value = !allowImage.value
        }

        return {
            allowImage,
            turnImage,
        }
        
    },
}
</script>