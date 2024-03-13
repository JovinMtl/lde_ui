<template>
    <feui-lle>
        <back-button></back-button>
        <div class="header">
            <signature-head></signature-head>
        </div>
        <!-- <br><br><br> -->
        <div class="same">
            <div class="usere">
                <h2 style="font-size: 5vh; margin-top: 22vh;">S'inscrire</h2> <br>
                   
            </div>
            <div id="info">
                <p style="font-size: 3vh; margin-top: -3vh;">Veuillez remplir les informations ci-dessous pour vous inscrire.</p>
            </div>
                <form>
                    <div class="usere">
                        <input class="fields" placeholder="Votre nom d'utilisateur"/> <br>
                        <input class="fields" placeholder="Votre Email" type="email"/> <br>
                        <input class="fields" placeholder="Votre Numéro de téléphone"/> <br>
                        <input class="fields" type="password" placeholder="Tapez votre mot de passe"/> <br>
                        <input class="fields" type="password" placeholder="Retapez votre mot de passe"/> <br>
                        <div class="usere connexion"  >
                            <router-link to="/hope">
                            <input  type="button" value="S'inscrire" router-link="/hope"/>
                        </router-link>
                            
                        </div>
                        <!-- <input class="fields send"  type="button" value="Add Account" /> -->
                    </div>
                    <br>
                    
                </form>
        </div>
        <!-- <signature-vide></signature-vide> -->
    </feui-lle>
</template>

<script>
import feuille from '../../Layout/feuille.vue';
import signatureHeadVue from '../../auxiliare/signatureHead.vue';
import signaturevide from '../../auxiliare/signature-vide.vue'
import BackButton from '../../auxiliare/backButton.vue'
export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'signature-vide' : signaturevide,
        BackButton,
    },
    setup() {
    },
}
</script>

<style  scoped>
  a input{
    background-color: black;
    font-size: 4vh;
  }
  
</style>