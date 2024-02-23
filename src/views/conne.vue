<template>
    <ion-page>
        <ion-content>
            <ion-img :src="homelde1"></ion-img><br>
            <h2>Bienvenue</h2>
            <p>Envoyez de l'argent, epargnez votre argent, Retirer votre argent,
                et bien plus de fonctionnalite
            </p>
            <ion-button router-link="/log">Se connecter</ion-button>
            <ion-button class="bigger" router-link="/signup">S'Inscrire</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonImg, IonButton} from '@ionic/vue'
export default {
    components: {
        IonPage,
        IonContent,
        IonImg,
        IonButton
    },
    data(){
        return {
            homelde: '../../resources/logo/welcome.png',
            homelde1: '../../resources/logo/HomeLde_skyblue.png'
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