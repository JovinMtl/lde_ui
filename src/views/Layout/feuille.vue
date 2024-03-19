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
    IonTitle,  
    IonHeader, 
    IonToolbar,
    IonFooter,
    IonBackButton,
    IonButtons,
} from '@ionic/vue'
import { useStore } from 'vuex'
export default {
    props: [
        'pageTitle'
    ],
    components:{
        IonTitle,
        IonHeader,
        IonToolbar,
        IonFooter,
        IonBackButton,
        IonButtons,
    },
    setup(){
        const store = useStore()

        
        function checkUser(){
            const lastActivity = sessionStorage.getItem('lastActivity')
            const currentTime = new Date()
            const differenceTime = currentTime.getTime() - lastActivity.getTime()
            console.log("The difference of time is : ", differenceTime)

        }
        checkUser()

        return {
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