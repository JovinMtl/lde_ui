<template>
    <div style="text-align: center;">
        <p>Here we see depot, we want to view an image</p>
        <!-- <img :src="link" 
            alt="Depot2" v-show="allowImage"> -->
        <ion-list v-for="depot in allDepots">
            <ion-item>
                Depot, <ion-thumbnail>
                    <img :src="'http://127.0.0.1:8002'+depot.bordereau"
                            alt="Bordereau"  style="border-radius: 15px;
                            border: 1px solid orange;"
                            />
                </ion-thumbnail>
                <!-- <router-link>
                    <ion-button>Ouvrir</ion-button>
                </router-link> -->
                <router-link to="/hope">
                    <button :value="'http://127.0.0.1:8002'+depot.bordereau" 
                    @click="turnImage($event.target.value)"
                    style="margin: 5px 5px; padding: 5px 5px;">voir</button>
                </router-link>
            </ion-item>
        </ion-list>

    </div>
    
</template>

<script>
import { IonThumbnail, IonList, IonItem, IonButton, } from '@ionic/vue'
import { ref, } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        IonThumbnail, IonList, IonItem, IonButton,
    },
    setup() {
        const store = useStore()
        const allowImage = ref(false)
        const link = ref(null)

        function turnImage(value){
            allowImage.value = !allowImage.value
            console.log("The link is : ", value)
            link.value = value
        }
        const message = ref(null)
        const operationSuccess = ref(false)
        
        const allDepots = ref(null)
        var suffix = '/jov/api/depot/getDepotAll/'

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
                    allDepots.value = await response.json()
                    console.log("DEP-li-LIST: Things are well received")
                    console.log(allDepots.value)
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
            allowImage, link,
            turnImage,
            allDepots,
        }
        
    },
}
</script>