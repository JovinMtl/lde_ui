<template>
    <ion-page>
        <ion-content>
            <ion-img :src="homelde"></ion-img><br>
            <h2>Bienvenue</h2>
            <p>Envoyez de l'argent, epargnez votre argent, Retirer votre argent,
                et bien plus de fonctionnalite
            </p>
            <ion-button id="confirmButton" router-link="/logi">Se connecter</ion-button>
            <ion-button id="confirmButton" class="bigger" router-link="/registration">S'Inscrire</ion-button>
            <signa-ture></signa-ture>
        </ion-content>
    </ion-page>
</template>

<script>
import signature from './signature.vue'
import { IonPage, IonContent, IonImg, IonButton} from '@ionic/vue'
import signatureVue from './signature.vue'
export default {
    components: {
        'signa-ture': signature,
        IonPage,
        IonContent,
        IonImg,
        IonButton
    },
    data(){
        return {
            homelde: 'public/resources/logo/logo_home/welcomeLit.png',
        }
    }
}
</script>

<style scoped>
ion-button{
    margin-left: 40px;
    margin-right: 10px;
}
.bigger{
    width: 130px;
}
p{
    margin: 18px;
    text-align: center;
}
h2{
    text-align: center;
}
</style>