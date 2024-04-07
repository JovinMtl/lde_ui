<template>
    <feui-lle>
        <back-button></back-button>
        <div class="loginPage" style="padding: 60px 0;">
            <div class="header">
                <signature-head></signature-head>
            </div>
            <div class="same">
                <h2 style="text-align: center;">Se connecter</h2> <br>
                <div id="info">
                    <p style="font-size: 3vh; margin-top: -3vh;">Veuillez remplir les informations ci-dessous pour vous connecter.</p>
                    <p v-if="failedLogin" style="color: #ab2800;">Vous avez utisé un nom d'utilisateur ou mot de passe <strong>incorrect</strong>.</p>
                    <p v-if="failedNetwork" style="color: #ab2800;">Nous faisons face au problème de connexion au <strong>serveur</strong>.</p>
                </div>
                <div class="loader" style="background-color: transparent; position:fixed; 
                                top: 60%; left: 50%; transform: translate(-50%, -50%);
                             z-index: 5;" v-show="waiting">
                            <!-- <ion-spinner></ion-spinner> -->
                            <loa-der></loa-der>
                        </div>
                    <div v-show="!waiting">
                        <div class="usere fields">
                            <input placeholder="Votre nom d'utilisateur" v-model="username"/> <br>
                            <input type="password" placeholder="Votre mot de passe" v-model="password"/> <br>
                            <!-- <button  @click="LogUser">Connexion</button> -->
                            <ion-button  @click="LogUser" mode="ios">Connexion</ion-button>
                        </div>
                        <div class="ou">
                            <div>Ou</div>
                            <router-link to="/registration" style="color: black">Créer un nouveau compte</router-link>
                        </div>
                    </div>
            </div>
        </div>
        
    </feui-lle>
</template>

<script>
import feuille from '../../Layout/feuille.vue';
import BackButton from '../../auxiliare/backButton.vue';
import Loader from '../../auxiliare/processing/processing1.vue'
import signatureHeadVue from '../../auxiliare/signatureHead.vue';
import { ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { 
    // IonSpinner, 
    IonButton,
    alertController ,
} from '@ionic/vue'

export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'back-button' : BackButton,
        'loa-der': Loader,
        IonButton,
        alertController,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const username = ref(null)
        const password = ref(null)
        const failedLogin = ref(false)
        const failedNetwork = ref(false)
        const waiting = ref(false)


        const baseURL = '//127.0.0.1:8002';

        async function LogUser(){
            waiting.value = true
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
                var permission = await knowCategory()
                store.commit('setIsStaff', permission.rapport)
                
                waiting.value = false
                if(store.getters.getWantedRoute){
                    var wantedRoute = store.getters.getWantedRoute
                    console.log("THe WANTED route is : ", store.getters.getWantedRoute)
                    store.state.wantedRoute = null
                    router.replace(`${String(wantedRoute)}`)
                    // router.push('/depot')
                    // router.push(`${String(store.getters.getWantedRoute)}`)
                } else{
                    if(store.getters.getIsStaff){
                        router.push('/home-admin')
                    } else{
                        router.push('/hope')
                    }
                }

            } else{
                waiting.value = false
                console.log("BAD")
                failedLogin.value = true
                failedNetwork.value = false
                tokenExpiredAlert()
                router.replace('/logi')
                
            }
            } catch(value){
                waiting.value = false
                failedNetwork.value = true
                console.log("YOu did not reach the server because: ", value)
                // if(username.value=='pass' && password.value=='pass'){
                //     failedLogin.value = false
                //     store.state.username = username.value
                //     failedNetwork.value = false
                //     router.push('/hope')
                // }
                networkFailledAlert()
                router.replace('/logi')
            }
            
            
        }
        const knowCategory = async()=>{
            var usercategory = 0

            try {
                const cate = await fetch(`${baseURL}/jov/api/check/askcate/`, {
                    headers: {
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                })
                if(cate.ok){
                    //
                    usercategory = await cate.json()
                    if(usercategory) return usercategory
                } else{
                    return 0
                }
                
            } catch(error){
                return error
            }
        }
        const tokenExpiredAlert = async () => {
            const alert = await alertController.create({
            header: 'Opération echouée',
            message: 'Mot de passe incorrect.',
            buttons: ['Ok'],
            });

            await alert.present();
        };
        const networkFailledAlert = async () => {
            const alert = await alertController.create({
            header: 'Operation echoue',
            // subHeader: 'A Sub Header Is Optional',
            message: 'Probleme de connexion au serveur.',
            buttons: ['Ok'],
            });

            await alert.present();
        };
        return {
            LogUser, username, password, failedLogin, failedNetwork,
            waiting
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