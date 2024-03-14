<template>
    <feui-lle>
        <div class="master" >
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
                <router-link to="/logi">
                    <input class="fields butto1" type="button" value="Se Connecter" router-link="/hope"/>
                </router-link>
                
            </div>
            <div class="buto2">
                <router-link to="/registration">
                    <input class="fields butto2" type="button" value="S'inscrire" router-link="/hope"/>
                </router-link>
                
            </div>   
        </div>
        <br><br><br>
        <br><br><br>
        <br><br><br>
        
        <signature-vide></signature-vide>
        
    </feui-lle>
</template>

<script>
import feuille from '../Layout/feuille.vue';
import signatureVide from '../auxiliare/signature-vide.vue';
import { IonButton, } from '@ionic/vue'
export default {
    components: {
        'feui-lle': feuille,
        'signature-vide': signatureVide,
        IonButton,
    },
    setup() {
        
    },
}
</script>
<style scoped>
.master{
    margin-left: 5vw;
    margin-top: -2vh;
}
.welcome{
    display: inline-flex;
    width: 90vw;
    height: calc(90vw * .98);
    background-image: url('/resources/logo/logo_home/welcomeLit.png');
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
    height: 6vh;
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
    margin-top: 5px;
    text-align: center;
}
.butto2{
    margin-top: 5px;
    text-align: center;
}
.fields{
    background-color: black;
    height: 30px;
    width: 33vw;
    border-radius: 15px;
    color: white;
    font-size: .9em;
  }
</style>