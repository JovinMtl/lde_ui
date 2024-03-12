<template>
    <h3 class="usere whiter">
        Vous êtes sur le point de changer votre mot de passe.
    </h3>
    <ion-list>
        <ion-item>
        </ion-item>
        <ion-item>
            <ion-input label="Tapez" placeholder="Votre ancien mot de passe"></ion-input>
        </ion-item>
        <ion-item>
            <ion-input label="Tapez" placeholder="Votre nouveau mot de passe"></ion-input>
        </ion-item>
        <ion-item>
            <ion-input label="Retapez" placeholder="Votre nouveau mot de passe"></ion-input>
        </ion-item>
    </ion-list>
    <ion-button id="confirmButton" expand="block">Confirmer</ion-button>


</template>
<script>
import { IonList, IonItem, IonLabel, IonInput, IonButton, } from '@ionic/vue'
export default {
    components:{
        IonList, IonItem, IonLabel, IonInput, IonButton,
    },
    setup() {
        
    },
}
</script>