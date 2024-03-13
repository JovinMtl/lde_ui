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
                    <input class="fields" placeholder="Votre nom d'utilisateur" v-model="username"/> <br>
                    <input class="fields" type="password" placeholder="Votre mot de passe" v-model="password"/> <br>
                    </div>
                    <br>
                    <div class="usere"  >
                        <router-link to="/hope">
                            <input  type="button" value="Connexion" router-link="/hope" @click="LogUser"/>
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
import { logIn } from 'ionicons/icons';
import feuille from '../../Layout/feuille.vue';
import BackButton from '../../auxiliare/backButton.vue';
import signatureHeadVue from '../../auxiliare/signatureHead.vue';
import { ref} from 'vue'
import { useStore } from 'vuex'

export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'back-button' : BackButton,
    },
    setup() {
        const store = useStore()
        const username = ref(null)
        const password = ref(null)

        var localHostEndpoint = "http://127.0.0.1:8000/jov/api/token/"
        var lanLocalhostEndpoint = "http://10.10.12.146:8000/jov/api/token/"

        async function LogUser(){
            const response = await fetch("http://10.10.12.146:8000/jov/api/token/", {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    username : username.value,
                    password : password.value,
                }),
            })
            if(response.ok){
                console.log("OKK : ", response)
                store.state.username = username.value
                const data = await response.json()
                console.log("The data is : ", data)
                store.state.user = data
            } else{
                console.log("BAD")
            }
            
        }
        return {
            LogUser, username, password,
        }
    }
}
</script>

<style  scoped>
  a input{
    background-color: black;
    font-size: 4vh;
  }
 

 
  
  
  
</style>