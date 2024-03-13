

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
                    <ion-icon :icon="exitOutline" slot="end" size="large"></ion-icon>
                </router-link>
                <!-- <ion-icon :icon="home" size="large"></ion-icon> -->
            <!-- </div> -->
        </template>
        <template v-slot:body-content>
            <slot></slot>
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
import baseMenu from './base-menu.vue';
import { 
    notifications, exitOutline,notificationsOutline,
    home, layers, wallet, personCircle, layersOutline,
    arrowBack,
} from 'ionicons/icons'
import { IonIcon, IonLabel,} from '@ionic/vue'
import { useStore } from 'vuex'
import { 
    onBeforeMount, onMounted, onBeforeUpdate, 
    onUpdated, onBeforeUnmount, onUnmounted
} from 'vue'
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
        let devWidth = 0
        let devToolbarHeight = 0


        function readSize(){
            devWidth = Number(localStorage.getItem('devWidth'))
            devToolbarHeight = Number(localStorage.getItem('devToolbarHeight'))
            if(!store.state.devWidth){
                store.state.devWidth = devWidth
                store.state.devToolbarHeight = devToolbarHeight
            } 
            console.log("HOME-OP: The Known Size is :", devWidth, store.state.devWidth)
        }

        // readSize()

        function setMenuIcons(){
            const homeButton = document.getElementById('ico1');
            const homeLabel = document.getElementById('lab1');

            const historyButton = document.getElementById('ico2');
            const histoLabel = document.getElementById('lab2');

            const walletButton = document.getElementById('ico3');
            const walletLabel = document.getElementById('lab3');

            const profileButton = document.getElementById('ico4');
            const profileLabel = document.getElementById('lab4');

            
            var copta = 0
            const i = Number(devWidth / 7)
            console.log("HOME-OP:Attempting to apply : ", devWidth, "first: ", i)
            const newI = (i-(devWidth / 70))
            const i1 = newI
            const i2 = (i1 * 2) + (i1/10)
            const i3 = (i1 * 3) + (i1/10)
            const i4 = (i1 * 4) + (i1/10)
            homeButton.style.left = `${i1}px`
            homeLabel.style.left = `${i1}px`

            historyButton.style.left = `${i2+(i*0.5)}px`
            histoLabel.style.left = `${i2+(i*0.47)}px`
            

            if(devWidth < 470) {
                copta = 0.0
            } else if ((devWidth > 470) && (devWidth < 550)){
                copta = 0.02
            }else if ((devWidth > 550) && (devWidth < 640)){
                copta = 0.08
            } else if ((devWidth > 640) && (devWidth < 870)){
                copta = 0.12
            } else {
                copta = 0.2
            }
            walletButton.style.left = `${i3+(i*1.0)}px`
            walletLabel.style.left = `${i3+(i*(0.74135+copta))}px`

            profileButton.style.left = `${i4+(i*1.65)}px`
            profileLabel.style.left = `${i4+(i*1.65)}px`

            console.log("First: ", i1, "\n", "second :", i2, i3, ((devWidth-50)-i1))
            console.log("With Copta: ", copta)
            store.state.numberTaken++;
            console.log("SetUpMenu: ", store.state.numberTaken )
        }
        // setTimeout(()=>{
        //     setMenuIcons()
        // }, 20)
        
        onBeforeUpdate(function(){
            console.log("HOMEOP, OnBeforeUpdate")
            // getWth() //
            // setMenuIcons()
        })
        function showProps(props){
            console.log("BASE-MENU-APPS:This is prop ==> ", props.backArrow)
        }
        // showProps()
        return {
            notifications, exitOutline,notificationsOutline,
            home, layers, wallet, personCircle, layersOutline,
            arrowBack,
            pageTitle:props.pageTitle,
            bacArrow:props.baArrow
        }
    },
}
</script>