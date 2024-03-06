<template>
    <feui-lle>
        <div class="master">
            <div class="welcome">
                <!-- Home LIT -->
            </div>
        </div>

        <h2 id="cent">Bienvenue</h2>
        <p class="centi">Envoyez de l'argent, epargnez votre argent, Retirer votre argent,
            et bien plus de fonctionnalité
        </p>
        <div id="mastere">
            <div id="butto">
                <ion-button id="confirmButton"
                    style="margin-right: 2rem; margin-left: 1.35rem;" 
                    router-link="/logi">Se connecter</ion-button>
                <ion-button id="confirmButton" 
                    class="equal"
                    router-link="/registration">S'Inscrire</ion-button>
            </div>
        </div>
        
        <signature-vide></signature-vide>
        
    </feui-lle>
</template>

<script>
import feuilleVue from '../Layout/feuille.vue'
import signatureVide from './signature-vide.vue';
import { IonButton, } from '@ionic/vue'
export default {
    components: {
        'feui-lle': feuilleVue,
        'signature-vide': signatureVide,
        IonButton,
    },
    setup() {
        
    },
}
</script>
<style scoped>
.master{
    /* display: inline-flex; */
    /* background-color: green; */
    justify-content: center;
    align-content: center;
    text-align: center;
}
.welcome{
    display: inline-flex;
    /* background-color: red; */
    width: 90vw;
    /* height: 375px; */
    height: calc(90vw * .98);
    background-image: url('../../public/resources/logo/logo_home/HomeLde_2.png');
    background-size: cover;
}
/* ion-button{
    margin-left: 40px;
    margin-right: 10px;
} */
#butto{
    /* background-color: red; */
    /* margin-right: 25px; */
    margin-right: 1em;
    margin-left: 1em;
}
#cent{
    /* background-color: red; */
    text-align: center;
    margin-top: -10px;
    margin-bottom: -10px;
}
.centi{
    /* background-color: green; */
    text-align: center;
    margin-left: 15px;
    margin-right: 15px;
}
.equal{
    /* background-color: red; */
    width: 128px;
}
</style>