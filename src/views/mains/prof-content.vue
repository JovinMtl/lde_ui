<template>
    <!-- <p>Hello profile</p> -->
    <div style="margin-left: 10vw;margin-right: 10vw;">
        <ion-icon :icon="personCircle" style="font-size: 8vh; margin-top: 4vh; " ></ion-icon> 
        <span style="margin-right: .2rem;">&nbsp;</span> 
        <div style="margin-top: 7vh; display: inline-flex; 
            position: relative; width: 60vw; height: 8vh; top: -4.8vh; font-weight: bold;">
            <span style="font-size: 2.8vh;">{{ store.getters.getUsername }}</span> <br>
            <span style="position: absolute; margin-top: 3.8vh; font-size: 2.8vh;">+257 61 233 532</span>
        </div> <br>
        
    </div>
    <br><br>
    <router-link to="/chpa" style="text-decoration: none;">
        <div style="background-color: black; 
        height: 7.5vh; width: 80vw; padding-top: 1vh;
        border-radius: 12px; padding-left: 6vw; margin-left: 6vw;">
            <ion-icon :icon="fingerPrint" style="color: orange; font-size: 5vh;"></ion-icon>
            <span style="margin-right: .2rem;">&nbsp;</span> 
            <span class="textProfile">Changer le mot de passe</span> 

            <ion-icon :icon="chevronForward" style="position: absolute;
                left: 77vw; font-size: 5vh; color: orange;"></ion-icon>
        </div> 
    </router-link>
    <br><br>
    <a href="https://t.me/akarto48" previewlistener="true" style="text-decoration: none;">
        <div style="background-color: black; 
        height: 7.5vh; width: 80vw; padding-top: 1vh;
        border-radius: 12px; padding-left: 6vw; margin-left: 6vw; color: white;">
            <ion-icon :src="telegramLogo" style="color: orange; font-size: 5vh;"></ion-icon>
            <span style="margin-right: .2rem;">&nbsp;</span> 
            <span class="textProfile">
                Nous contacter</span> 

            <ion-icon :icon="chevronForward" style="position: absolute;
                left: 77vw; font-size: 5vh; color: orange;"></ion-icon>
        </div> 
    </a>
    
</template>
<script>
import {  IonList, IonItem, } from '@ionic/vue'
import { 
    fingerPrint, personCircle, 
    chevronForward,
} from 'ionicons/icons'
import { useStore } from 'vuex'

export default {
    components:{
        IonList, IonItem,
    },
    setup() {
        const store = useStore()
        const telegramLogo = '/resources/logo/logo_home/telegrame.svg'
        
        return {
            fingerPrint, personCircle, chevronForward,
            telegramLogo,
            store,
        }
    },
}
</script>

<style scoped>
ion-item{
    margin: 20px;
    color : black;
    border: 5px 5px red;
}
</style>