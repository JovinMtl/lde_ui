
<template>
    <div class="same">
        <div class="headShower">
            <div class="shower">
                <div v-if="!soldeVisible" class="content">
                    <ion-icon :icon="eyeOff" @click="Invert" id="eye2" size="large"></ion-icon>
                    <p v-if="!soldeVisible" class="segoe">*******</p>
                </div>
                <div v-if="soldeVisible" class="visible">
                    <ion-icon :icon="eye"  @click="Invert" id="eye" size="large"></ion-icon> 
                    <p @click="Invert" 
                    style="color: white;" class="segoe"><strong> {{ solde }} LiD </strong></p>
                </div>
            </div>
        </div>
        <br><br>
    </div>
</template>

<script>
import { ref } from 'vue'
import { eyeOff, eye} from 'ionicons/icons'
import { IonIcon} from '@ionic/vue'
export default {
    components: { IonIcon },
    setup() {
        let soldeVisible = ref(false);
        let solde = 3000
        function Invert(){
            soldeVisible.value = !soldeVisible.value
        }
        return {
            Invert,
            soldeVisible,
            solde,
            eyeOff,
            eye,
        }
    },
}
</script>

<style scoped>
    .same{
        /* background-color: #ab7400; */
        padding-top: 50px;
    }
    .shower{
        display: inline-block;
        width: 280px;
        height: 55px;
        border-radius: 10px;
        border: 2px solid black;
    }
    .headShower{
        text-align: center;
    }
    .shower ion-icon {
        position: relative;
        display: inline-flex;
        bottom: 0px;
        right: 20px;
    }
    .shower p{
        position: relative;
        display: inline-flex;
        bottom: 3px;
    }
    p{
        font-family: var(--ion-font-family, inherit);
    }
    #eye{
        position: relative;
        right: 1.5em;
        top: 0.2em;
    }
    #eye2{
        position: relative;
        /* top: 10px; */
        right: 1.5em;
        font-size: 15px;
        top: 0.2em;

    }
    .visible{
        /* margin-top: -20%; */
    }

    
</style>

