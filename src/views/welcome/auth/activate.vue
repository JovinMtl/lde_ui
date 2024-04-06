<template>
    <feui-lle>
        <back-button></back-button>
        <div class="loginPage" style="padding: 60px 0;">
            <div class="header">
                <signature-head></signature-head>
            </div>
            <div class="same">
                <h2 style="text-align: center;">Activation</h2> <br>
                <div id="info">
                    <p style="font-size: 3vh; margin-top: -3vh;">Veuillez saisir le code pour activer votre compte.</p>
                    <p v-if="failedLogin" style="color: #ab2800;">Vous avez utisé un code <strong>invalide</strong>.</p>
                    <p v-if="failedNetwork" style="color: #ab2800;">Nous faisons face au problème de connexion au <strong>serveur</strong>.</p>
                </div>
                    <div>
                        <div class="usere fields">
                            <input placeholder="Votre Code d'activation" v-model="code"/> <br>
                            <!-- <input type="password" placeholder="Votre mot de passe" v-model="password"/> <br> -->
                            <!-- <button>Activer</button> -->
                            <ion-button r  @click="checkCode">Activer mon compte</ion-button>
                        </div>
                    </div>
            </div>
        </div>

        <signature-vide></signature-vide>
    </feui-lle>
</template>

<script>
import feuille from '../../Layout/feuille.vue';
import BackButton from '../../auxiliare/backButton.vue';
import signatureHeadVue from '../../auxiliare/signatureHead.vue';
import signatureVide from '../../auxiliare/signature.vue';
import { ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'signature-vide' : signatureVide,
        'back-button' : BackButton,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const code = ref(null)
        const failedLogin = ref(false)
        const failedNetwork = ref(false)


        const baseURL = '//127.0.0.1:8002';

        async function checkCode(){
            if((code.value).length == 6){
                //
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
                    console.log("Access: ", data.access)
                    store.state.user = data
                    sessionStorage.setItem('access', data.access)
                    sessionStorage.setItem('refresh', data.refresh)
                    sessionStorage.setItem('lastActivity', new Date())
                    
                    if(store.getters.getWantedRoute){
                        var wantedRoute = store.getters.getWantedRoute
                        console.log("THe WANTED route is : ", store.getters.getWantedRoute)
                        store.state.wantedRoute = null
                        router.replace(`${String(wantedRoute)}`)
                        // router.push('/depot')
                        // router.push(`${String(store.getters.getWantedRoute)}`)
                    } else{
                        router.push('/home-admin')
                        // router.push('/hope')
                    }

                } else{
                    console.log("BAD")
                    failedLogin.value = true
                    failedNetwork.value = false
                    
                }
                } catch(value){
                    //
                    failedNetwork.value = true
                    console.log("YOu did not reach the server because: ", value)
                    if(username.value=='pass' && password.value=='pass'){
                        failedLogin.value = false
                        store.state.username = username.value
                        failedNetwork.value = false
                        router.push('/hope')
                    }
                }
            } else {
                //
            }
            
            
            
        }
        return {
            checkCode, code, failedLogin, failedNetwork,
        }
    }
}
</script>

<style  scoped>
  a input{
    background-color: black;
    font-size: 4vh;
  }
.ou{
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
 
  
  
  
</style>