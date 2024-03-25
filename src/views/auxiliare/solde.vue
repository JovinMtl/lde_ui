
<template>
    <div class="same">
        <!-- <div class="headShower">
            <div class="shower">
                <div v-if="!soldeVisible" class="content">
                    <ion-icon :icon="eyeOff" @click="Invert" id="eye2" size="large"></ion-icon>
                    <p v-if="!soldeVisible" class="segoe">*******</p>
                </div>
                <div v-if="soldeVisible" class="visible">
                    <ion-icon :icon="eye"  @click="Invert" id="eye" size="large"></ion-icon> 
                    <p @click="Invert" 
                    class="segoe"><strong> {{ solde }} USDT </strong></p>
                </div>
            </div>
        </div> -->
        <br>
        <div class="headShower">
            <div class="shower" style="
                display: inline-flex;">
                <div v-if="!soldeVisible" class="content">
                    <ion-icon id="eyeInvisible"
                        :icon="eyeOff" @click="Invert" size="large"></ion-icon>
                    <span style="position: relative;left: 6.5rem; top: 0.45rem;"
                        v-if="!soldeVisible" class="segoe">*********</span>
                </div>
                <div v-if="soldeVisible">
                    <ion-icon id="eyeVisible"
                        :icon="eye"  @click="Invert" size="large"></ion-icon> 
                    <span @click="Invert" id="soldVisible"
                    class="segoe"><strong> {{ solde }} </strong></span>
                </div>
                <div style="display: inline-flex; position:relative; left: 4rem;
                        top: 0.35rem;"  v-if="soldeVisible">
                    <ion-select placeholder="USDT">
                        <ion-select-option value="apples">BIF</ion-select-option>
                        <ion-select-option value="oranges">KES</ion-select-option>
                        <ion-select-option value="bananas">FRW</ion-select-option>
                    </ion-select>
                </div>
            </div>
        </div>
        <br><br>
        <br><br>
    </div>
</template>

<script>
import { ref } from 'vue'
import { eyeOff, eye} from 'ionicons/icons'
import { IonSelect, IonSelectOption,} from '@ionic/vue'
export default {
    components:{
        IonSelect, IonSelectOption,
    },
    setup() {
        let soldeVisible = ref(false);
        let solde = 3000000
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
        padding-top: 50px;
    }
    .shower{
        display: inline-block;
        width: 280px;
        height: 55px;
        border-radius: 10px;
        border: 2px solid gray;
        box-shadow: 0 0 35px black;
    }
    .headShower{
        text-align: center;
    }
    .shower p{
        position: relative;
        display: inline-flex;
        bottom: 3px;
    }
    p{
        font-family: var(--ion-font-family, inherit);
    }
    #eyeInvisible{
        display: inline-flex;
        position: relative; 
        left: 4.6rem; 
        top: 0.85rem;
    }
    #eyeVisible{
        display: inline-flex;
        position: relative; 
        left: 1.5rem; 
        top: 0.78rem;
    }
    #soldVisible{
        position: relative;
        left: 3rem;
        top: 0.18rem;
    }

    
</style>

