<template>
    <feui-lle>
        <back-button></back-button>
        <div class="loginPage" style="padding: 60px 0;">
            <div class="header">
                <signature-head></signature-head>
            </div>
            <div class="same">
                <div class="usere">
                    <h2 style="text-align: center;">S'inscrire</h2> <br>
                    
                </div>
                <div id="info">
                    <p style="font-size: 3vh; margin-top: -3vh;">Veuillez remplir les informations ci-dessous pour vous inscrire.</p>
                </div>
                    <form>
                        <div class="fields">
                            <input placeholder="Votre nom d'utilisateur"/> <br>
                            <input placeholder="Votre Email" type="email"/> <br>
                            <input placeholder="Votre Numéro de téléphone"/> <br>
                            <input type="password" placeholder="Tapez votre mot de passe"/> <br>
                            <input type="password" placeholder="Retapez votre mot de passe"/> <br>
                            <button  @click="LogUser">S'inscrire</button>
                        </div>
                        <br>
                        
                    </form>
            </div>
        </div>
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