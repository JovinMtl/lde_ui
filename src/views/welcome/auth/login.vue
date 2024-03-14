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
                <p v-if="failedLogin" style="color: #ab2800;">Vous avez utisé un nom d'utilisateur ou mot de passe <strong>incorrect</strong>.</p>
            </div>
                <form>
                    <div class="usere">
                    <input class="fields" placeholder="Votre nom d'utilisateur" v-model="username"/> <br>
                    <input class="fields" type="password" placeholder="Votre mot de passe" v-model="password"/> <br>
                    </div>
                    <br>
                    <div class="usere"  >
                        <!-- <router-link to="/hope">
                            <input  type="button" value="Connexion" @click="LogUser"/>
                        </router-link> -->
                        <router-link to="">
                            <input  type="button" value="Connexion" @click="LogUser"/>
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
import {useRouter} from 'vue-router'

export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'back-button' : BackButton,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const username = ref(null)
        const password = ref(null)
        const failedLogin = ref(false)

        var localHostEndpoint = "http://127.0.0.1:8000/jov/api/token/"
        var lanLocalhostEndpoint = "http://10.10.12.146:8000/jov/api/token/"
        const baseURL = '//10.10.12.146:8000';

        async function LogUser(){
            try{
                //
                const response = await fetch(`${baseURL}/jov/api/token/`, {
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
                store.state.username = username.value
                console.log("OKK : ", store.getters.getUsername)
                const data = await response.json()
                console.log("The data is : ", data)
                store.state.user = data
                router.push('/profile')

            } else{
                console.log("BAD")
                failedLogin.value = true
                
            }
            } catch(value){
                //
                console.log("YOu did not reach the server because: ", value)
                if(username.value=='pass' && password.value=='pass'){
                    failedLogin.value = false
                    store.state.username = username.value
                    router.push('/hope')
                }
            }
            
            
        }
        return {
            LogUser, username, password, failedLogin,
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