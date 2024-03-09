<template>
    <feui-lle>
        <div class="master">
            <div class="welcome">
                <!-- Home LIT -->
            </div>
        </div>

        <h2 id="cent">Bienvenue</h2>
        <p class="centi">Envoyez de l'argent, epargnez votre argent, Retirer votre argent,
            et bien plus de fonctionnalité.
        </p>
        <div class="jove">
            <div class="buto1">
                <router-link class="butto1" to="/logi">
                    <button>Se connecter</button>
                </router-link>
                
            </div>
            <div class="buto2">
                <router-link class="butto2" to="/registration">
                    <button>S'inscrire</button>
                </router-link>
                
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
.welcome{
    display: inline-flex;
    width: 90vw;
    height: calc(90vw * .98);
    background-image: url('/resources/logo/logo_home/HomeLde_2.png');
    background-size: cover;
}

#cent{
    text-align: center;
    margin-top: -10px;
    margin-bottom: -10px;
}
.centi{
    text-align: center;
    margin-left: 15px;
    margin-right: 15px;
}
.jove{
    margin-left: 10vw;
    height: 5vh;
    width: 80vw;
}
.buto1{
    display: inline-flex;
    height: 100%;
    width: 50%;
    text-align: center;
    justify-content: center;

}
.buto2{
    display: inline-flex;
    height: 100%;
    width: 50%;
    justify-content: center;
    text-align: center;
}
.butto1{
    background-color: black;
    width: 89%;
    border-radius: 8px;
    margin-top: 5px;
}
.butto2{
    background-color: black;
    width: 89%;
    border-radius: 8px;
    margin-top: 5px;
}
button{
    background-color: black;
    justify-content: baseline;
}
</style>