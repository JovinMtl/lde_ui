<template>
    <div style="text-align: center;">
        <p style="margin-top: -40px; font-weight: bolder"
        class="centered">
            Les Retraits bien Approuvés.
        </p>
        <ion-list v-for="(retrait, index) in allRetraits"  
            :inset="true">
            <ion-item :class="index%2==0  ?'whitee' : 'blackee'" 
                >
                Retrait, {{ (retrait.date_submitted).slice(11,16) }};
                {{ retrait.owner }} <==> {{ retrait.montant }} ({{ retrait.currency }})
            </ion-item>
        </ion-list>
    </div>
    
</template>

<script>
import { 
    IonList, IonItem,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore} from 'vuex'
export default {
    components:{
        IonList, IonItem,
    },
    setup() {
        const store = useStore()
        const allRetraits = ref(null)

        async function kubaza(){
            console.log("RET-LI-LIST: Begin to Ask")
            const baseURL = '//127.0.0.1:8002'
            var suffix = '/jov/api/retrait/doneRetraits/'
            

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
                    console.log("RETR-Done-LIST: Things are well received")
                    console.dir(allRetraits.value)
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }

        kubaza()

        return {
            allRetraits,
        }
        
    },
}
</script>
