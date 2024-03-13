<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start" @click="getBack">
                    <slot name="back-left"/>
                </ion-buttons>
                <ion-title><h2>{{ pageTitle }}</h2></ion-title>
                <!-- <ion-buttons slot="end" @click="getBack"> -->
                <ion-buttons slot="end">
                    <slot name="finish-right"/>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot/>
        </ion-content>
            <ion-footer>
                <ion-toolbar class="botmenu">
                    <!-- Here is our footer -->
                    <!-- <ion-buttons slot="primary"> -->
                    <ion-buttons slot="start">
                        <slot name="bottom-menu"/>
                    </ion-buttons>
                </ion-toolbar>
            </ion-footer>
        
    </ion-page>
</template>

<script>
import { 
    IonPage, 
    IonTitle, 
    IonContent, 
    IonHeader, 
    IonToolbar,
    IonFooter,
    IonBackButton,
    IonButtons,
} from '@ionic/vue'
export default {
    props: [
        'pageTitle'
    ],
    components:{
        IonPage,
        IonTitle,
        IonContent,
        IonHeader,
        IonToolbar,
        IonFooter,
        IonBackButton,
        IonButtons,
    },
    methods: {
        getBack(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
ion-header, ion-toolbar{
    background-color: white;
}
.botmenu{
    background-color: blue;
    /* z-index: 5; */
    display: inline-flex;
    margin: 0px;
    padding: 0px;
  }
</style>