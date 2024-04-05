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
                <div class="message" v-show="message">
                    {{ message }}
                </div>
                    <form>
                        <div class="fields">
                            <input placeholder="Votre nom d'utilisateur" @blur="chuser"
                                v-model="username"/> <br>
                            <input placeholder="Votre Email" type="email" @blur="chemail"
                                v-model="email"/> <br>
                            <input placeholder="Votre Numéro de téléphone" v-model="phone_number"/> <br>
                            <input type="password" v-model="password1" @blur="chpw"
                                placeholder="Tapez votre mot de passe"/> <br>
                            <input type="password" v-model="password2"
                                placeholder="Retapez votre mot de passe"/> <br>
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
import { reactive, ref } from 'vue'
export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'signature-vide' : signaturevide,
        BackButton,
    },
    setup() {
        const username = ref(null)
        const email = ref(null)
        const phone_number = ref(null)
        const password1 = ref(null)
        const password2 = ref(null)
        const message = ref(['','','',''])
        const fautes = reactive({
            'chuser': false,
            'chemail': false,
            'chepw':false,
        })

        const LogUser = ()=>{
            //check first that password2 is identical to password1
            const passwords = password2 == password1
            //passwords && fautes.chpw && fautes.chemail && 
            if(fautes.chuser){
                //sending now the data to the endpoint
                console.log("Les fautes n'existent pas")
            } else {
                console.log("LEs fautes existent")
            }
        }
        async function kubaza (prefix, data, type='username'){
            //will ask if data(username or email) really exist or not
            const baseURL = '//127.0.0.1:8002'
            console.log("REGISTR-kubaza: Sending : ", data)
            console.log("Using prefix of : ", prefix)
            try{
                //
                const response = await fetch(`${baseURL}${prefix}`, {
                    //
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json' ,
                        // 'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                    body : JSON.stringify({
                        [type]: data,
                        // 'username' : 'jove',
                    })
                });
                const feedback = await response.json()
                if(feedback.rapport){
                    return 1 //if it exist
                } else {
                    return 2 //if it is not found
                }
            } catch(value){
                console.log("Returning 3")
                return 3 //if did not reach the server
            }
        }
        const chuser = async ()=>{
            //ask the server that the username already exist
            //if okay then : fautes.chuser = true
            if((username.value).length > 2){
                var prefix = '/jov/api/check/usernameExist/'
                var reponse = await kubaza(prefix, username.value)

                if(reponse){
                    fautes.chuser = true
                    message.value[0] = 'ok'
                } else {
                    fautes.chuser = false
                    message.value[0] = "Ce nom d'utilisateur existe."
                }
                console.log("The valued returned is: ", reponse)
            } else {
                message.value[0] = "Votre nom d'utilisateur doit depasser 2 caracteres."
            }
        }
        const chemail = async ()=>{
            //ask the server if there is such an email unless it's > 0
            //if okay then : fautes.chemail = true
            if(email.value.length > 6){
                var prefix = '/jov/api/check/usernameExist/'
                var reponse = await kubaza(prefix, email.value, 'email')

                if(reponse){
                    fautes.chemail = true
                    message.value[1] = 'ok'
                } else {
                    fautes.chemail = false
                    message.value[1] = "Cet email existe."
                }
            } else {
                message.value[0] = "Cet email doit depasser 6 caracteres."
            }
        }
        const chpw = ()=>{
            //check if the length greater to 7
            //if okay then : fautes.chpw = true
            if((password1.value).length > 7){
                fautes.chpw = true
            }
        }

        return {
            username, email, phone_number, password1,password2,
            message,
            chuser, chemail, chpw,
            LogUser,
        }
    },
}
</script>

<style  scoped>
  a input{
    background-color: black;
    font-size: 4vh;
  }
  .message{
    color: red;
  }
  
</style>