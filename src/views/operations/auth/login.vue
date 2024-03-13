<template>
    <feui-lle>
        <back-button></back-button>
        <div class="header">
            <signature-head></signature-head>
        </div>
        <!-- <br><br><br> -->
        <div class="same">
            <div class="usere">
                <h2 style="font-size: 5vh; margin-top: 22vh;">Se connecter</h2> <br>
                   
            </div>
            <div id="info">
                <p style="font-size: 3vh; margin-top: -3vh;">Veuillez remplir les informations ci-dessous pour vous connecter.</p>
            </div>
                <form>
                    <div class="usere">
                    <input class="fields" placeholder="Votre nom d'utilisateur" v/> <br>
                    <input class="fields" type="password" placeholder="Votre mot de passe"/> <br>
                    </div>
                    <br>
                    <div class="usere"  >
                        <router-link to="/hop">
                            <input  type="button" value="Connexion" router-link="/hop"/>
                        </router-link>
                        
                    </div>
                    <div class="usere">
                        <p style="font-size: 3vh;">Ou</p>
                    </div>
                    <div class="usere">
                        <router-link to="/registration" style="color:white">Créer un nouveau compte</router-link>
                    </div>
                    
                </form>
        </div>
    </feui-lle>
</template>

<script>
// import feuille from '@views/Layout/feuille.vue';
import feuille from '../../Layout/feuille.vue';
// import signatureHeadVue from '@views/signatureHead.vue';
import BackButton from '@views/auxiliare/backButton.vue'
import signatureHeadVue from '../../auxiliare/signatureHead.vue';
export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
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