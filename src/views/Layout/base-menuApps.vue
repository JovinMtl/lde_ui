

<template>
    <base-menu :pageTitle="pageTitle ? pageTitle : 'Votre Depot'">
        <template v-slot:back-left v-if="bacArrow=='true'">
            <ion-icon :icon="arrowBack" size="large" class="bige"></ion-icon>
            <!-- <slot name="back-left"></slot> -->
        </template>
        <template v-slot:finish-right>
            <!-- <div class="right-icon"> -->
                <ion-icon :icon="notificationsOutline" slot="end" size="large"></ion-icon>
                <router-link to="/">
                    <ion-icon :icon="exitOutline" slot="end" size="large" @click="logOut"></ion-icon>
                </router-link>
                <!-- <ion-icon :icon="home" size="large"></ion-icon> -->
            <!-- </div> -->
        </template>
        <template v-slot:body-content>
            <slot></slot>
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
                    <ion-icon id="ico4" :icon="personCircle" size="large"></ion-icon>
                </router-link>
                

                <ion-label id="lab1">Accueil</ion-label>
                <ion-label id="lab2">Historique</ion-label>
                <!-- <ion-label id="lab3">Portefeuille</ion-label> -->
                <ion-label id="lab4">Profile</ion-label>
            </template>
    </base-menu>
</template>

<script>
import baseMenu from './base-menu.vue';
import { 
    notifications, exitOutline,notificationsOutline,
    home, layers, wallet, personCircle, layersOutline,
    arrowBack,
} from 'ionicons/icons'
import { IonIcon, IonLabel,} from '@ionic/vue'
import { useStore } from 'vuex'
export default {
    components:{
        'base-menu' : baseMenu,
        IonIcon, IonLabel
    },
    props:[
        'pageTitle',
        'baArrow',
    ],
    setup(props) {
        const store = useStore()

        function logOut(){
            store.commit('resetActiveUser')
        }
        return {
            notifications, exitOutline,notificationsOutline,
            home, layers, wallet, personCircle, layersOutline,
            arrowBack,
            pageTitle:props.pageTitle,
            bacArrow:props.baArrow,

            logOut,
        }
    },
}
</script>