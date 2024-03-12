<template>
    <!-- <p>Hello profile</p> -->
    <div style="margin-left: 10vw;">
        <ion-icon :icon="personCircle" style="font-size: 8vh; margin-top: 4vh; " ></ion-icon> 
        <span style="margin-right: .2rem;">&nbsp;</span> 
        <span style="margin-top: 8vh; display: inline-flex; 
            position: relative; top: -5vh;">username</span> <br>
        <span style="margin-top: 8vh; display: inline-flex; 
            position: relative; top: -13vh; left:19vw;">+257 61 233 532</span>
    </div>
    <ion-list>
        <router-link to="/chpa" style="background-color: red;">
            <ion-item style="">
                <ion-icon :icon="fingerPrint"></ion-icon>
                <span style="margin-right: .2rem;">&nbsp;</span> 
                Changer le mot de passe
            </ion-item>
        </router-link>
        <a href="https://wa.me/+971563970168" style="background-color: red;">
            <ion-item style="">
                <ion-icon :icon="logoWhatsapp"></ion-icon>
                <span style="margin-right: .2rem;">&nbsp;</span> 
                Nous contacter
            </ion-item>
        </a>
    </ion-list>
</template>
<script>
import {  IonList, IonItem, IonIcon } from '@ionic/vue'
import { settings, fingerPrint, logoWhatsapp, personCircle, 
} from 'ionicons/icons'
export default {
    components:{
        IonList, IonItem, IonIcon,
    },
    setup() {
        return {
            settings, fingerPrint, logoWhatsapp, personCircle,
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