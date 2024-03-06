<template>
    <feui-lle>
        <back-button></back-button>
        <div class="header">
            <signature-head></signature-head>
        </div>
        <br><br><br>
        <div class="same">
            <div class="centered">
                <h2>Se connecter</h2> <br>
                   
            </div>
            <div id="info">
                <p>Veuillez remplir les informations ci-dessous pour vous connecter.</p>
            </div>
                <form>
                    <div class="user">
                    <input class="fields" placeholder="Votre nom d'utilisateur" v/> <br>
                    <input class="fields" type="password" placeholder="Votre mot de passe"/> <br>
                    </div>
                    <br>
                    <div class="centered connexion"  >
                        <router-link to="/hop">
                            <input  type="button" value="Connexion" router-link="/hop"/>
                        </router-link>
                        
                    </div>
                    <div class="centered">
                        <p>Ou</p>
                    </div>
                    <div class="centered">
                        <router-link to="/registration" style="color:white">créer un nouveau compte</router-link>
                    </div>
                    
                </form>
        </div>
    </feui-lle>
</template>

<script>
import feuille from '../../Layout/feuille.vue';
import signatureHeadVue from '../signatureHead.vue';
import BackButton from '../auxiliare/backButton.vue'
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
.same{
    margin-top: 50px;
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
    color: green;
    color: white;
    /* background-color: green !important; */
  }
  .user {
    height: 150px;
    display: block;
    text-align: center;
    text-align: center;
    line-height: 60px;
  }
  
</style>