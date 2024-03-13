<template>
    <feui-lle>
        <template v-slot:Header-toolbar>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start" @click="getBack">
                        <slot name="back-left"/>
                    </ion-buttons>
                    <ion-title><h2>{{ pageTitle }}</h2></ion-title>
                    <ion-buttons slot="end">
                        <slot name="finish-right"/>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
        </template>
        <template v-slot:default>
            <slot name="body-content"></slot>
        </template>
        <template v-slot:Footer-toolbar>
            <ion-footer>
                <ion-toolbar class="botmenu">
                    <slot name="Footer-menu"/>
                </ion-toolbar>
            </ion-footer>
        </template>
    </feui-lle>
</template>

<script>
import Feuille  from './feuille.vue'
import { 
    IonButtons,IonTitle, IonToolbar, IonHeader, 
    IonFooter,
} from '@ionic/vue'
export default {
    props: [
        'pageTitle',
    ],
    components:{
        'feui-lle': Feuille,
        IonButtons,IonTitle, IonToolbar, IonHeader, 
        IonFooter,
    },
    methods: {
        getBack(){
            this.$router.back()
        },
    }

}
</script>