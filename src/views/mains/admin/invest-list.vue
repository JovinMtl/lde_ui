<template>
    <p>Here is the list of investments</p>
    <ion-list>
        <ion-item></ion-item>
    </ion-list>
</template>

<script>
import { IonList, IonItem } from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        IonList, IonItem
    },
    setup() {
        const store = useStore()

        // function checkUser(){
        //     const lastActivity = (sessionStorage.getItem('lastActivity'))
        //     console.log("The lastActivity value: ", lastActivity)
        //     if(lastActivity !== 'null'){
        //         const currentTime = new Date()
                            
        //         var one = Date.parse(lastActivity)
        //         var two = Date.parse(currentTime)
        //         var diff = two - one
        //         var minutes = Math.floor((diff / 1000) / 60)
        //         console.log("THe diff : ", diff)
        //         console.log("Minutes : ", minutes)
        //         store.commit('setLastActivity', minutes)
        //     } else {
        //         store.commit('resetActiveUser')
        //         console.log("You're not connected")
        //     }
            

        // }
        // checkUser()
        
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
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }
        kubaza()
    },
}
</script>