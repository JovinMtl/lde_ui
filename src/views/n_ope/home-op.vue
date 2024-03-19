<template>
    <base-menu pageTitle="Bienvenue sur LD">
        <template v-slot:finish-right>
                <ion-icon :icon="notificationsOutline" slot="end" size="large"></ion-icon>
                <router-link to="/">
                    <ion-icon :icon="exitOutline" slot="end" size="large" @click="logOut"></ion-icon>
                </router-link>
        </template>
        <template v-slot:body-content>
            <div class="avatar-container" v-if="store.getters.getLastActivity !== null">
                <ava-tar></ava-tar>
            </div>
            
            <div v-if="store.getters.getDevHeight < 600" id="soldeMarginTop">
                <sol-de ></sol-de> <br>   
            </div>
            <div v-else>
                <sol-de ></sol-de> <br> 
            </div>
            <list-options></list-options><br>
            <div v-if="store.getters.getDevHeight > 650">
                <sign-ature></sign-ature>
            </div>
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
import baseMenu from '../Layout/base-menu.vue';
import avatar from '../auxiliare/avatar.vue';
import LisOp from '../mains/list-opt.vue'
import Solde from '../auxiliare/solde.vue'
import signature from '../auxiliare/signature.vue';
import { IonLabel, IonButtons, } from '@ionic/vue'
import { 
    exitOutline,notificationsOutline,
    home, layers, wallet, personCircle,
} from 'ionicons/icons'
import { onMounted, } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        'base-menu' : baseMenu,
        'list-options' : LisOp,
        'sign-ature': signature,
        'sol-de': Solde,
        'ava-tar' : avatar,
        IonLabel, IonButtons,
    },
    setup() {
        const store = useStore()

        function logOut(){
            store.commit('resetActiveUser')
        }
        function getHeight(){
            const screenHeight = window.innerHeight

            // console.log("HOME-OP SETUP getHeight: size = ", screenHeight)
            store.commit("setDevHeight", {
                value: screenHeight,
            })

        }
        onMounted(()=>{
            getHeight()
        })

        return {
            exitOutline,notificationsOutline,
            home, layers, wallet, personCircle,
            store,

            logOut,
        }
    },
}
</script>

<style scoped>
    #soldeMarginTop{
        /* background-color: red; */
        margin-top: -2vh;
        margin-bottom: -11vh;
    }
</style>