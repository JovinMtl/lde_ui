<template>
    <base-menu pageTitle="Bienvenue sur LD">
        <template v-slot:finish-right>
                <ion-icon :icon="notificationsOutline" slot="end" size="large"></ion-icon>
                <router-link to="/">
                    <ion-icon :icon="exitOutline" slot="end" size="large"></ion-icon>
                </router-link>
        </template>
        <template v-slot:body-content>
            <sol-de></sol-de> <br>
            <list-options></list-options><br>
            <sign-ature></sign-ature>
        </template>
        <template v-slot:Footer-menu>
            <router-link to="/hop">
                <ion-icon id="ico1" :icon="home" size="large"></ion-icon>
            </router-link>
            <router-link to="/histo">
                <ion-icon id="ico2" :icon="layers" size="large"></ion-icon>
            </router-link>
            <router-link to="/depot">
                <ion-icon id="ico3" :icon="wallet" size="large"></ion-icon>
            </router-link>
            <router-link to="/depot">
                <ion-icon id="ico4" :icon="personCircle" size="large"></ion-icon>
            </router-link>
            

            <ion-label id="lab1">Accueil</ion-label>
            <ion-label id="lab2">Historique</ion-label>
            <ion-label id="lab3">Portefeuille</ion-label>
            <ion-label id="lab4">Profile</ion-label>
        </template>
            
    </base-menu>
</template>

<script>
import baseMenu from '../../Layout/base-menu.vue';
import LisOp from '../operations/list-opt.vue'
import Solde from '../solde.vue'
import signature from '../signature.vue';
import { IonIcon, IonLabel, IonButtons, } from '@ionic/vue'
import { 
    exitOutline,notificationsOutline,
    home, layers, wallet, personCircle,
} from 'ionicons/icons'
export default {
    components:{
        'base-menu' : baseMenu,
        'list-options' : LisOp,
        'sign-ature': signature,
        'sol-de': Solde,
        IonIcon, IonLabel, IonButtons,
    },
    setup() {
        return {
            exitOutline,notificationsOutline,
            home, layers, wallet, personCircle,
        }
    },
}
</script>