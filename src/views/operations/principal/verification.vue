<template>
    <base-menu pageTitle="Vérification">
        <template v-slot:back-left>
            <ion-icon :icon="chevronBack" slot="end" size="large">Back</ion-icon>
            <!-- <ion-back-button text="Retour"></ion-back-button> -->
        </template>
        <template v-slot:finish-right>
                <router-link to="/notif">
                    <ion-icon :icon="notificationsOutline" slot="end" size="large"></ion-icon>
                </router-link>
                <router-link to="/">
                    <ion-icon :icon="exitOutline" slot="end" size="large" @click="logOut"></ion-icon>
                </router-link>
                
        </template>
        <template v-slot:body-content>
            <veri-fica></veri-fica>
        </template>
        <template v-slot:Footer-menu>
            <router-link to="/hope">
                <ion-icon id="ico1" :icon="home" size="large"></ion-icon>
            </router-link>
            <router-link to="/histo">
                <ion-icon id="ico2" :icon="layers" size="large"></ion-icon>
            </router-link>
            <!-- <router-link to="/depot">
                <ion-icon id="ico3" :icon="wallet" size="large"></ion-icon>
            </router-link> -->
            <router-link to="/profile">
                <ion-icon id="ico4" :icon="returnDownForward" size="large"></ion-icon>
            </router-link>
            

            <ion-label id="lab1">Accueil</ion-label>
            <ion-label id="lab2">Historique</ion-label>
            <!-- <ion-label id="lab3">Portefeuille</ion-label> -->
            <ion-label id="labp4">Poursuivre</ion-label>
        </template>
            
    </base-menu>
</template>

<script>
import baseMenu from '../../Layout/base-menu.vue';
import veriFica from '../../mains/admin/veri-fica.vue';
import { 
    IonLabel,
} from '@ionic/vue'
import { 
    exitOutline,notificationsOutline,
    home, layers, wallet, personCircle,
    chevronBack, returnDownForward, returnDownForwardOutline, 
    returnDownForwardSharp,
} from 'ionicons/icons'
import { useStore } from 'vuex'
export default {
    components:{
        'base-menu' : baseMenu,
        'veri-fica': veriFica,
        IonLabel,
    },
    setup() {
        const store = useStore()


        function logOut(){
            store.commit('resetActiveUser')
        }
        return {
            exitOutline,notificationsOutline,
            home, layers, wallet, personCircle,
            chevronBack, returnDownForward, returnDownForwardOutline, 
            returnDownForwardSharp,
            store,

            logOut,
        }
    },
}
</script>



