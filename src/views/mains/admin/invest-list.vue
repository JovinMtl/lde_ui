<template>
    <div>
        <p>Here is the list of investments</p>
    <ion-list v-for="(invest, index) in allInvests">
        <ion-item>{{ invest.owner }}, {{ invest.currency }},
            {{ invest.result }}, {{ (invest.date_submitted).slice(11,16)}}
            <span v-if="!invest.approved">
                <a :href="invest.link_to_approve">
                <ion-button>
                    <ion-icon :src="checkmarkDone"></ion-icon>
                    <!-- jonk -->
                </ion-button>
                </a>
            </span>
            
        </ion-item>
    </ion-list>
    <button value="jove" ref="approveLink" @click="kwemeza">Voici</button>
    <!-- <ol v-for="invest in allInvests">
        <li>{{ invest.owner }} jove</li>
    </ol>
    :class="index" value="jove" ref="approveLink" @click="kwemeza"
    <p>This is what we have {{ allInvests }}</p> -->
    </div>
    
</template>

<script>
import { IonList, IonItem, IonButton, IonIcon } from '@ionic/vue'
import { checkmarkDone } from 'ionicons/icons'
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        IonList, IonItem, IonButton, IonIcon
    },
    setup() {
        const store = useStore()
        const approveLink = ref(null)
        
        const allInvests = ref(null)

        async function kubaza(){
            const url = ' http://localhost:8002/jov/api/invest/allInvests/'
            const baseURL = '//127.0.0.1:8002'

            try {
                const response = await fetch(`${baseURL}/jov/api/invest/allInvests/`,{
                    method: 'GET',
                    headers:{
                        // 'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                });

                if (response.ok){
                    const data = await response.json()
                    allInvests.value = data
                    console.log("Things are well received")
                    console.log(allInvests.value)
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }

        function kwemeza(){
            console.log("The selected : ", approveLink.value.value)
        }
        kubaza()

        return {
            allInvests, approveLink,
            checkmarkDone,
            kwemeza,
        }
    },
}
</script>