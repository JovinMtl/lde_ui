<template>
    <div style="text-align: center;">
        <p style="margin-top: -40px; font-weight: bolder"
            class="centered">
            Tous les Dépôts combinés : Non Approuvés et Bien Approuvés
        </p>
        <ion-list v-for="(retrait, index) in allRetraits"  
            :inset="true">
            <ion-item :class="index%2==0  ?'whitee' : 'blackee'" 
                >
                Retrait, {{ (retrait.date_submitted).slice(11,16) }};
                {{ retrait.owner }} <==> {{ retrait.montant }} ({{ retrait.currency }})
                
                
                <span v-show="!retrait.approved" style="display: flex;" >
                <button  :id="'jo'+index" :value="retrait.link_to_approve" 
                    @click="kwemeza($event.target)"
                    style="height: 2em; margin: 5px 5px; background-color: orange;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Approuver
                </button>
                <button  :id="'jo'+index" :value="retrait.link_to_approve" 
                    @click="kwemeza($event.target.value)"
                    style="height: 2em; margin: 5px 5px; background-color: red;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Refuser
                </button>
            </span>
            </ion-item>
        </ion-list>
        <div v-show="waiting" style="background-color: transparent; position:fixed; 
                top: 60%; left: 50%; transform: translate(-50%, -50%);
                z-index: 5;">
            <!-- <ion-spinner color="danger" name="lines-sharp"></ion-spinner> -->
            <loa-der></loa-der>
        </div>
    </div>
    
</template>

<script>
import { 
    IonThumbnail, IonList, IonItem, IonButton, IonAlert, IonSpinner,
    alertController,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import Loader from '../../auxiliare/processing/processing1.vue'
// import emptyModal from '../emptyModal.vue'
export default {
    components: {
        'loa-der': Loader,
        'alert-controller': alertController,
        IonThumbnail, IonList, IonItem, IonButton, IonAlert, IonSpinner,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const link = ref(null)
        const waiting = ref(false)

        const alertButtons = ['Ok'];

        const presentAlert = async () => {
            const alert = await alertController.create({
                header: 'Opération réussie',
                message: 'Vous avez bien approuvé ce <strong>retrait</strong> .',
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

        const operationSuccess = ref(false)
        
        const allRetraits = ref(null)
        var suffix = '/jov/api/retrait/allRetraits/'
        var indexApproved = 0

        async function kubaza(){
            const url = ' http://localhost:8002/jov/api/invest/allInvests/'
            const baseURL = '//127.0.0.1:8002'
            

            try {
                const response = await fetch(`${baseURL}${suffix}`,{
                    method: 'GET',
                    headers:{
                        // 'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                });

                if (response.ok){
                    allRetraits.value = await response.json()
                    console.log("RETR-li-LIST: Things are well received")
                    console.dir(allRetraits.value)
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }

        async function kwemeza(link){
            waiting.value = true
            indexApproved = Number(link.id.slice(2))
            
            try{
                const responseActivate = await fetch(`${link.value}`,{
                    method: 'GET',
                        headers:{
                            'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                        },
                })
                if(responseActivate.ok){
                    const data = await responseActivate.json()
                    console.log("Vous avez bien approuvee cette Recharge ", data)
                    
                    
                    setTimeout(()=>{
                        allRetraits.value.valueOf(5)[indexApproved].approved = true
                        console.log("The result is okay, waiting: ", waiting.value)
                        waiting.value = false
                        presentAlert()
                    }, 3000)
                } else{
                    console.log("Cette RECHARGE n'est pas approuvee")
                    tokenExpiredAlert()
                    waiting.value = false
                }
            } catch(value){
                operationSuccess.value = false
                networkFailledAlert()
                waiting.value = false
            }
            
        }
        kubaza()

        return {
            link, 
            kwemeza, 
            allRetraits,
            alertButtons, 
            presentAlert, tokenExpiredAlert, networkFailledAlert,
            waiting,
        }
        
    },
}
</script>

<style scoped>
.fermer{
    /* background: red; */
    color: green;
    transform: translate(-1%, 230%);
}
</style>
