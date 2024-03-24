<template>
    <div style="text-align: center;">
        <p>Tous les Dépôts combinés : Non Approuvés et Bien Approuvés</p>
        <ion-list v-for="(depot, index) in allDepots">
            <ion-item>
                Dépôt, {{ (depot.date_submitted).slice(11,16) }};
                {{ depot.owner }} <==> {{ depot.montant }} ({{ depot.currency }})
                <ion-thumbnail slot="start">
                    <img :src="'http://127.0.0.1:8002'+depot.bordereau"
                            
                            @click="turnImage($event.target.src)"
                            alt="Bordereau"  style="border-radius: 15px;
                            border: 1px solid orange;"
                            />
                </ion-thumbnail>
                <!-- <router-link to="/oimage">
                    <button :value="'http://127.0.0.1:8002'+depot.bordereau" 
                    @click="turnImage($event.target.value)"
                    style="margin: 5px 5px; padding: 5px 5px;">voir</button>
                </router-link> -->
                <span v-show="!depot.approved" style="display: flex;" >
                <button  :id="'jo'+index" :value="depot.link_to_approve" 
                    @click="kwemeza($event.target)"
                    style="height: 2em; margin: 5px 5px; background-color: orange;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Approuver
                </button>
                <button  :id="'jo'+index" :value="depot.link_to_approve" 
                    @click="kwemeza($event.target.value)"
                    style="height: 2em; margin: 5px 5px; background-color: red;
                            color: black;border-radius: 5px; padding: 0 5px;">
                    Refuser
                </button>
            </span>
            </ion-item>
        </ion-list>
        <div v-if="true">
            <empty-modal @byeModal="toogleModal" :modalActive="modalActive" erreur="false">
                <div style=" text-align: center; justify-content: center;
                justify-items: center; 
                /* font-size: 1.7rem; transform: translate(0%, 50%); */
                ">
                .
                <br><br>
                <h3>Rapport de votre opération</h3>
                <h5>Cette Recharge est approuvée avec succes.</h5>
                    
                </div>
                
            </empty-modal>
        </div>
        <!-- <div>
            <empty-modal></empty-modal>
        </div> -->

    </div>
    
</template>

<script>
import { IonThumbnail, IonList, IonItem, IonButton, } from '@ionic/vue'
import { reactive, ref, } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import emptyModal from '../../mains/emptyModal.vue'
import emptyModalVue from '../emptyModal.vue'
export default {
    components: {
        'empty-modal': emptyModal,
        IonThumbnail, IonList, IonItem, IonButton,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const allowImage = ref(false)
        const link = ref(null)

        const modalActive = ref(false)

        function toogleModal(value){
            modalActive.value = value
        }

        function turnImage(value){
            allowImage.value = !allowImage.value
            console.log("The link is : ", value)
            store.commit('setActualBordereau', value)
            link.value = value
            console.log("The committed value : ", store.getters.getActualBordeau)
            router.push('/oimage')
        }
        // const message = ref(null)
        const operationSuccess = ref(false)
        
        const allDepots = ref(null)
        var suffix = '/jov/api/depot/getDepotAll/'
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
                    allDepots.value = await response.json()
                    console.log("DEP-li-LIST: Things are well received")
                    console.dir(allDepots.value)
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }

        async function kwemeza(link){
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
                    allDepots.value.valueOf(5)[indexApproved].approved = true
                    operationSuccess.value = true
                    modalActive.value = true
                } else{
                    console.log("Cette RECHARGE n'est pas approuvee")
                    operationSuccess.value = false
                    modalActive.value = false
                }
            } catch(value){
                operationSuccess.value = false
                modalActive.value = false
            }
            
        }
        kubaza()

        return {
            allowImage, link,
            turnImage, kwemeza, toogleModal,
            allDepots,
            operationSuccess,
            modalActive,
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
