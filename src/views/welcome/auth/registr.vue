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
                <div class="message" v-show="error_form">

                    <span v-for="m in message">
                        <span>{{ m }}</span> .
                    </span>
                </div>
                <div>
                    <p>Error exist ? {{ error_form }}</p>
                </div>
                    <form>
                        <div class="fields">
                            <input placeholder="Votre nom d'utilisateur" @blur="chuser"
                                v-model="username"/> <br>
                            <input type="password" v-model="password1" @blur="chpw"
                                placeholder="Tapez votre mot de passe"/> <br>
                            <input type="password" v-model="password2" @blur="chpw2"
                                placeholder="Retapez votre mot de passe"/> <br>
                            <input placeholder="Votre Email" type="email" @blur="chemail"
                                v-model="email"/> <br>
                            <input placeholder="Votre Numéro de téléphone" @blur="chphone"
                                v-model="phone_number"/> <br>
                            
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
import { reactive, ref, computed } from 'vue'
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
        const message = ref(['','','','',''])
        const fautes = reactive({
            'chuser': false,
            'chemail': false,
            'chepw':false,
            'chpho': false,
        })

        const LogUser = ()=>{
            
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
                    message.value[0] = ''
                } else {
                    fautes.chuser = false
                    message.value[0] = "Ce nom d'utilisateur existe"
                }
                console.log("The valued returned is: ", reponse)
            } else if((username.value).length == 0) {
                message.value[0] = ''
                fautes.chuser = false
            }else {
                message.value[0] = "Votre nom d'utilisateur doit depasser 2 caracteres"
            }
        }
        const chemail = async ()=>{
            //ask the server if there is such an email unless it's > 0
            //if okay then : fautes.chemail = true
            const em = email.value
            
            if((em)){
                if(
                    (((String(em)).indexOf('@')>-1))&&
                    (((String(em)).indexOf('.')>-1)))
                    {

                
                    const eml = ((String(email.value)).length - 1)
                    const emll = ((em.split('@'))[0]).length - 1
                    const emlr = ((em.split('@'))[1]).length - 1
                    var prefix = '/jov/api/check/usernameExist/'
                    if (
                        ((em).indexOf('@') > 1) &&
                        (((em).split('@')).length == 2) &&
                        (((em.split('@'))[1])[0] != '.') &&
                        (((em.split('@'))[1])[0] != '@') &&
                        (((em.split('@'))[1])[0] != '_') &&
                        (((em.split('@'))[1]).indexOf('.') > -1) &&
                        (((em.split('@'))[0])[emll] != '.') &&
                        (((em.split('@'))[1])[emlr] != '.') &&
                        (((em.split('@'))[1])[emlr] != '-') &&
                        (((em.split('.'))[1]).length > 1) &&
                        (((em.split('.'))[0]).length > 1)
                    )
                    {
                        var reponse = await kubaza(prefix, em, 'email')

                        if(reponse){
                            fautes.chemail = true
                            message.value[1] = ''
                        } else {
                            fautes.chemail = false
                            message.value[1] = "Cet email existe"
                        }
                        console.log("Ce email pourrait etre valable")
                        message.value[1] = ''
                    } else{
                        message.value[1] = "Cet email est incorrect, '@-.'"
                        console.log("Cet email est incorrect")
                    }
                } else {
                    message.value[1] = "Cet email manque du @."
                }
                
            }else {
                message.value[1] = ''
                fautes.chemail = false
            }
        }
        const chpw = ()=>{
            //check if the length greater to 7
            //if okay then : fautes.chpw = true
            if((password1.value).length > 7){
                fautes.chpw = true
                message.value[2]=''
            } else {
                message.value[2] = "Le mot de passe doit depasser 7 caracteres"
            }
        }
        const chpw2 = ()=>{
            //check first that password2 is identical to password1
            if(pweq.value){
                message.value[3] = ''
            } else {
                message.value[3] = "Mot de passe non identique"
            }
            console.log("chpw2 asked: ", pweq.value)
        }
        const pweq = computed(()=>{
            return password2.value == password1.value
        })
        const chphone = ()=>{
            if(phone_number.value){
                const phone = (String(phone_number.value)).replaceAll(' ','')
                if(phone.length > 7){
                    fautes.chpho = true
                    message.value[4] = ''
                } else{
                    message.value[4] = 'Numero de telephone incorrect'
                }
            } else {
                fautes.chpho = false
                message.value[4] = ''
            }
        }

        const error_form = computed(()=>{
            if(message.value[0] || message.value[1] || message.value[2] || message.value[3]){
                return true
            } else {
                return false
            }
        })

        return {
            username, email, phone_number, password1,password2,
            message, error_form,
            chuser, chemail, chpw, chpw2, chphone,
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