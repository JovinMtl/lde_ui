<template>
    <ion-page>
        <slot name="Header-toolbar"></slot>
        <ion-content>
            <slot/>
        </ion-content>
            <slot name="Footer-toolbar"></slot>  
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