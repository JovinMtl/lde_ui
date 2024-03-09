<template>
    <feui-lle>
        <back-button></back-button>
        <div class="header">
            <signature-head></signature-head>
        </div>
        <!-- <br><br><br> -->
        <div class="same">
            <div class="centered">
                <h2>S'inscrire</h2> <br>
                   
            </div>
            <div id="info">
                <p>Veuillez remplir les informations ci-dessous pour vous inscrire.</p>
            </div>
                <form>
                    <div class="user">
                        <input class="fields" placeholder="Votre nom d'utilisateur"/> <br>
                        <input class="fields" placeholder="Votre Email" type="email"/> <br>
                        <input class="fields" placeholder="Votre Numéro de téléphone"/> <br>
                        <input class="fields" type="password" placeholder="Tapez votre mot de passe"/> <br>
                        <input class="fields" type="password" placeholder="Tapez encorevotre mot de passe"/> <br>
                        <div class="centered connexion"  >
                            <router-link to="/hop">
                                <input class="fields send" type="button" value="S'inscrire" router-link="/hop"/>
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
import signatureHeadVue from '../signatureHead.vue';
import signaturevide from '../signature-vide.vue'
import BackButton from '../auxiliare/backButton.vue'
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
.same{
    /* margin-top: 50px; */
    /* background-color: red; */
}
 .centered {
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  a input{
    background-color: black;
  }

 .fields{
    height: 30px;
    border-radius: 15px;
    padding-left: 10px;
  }
  .user {
    height: 150px;
    display: block;
    text-align: center;
    text-align: center;
    line-height: 50px;
  }
  #info{
    /* background-color: red; */
    margin-left: 8%;
    margin-right: 8%;
    text-align: center;
    color: white;
  }
  .send{
    color:rgb(136, 255, 0);
    justify-content: center;
    text-align: center;
    line-height: 100%;
  }
  
</style>