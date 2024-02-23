<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ pageTitle }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot/>
        </ion-content>
            <ion-footer>
                <ion-toolbar>
                    Here is our footer
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
    }
}
</script>

<style scoped>
ion-header, ion-toolbar{
    background-color: white;
}
</style>