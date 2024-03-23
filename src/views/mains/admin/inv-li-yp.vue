<template>
    <div>
        <p>Here is the list of investments(Only Yet approved)</p>
    <ion-list v-for="(invest, index) in allInvests">
        <ion-item class="index">{{ invest.owner }}, {{ invest.currency }},
            {{ invest.result }}, {{ (invest.date_submitted).slice(11, 16)}}
            <span v-show="!invest.approved" >
                <button  :id="'jo'+index" :value="invest.link_to_approve" 
                    @click="kwemeza($event.target.value)"
                    style="height: 2em; margin: 8px 10px; background-color: orange;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Approuver
                </button>
                <button  :id="'jo'+index" :value="invest.link_to_approve" 
                    @click="kwemeza($event.target.value)"
                    style="height: 2em; margin: 8px 10px; background-color: red;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Refuser
                </button>
            </span>
            
        </ion-item>
    </ion-list>
    </div>
    <div style="background-color: white; text-align: center;">
        <p v-if="operationSuccess"> {{ message }}</p>
        <p v-else style="color: red;"> {{ message }}</p>
    </div>
    
</template>

<script>
import { IonList, IonItem, IonButton, IonIcon } from '@ionic/vue'
import { checkmarkDone, close } from 'ionicons/icons'
import { reactive, ref, onMounted, onBeforeUpdate, onUpdated, watch } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        IonList, IonItem, IonButton, IonIcon
    },
    setup() {
        const store = useStore()
        const message = ref(null)
        const operationSuccess = ref(false)
        
        const allInvests = ref(null)
        var suffix = '/jov/api/invest/doneInvests/'

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
                    allInvests.value = await response.json()
                    console.log("Things are well received")
                    console.log(allInvests.value)
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }

        async function kwemeza(link){
            console.log("The click element: ", link)


            try{
                const responseActivate = await fetch(`${link}`,{
                    method: 'GET',
                        headers:{
                            'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                        },
                })
                if(responseActivate.ok){
                    console.log("Vous avez bien approuvee cet investissement ")
                    message.value = "Vous avez bien approuvee cet investissement "
                    operationSuccess.value = true
                } else{
                    console.log("Cet investissement n'est pas approuvee")
                    message.value = "Cet investissement n'est pas approuvee"
                    operationSuccess.value = false
                }
            } catch(value){
                operationSuccess.value = false
                message.value = "Investissement non approuve, probleme de connexion."
            }
            
        }
        kubaza()


        return {
            allInvests, message, operationSuccess,
            checkmarkDone, close,
            kwemeza,
        }
    },
}
</script>