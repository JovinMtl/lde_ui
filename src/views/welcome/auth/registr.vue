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
                    <p style="font-size: 3vh; margin-top: -3vh;">
                        Veuillez remplir les informations ci-dessous pour vous inscrire.
                        <span style="position: relative;top: 3px;left: 5px;">
                            <ion-icon :icon="informationCircleSharp" @click="turnHelp"
                            style="margin-top: -30px;"></ion-icon>
                        </span>
                        
                    </p>
                </div>
                <div class="message" >

                    <span v-for="m in message" v-show="error_form">
                        <span v-if="(m).length">{{ (m) }}</span> .
                    </span>
                </div>
                <div class="centered" v-show="showHelp">
                    <p>Y existe - t - il une erreur ? 
                        <span v-show="error_form" class="oui">Oui</span>
                        <span v-show="!error_form">Non</span> ; <br>
                     Et, tous les champs sont corrects ? 
                        <span v-show="fields_correct" class="oui">Oui</span>
                        <span v-show="!fields_correct">Non</span> .
                    </p>
                </div>
                    <div>
                        <div class="fields">
                            <input placeholder="Votre nom d'utilisateur" @blur="chuser"
                                v-model="username"/> <br>
                            <input type="password" v-model="password1" @blur="chpw"
                                placeholder="Tapez votre mot de passe"/> <br>
                            <input type="password" v-model="password2" @blur="chpw2"
                                placeholder="Retapez votre mot de passe"/> <br>
                            <input placeholder="Votre Email" type="email" @blur="chemail"
                                v-model="email"/> <br>
                            <input placeholder="Votre Numéro de téléphone" 
                                @blur="chphone" type="tel"
                                v-model="phone_number"/> <br>
                            <ion-button  
                                style="--color:white;" @click.prevent="LogUser">S'inscrire</ion-button>
                        </div>
                        <br>
                        <div class="centered">
                            <div>Ou</div>
                            <div>
                                <ion-button router-link="/activate">ACTIVER VOTRE COMPTE</ion-button>
                            </div>
                        </div>
                        
                    </div>
            </div>
        </div>
    </feui-lle>
</template>

<script>
import feuille from '../../Layout/feuille.vue';
import signatureHeadVue from '../../auxiliare/signatureHead.vue';
import signaturevide from '../../auxiliare/signature-vide.vue'
import BackButton from '../../auxiliare/backButton.vue'
import { IonIcon, alertController,} from '@ionic/vue'
import { 
    informationCircleSharp,
} from 'ionicons/icons'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components:{
        'feui-lle': feuille,
        'signature-head' : signatureHeadVue,
        'signature-vide' : signaturevide,
        BackButton, IonIcon, alertController,
    },
    setup() {
        const router = useRouter()
        const username = ref(null)
        const email = ref(null)
        const phone_number = ref(null)
        const password1 = ref(null)
        const password2 = ref(null)
        const showHelp = ref(false)
        const message = ref(['','','','',''])
        const fautes = reactive({
            'chuser': false,
            'chemail': false,
            'chepw':false,
            'chpho': false,
        })
        let good_number = 0

        const LogUser = async ()=>{
            
            //passwords && fautes.chpw && fautes.chemail && 
            // if((fields_correct.value && !error_form)||(fautes.chemail))
            if(fautes.chuser && fautes.chepw && fautes.chpho && fautes.chemail)
            {
                //sending now the data to the endpoint
                console.log("Les fautes n'existent pas: ", fields_correct.value,":", error_form.value)
                const userData = new FormData()
                userData.append('username', username.value)
                userData.append('password', password1.value)
                userData.append('email', email.value)
                userData.append('phone', good_number)

                const reponse = await kurungika(userData)
                if(reponse == 15){
                    presentAlert()
                    router.replace('/activate')
                }
                
            } else {
                console.log("LEs fautes existent :", message.value,":", fautes.value)
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
                    return 0 //if it exist
                } else {
                    return 1 //if it is not found
                }
            } catch(value){
                console.log("Returning 3")
                return 2 //if did not reach the server
            }
        }
        const kurungika = async (form)=>{
            const baseURL = '//127.0.0.1:8002' 
            const prefix = '/jov/api/fuser/poolUser/'

            try {
                const repo = await fetch(`${baseURL}${prefix}`,{
                    method: 'POST',
                    body: form,
                })
                const data = await repo.json()
                if(data){
                    console.log("La reponse est: ", data)
                    return 15
                } else {
                    console.log("Pas de reponse du serveur")
                    tokenExpiredAlert()
                    return 3
                }
            } catch(error){
                networkFailledAlert()
                console.log("Le serveur est injoignable : ", error)
                return 0
            }
        }
        const chuser = async ()=>{
            //ask the server that the username already exist
            //if okay then : fautes.chuser = true
            if((username.value).length > 2){
                var prefix = '/jov/api/check/usernameExist/'
                var reponse = await kubaza(prefix, username.value)

                // var data = await reponse.json()

                if(reponse == 1){
                    fautes.chuser = true
                    message.value[0] = ''
                    console.log("THe Username report: ", reponse)
                } else if(reponse == 0) {
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
                    var prefix = '/jov/api/check/emailExist/'
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

                        if(reponse == 1){
                            fautes.chemail = true
                            message.value[1] = ''
                        } else if(reponse ==0){
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
            if(password2.value == password1.value){
                message.value[3] = ''
                fautes.chepw = true
            } else {
                message.value[3] = "Mot de passe non identique"
                fautes.chepw = false
                console.log("The 2nd pass: ", password2.value)
            }
            console.log("chpw2 asked: ", password2.value == password1.value)
        }
        const pweq = computed(()=>{
            return password2.value == password1.value
        })
        const chNumber = (char_number)=>{
            var n_number = 0
            try{
                n_number = Number(char_number)
                if(n_number){
                    console.log("the good number is : ", n_number)
                    return n_number
                } else {
                    console.log("Enlever les lettres dans le numero de telephone")
                    message.value[3] = "Enlever les lettres dans le numero de telephone"
                    return 0
                }
            }catch(error){
                console.log("Things failed because: ", error)
                return 1
            }
        }
        const chphone = ()=>{
            // console.log("Checking phone number")
            // var good_number = 0

            if(phone_number.value){
                const phone = (String(phone_number.value)).replaceAll(' ','')
                good_number = String(chNumber(phone))
                if((phone[0] == '+')&&(good_number > 10)){
                    good_number = '+' + chNumber(phone)
                } else{}
                if(good_number.length > 7){
                    fautes.chpho = true
                    message.value[3] = ''
                } else{
                    message.value[4] = 'Numero de telephone invalide'
                    fautes.chpho = false
                }
            } else {
                fautes.chpho = false
                message.value[3] = ''
            }
        }

        const error_form = computed(()=>{
            if(message.value[0] || message.value[1] || message.value[2] || message.value[3])
            // if(message.value[0] && message.value[1] && message.value[2] && message.value[3])
            {
                return true
            } else {
                return false
            }
            // return (fautes.chuser && fautes.chepw && 
            //         fautes.chemail && fautes.chpho)
        })
        const fields_correct = computed(()=>{
            return (fautes.chuser && fautes.chepw && 
                    fautes.chemail && fautes.chpho)
        })
        const turnHelp = ()=>{
            showHelp.value = !showHelp.value
        }
        const presentAlert = async () => {
            const alert = await alertController.create({
                header: 'Activation requise',
                message: "Pour activer votre compte, veuillez utiliser le Code d'activation envoyé a votre addresse <strong>email</strong>. ",
                buttons: ['Ok'],
                mode: 'ios',
                backdropDismiss: false
            });

            // Displaying the alert with the correct HTML rendering
            await alert.present().then(() => {
                const element = document.querySelector('ion-alert .alert-message');
                if (element) {
                    element.innerHTML = element.textContent;
                }
            });
        };
        const tokenExpiredAlert = async () => {
            const alert = await alertController.create({
            header: 'Operation echoue',
            message: 'Veuillez vous reconnecter encore.',
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
            username, email, phone_number, password1,password2,
            message, error_form, fields_correct, showHelp,
            chuser, chemail, chpw, chpw2, chphone,
            LogUser, turnHelp,
            presentAlert, tokenExpiredAlert, networkFailledAlert,
            informationCircleSharp,
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
  .oui{
    color : white;
  }
  
</style>