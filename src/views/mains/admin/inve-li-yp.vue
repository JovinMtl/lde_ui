<template>
    <div style="text-align: center;">
        <p style="margin-top: -40px; font-weight: bolder"
            class="centered">
            Tous les investissements Non Approuvés 
        </p>
        <ion-list v-for="(invest, index) in allInvests"  
            :inset="true">
            <ion-item :class="index%2==0  ?'whitee' : 'blackee'" 
                >
                Invest, {{ (invest.date_submitted).slice(11,16) }};
                {{ invest.owner }} <==> {{ invest.montant }} ({{ invest.currency }})
                
                
                <span v-show="!invest.approved" style="display: flex;" >
                <button  :id="'jo'+index" :value="invest.link_to_approve" 
                    @click="kwemeza($event.target)"
                    style="height: 2em; margin: 5px 5px; background-color: orange;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Approuver
                </button>
                <button  :id="'jo'+index" :value="invest.link_to_approve" 
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
    IonList, IonItem,
    alertController,
 } from '@ionic/vue'
import Loader from '../../auxiliare/processing/processing1.vue'
import { reactive, ref, onMounted, onBeforeUpdate, onUpdated, watch } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        'loa-der': Loader,
        IonList, IonItem,
    },
    setup() {
        const store = useStore()
        const waiting = ref(false)
        var indexApproved = 0

        const presentAlert = async () => {
            const alert = await alertController.create({
                header: 'Opération réussie',
                message: 'Vous avez bien approuvé cet <strong>investissement</strong> .',
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
            header: 'Opération echouée',
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
        
        const allInvests = ref(null)
        var suffix = '/jov/api/invest/needInvests/'

        async function kubaza(){
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
                    allInvests.value = await response.json()
                    console.log("INVE-List: Things are well received")
                    console.log(allInvests.value)
                } else {
                    tokenExpiredAlert()
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                networkFailledAlert()
                console.log("THe reason is : ", value)
            }
        }

        async function kwemeza(link){
            waiting.value = true
            indexApproved = Number(link.id.slice(2))
            // console.log("The click element: ", link.id.slice(2))


            try{
                const responseActivate = await fetch(`${link.value}`,{
                    method: 'GET',
                        headers:{
                            'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                        },
                })
                if(responseActivate.ok){
                    console.log("Vous avez bien approuvee cet investissement ")
                    setTimeout(()=>{
                        allInvests.value.valueOf(5)[indexApproved].approved = true
                        console.log("The result is okay, waiting: ", allInvests.value.valueOf(5)[indexApproved].approved)
                        waiting.value = false
                        presentAlert()
                    }, 3000)
                } else{
                    console.log("Cet investissement n'est pas approuvee")
                    waiting.value = false
                }
            } catch(value){
                operationSuccess.value = false
                waiting.value = false
            }
            
        }
        kubaza()

        return {
            allInvests, 
            waiting,
            kwemeza,
            presentAlert,
        }
    },
}
</script>