<template>
    <div>
        <div v-if="allNotifs">
            <ion-list :inset="true">
                <ion-item v-for="(notif, index) in allNotifs" 
                    :class="index%2==0  ?'whitee' : 'blackee'"
                    style="margin-top: 10px;">
                    <span v-if="notif.motif == 'Depot'">
                        {{ index+1 }}. Vous avez déposés
                        une somme de {{ notif.amount }} ({{ notif.currency }})
                        sur votre compte à l'heure de {{ (notif.date_approved).slice(11, 16) }}.
                    </span>
                <span style="margin-right: .3rem;">&nbsp;</span>
                <span v-if="notif.motif == 'Retrait'">retire</span>
                <span v-if="notif.motif == 'Investir'">Investi</span>
                </ion-item>
            </ion-list>
        </div>
        

    </div>
    
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IonList, IonItem } from '@ionic/vue'
export default {
    components : {
        IonList, IonItem,
    },
    setup() {
        const store = useStore()
        const allNotifs = ref(null)
        
        
        async function kubaza(){
            const url = ' http://localhost:8002/jov/api/invest/allInvests/'
            const baseURL = '//127.0.0.1:8002'
            var suffix = '/jov/api/notif/getAll/'
            

            try {
                const response = await fetch(`${baseURL}${suffix}`,{
                    method: 'GET',
                    headers:{
                        // 'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                });

                if (response.ok){
                    allNotifs.value = await response.json()
                    console.log("NOTIFS: Things are well received")
                    console.dir(allNotifs.value)
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }
        kubaza()

        return {
            store, allNotifs,
        }
        
    },
}
</script>


