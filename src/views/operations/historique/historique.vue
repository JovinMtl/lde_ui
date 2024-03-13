
<template>
    <base-menu pageTitle="Historique">
        <template v-slot:back-left>
            <ion-icon :icon="chevronBack" slot="end" size="large">Back</ion-icon>
            <!-- <ion-back-button text="Retour"></ion-back-button> -->
        </template>
        <template v-slot:finish-right>
                <ion-icon :icon="notificationsOutline" slot="end" size="large"></ion-icon>
                <router-link to="/">
                    <ion-icon :icon="exitOutline" slot="end" size="large"></ion-icon>
                </router-link>
                
        </template>
        <template v-slot:body-content>
            <!-- C'est ici votre Historique -->
            <histo-rique></histo-rique>
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
import baseMenu from '../../../Layout/base-menu.vue';
import histoRiqueVue from '../../mains/histo-rique.vue'
// import Solde from '../solde.vue'
// import signature from '../signature.vue';
import { 
    IonIcon, IonLabel, IonButtons, IonBackButton, 
} from '@ionic/vue'
import { 
    exitOutline,notificationsOutline,
    home, layers, wallet, personCircle,
    chevronBack,
} from 'ionicons/icons'
export default {
    components:{
        'base-menu' : baseMenu,
        'histo-rique': histoRiqueVue,
        IonIcon, IonLabel, IonButtons, IonBackButton,
        // retrForm,
    },
    setup() {
        return {
            exitOutline,notificationsOutline,
            home, layers, wallet, personCircle,
            chevronBack,
        }
    },
}
</script>