<template>
        <ion-list>
                <ion-item>
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" 
                            justify="space-between" label="Retirer sur" 
                            placeholder="votre méthode de retrait" v-model="selectedItem">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.id"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>
                
                <ion-item>
                    <ion-label>Numero</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du bénéficiaire"
                        aria-label="du deposant" v-model="numero"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label>Nom</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du bénéficiaire"
                        aria-label="Nom et prenom du destinataire" 
                        type="text" v-model="benefitor"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="de votre retrait"
                        aria-label="du destinataire" type="number"
                        v-model="montant"></ion-input>
                </ion-item>
                
                <!-- <ion-button id="confirmButton" expand="block">Confirmer</ion-button> -->

            </ion-list>   
            <div class="loader" v-if="waiter" 
                style="background-color: transparent; position:fixed; 
                top: 60%; left: 50%; transform: translate(-50%, -50%);
                z-index: 5;"
                >
                <loa-der></loa-der>
            </div>
            <div class="home" v-if="respoOperation">
                <empty-modal @byeModal="toogleModal" :modalActive="modalActive" erreur="false">
                    <div class="modal-contente">
                        <h1 >Confirmation </h1>
                        <p>Merci pour votre dépôt. Nous traitons votre demande et vous informerons dès qu'elle sera approuvée. 
                            <br>
                            Veuillez vérifier votre boîte de notifications pour les mises à jour.
                            <br>
                            <span style="font-size: 2.3vh; display:inline-flex; position: relative; margin-top: 3vh">
                                Ceci pourra prendre au maximum 10 minutes.</span>
                        </p>
                    </div>
                </empty-modal>
            </div>
            <div class="home" v-if="!respoOperation">
                <empty-modal @byeModal="toogleModal" :modalActive="modalActive" erreur="true">
                    <div >
                        <h1 class="modal-content modal-content-erreur">Une erreur est survenue </h1>
                        <p>Nous n'avons pas pu finaliser votre opération suite à un problème de connexion au serveur.
                            
                            <br>
                            <span style="font-size: 2.3vh; display:inline-flex; position: relative; margin-top: 3vh">
                                Veuillez réessayer ultérieurement.</span>
                        </p>
                    </div>
                </empty-modal>
            </div>
            <br><br><br>
            <!-- <ion-button id="confirmButton" expand="block">Confirmer</ion-button> -->
            <!-- <ion-button v-show="!modalActive && selectedItem && waiter==false" id="confirmButton" expand="block" @click="toogleModal">Confirmer retrait</ion-button> -->
            <ion-button v-show="!modalActive && selectedItem" id="confirmButton" expand="block" @click="toogleModal">Confirmer retrait</ion-button>
</template>
<script>
import { 
    IonSelectOption, IonSelect, IonInput, 
    IonLabel, IonItem, IonButton, IonList,  
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import emptyModalVue from './emptyModal.vue'
import Loader from '../auxiliare/processing/processing1.vue'
export default {
    components: {
        'empty-modal' : emptyModalVue,
        'loa-der': Loader,
        IonSelectOption, IonSelect, IonInput, 
        IonLabel, IonItem, IonButton, IonList,  
    },
    setup() {
        //Start of things of submitting the form
        const numero = ref(null)
        const benefitor = ref(null)
        const montant = ref(null)
        const respoOperation = ref(false)
        const depotUrl = 'http://127.0.0.1:8002/jov/api/principal/receiveDepot/'
        const baseURL = '//127.0.0.1:8002'
        async function kurungika(){
            //
            // currency is already defined at line 239
            const formToBeSent = new FormData()
            formToBeSent.append('currency', currency.value)
            formToBeSent.append('numero', numero.value)
            formToBeSent.append('benefitor', benefitor.value)
            formToBeSent.append('montant', montant.value)
            console.log("The montant is : ", montant.value)
            
            try{
                const response = await fetch(`${baseURL}/jov/api/retrait/receiveRetrait/`, {
                    method:'POST',
                    headers: {
                        // 'Content-type' : 'form-data',
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                        // 'Content-Type':'application/octet-stream' //when file
                    },
                    body: formToBeSent,
                })
                // const response = await axios.post(`${baseURL}/jov/api/retrait/receiveRetrait/`, formToBeSent, {
                //     headers: {
                //         'Authorization': 'Bearer ' + store.getters.getAccessToken,  // Include the authorization header
                //     },
                // });
                if(response.ok){
                    console.log("La reponse est bien: ", response)
                    console.log("The sent Token: ", store.getters.getAccessToken)
                    respoOperation.value = true
                } else{
                    console.log("La reponse n'est pas bon")
                    console.log("The sent Token: ", store.getters.getAccessToken)
                    respoOperation.value = false
                }
            }catch(value){
                // console.log("VOus avez rencontre une erreur supprenant : ", value)
                respoOperation.value = false
            }
        }
        //End of things of submitting the form
        //Begin of Managing the waiter
        const waiter = ref(false)
        //Ending of Managing the waiter
        //Start of MODAL
        const modalActive = ref(false)
        const infoModal = ref(false)
        const toogleModal = ()=>{
            if(infoModal.value){
                infoModal.value = false
                return 0
            }
            if(!waiter.value){
                waiter.value = true
                console.log("START SENDING ...")
                kurungika()
                console.log("END SENDING")
                setTimeout(()=>{
                    modalActive.value = !modalActive.value
                }, 5000)
            } else {
                waiter.value = false
                modalActive.value = !modalActive.value
            }
            
            
        }

        //End of Modal
            //Beginning of Things for Currencies
        const store = useStore()
        const paymethod = ref(null)
        const selectedItem = ref(null)
        const allElements = [ 1,2,3,4,5,6,7,8,9,10,11]
        var wanted = []
        const payes = [
                {
                    id: 1,
                    name:'US Dollar',
                    country: 'International',
                    abbreviation: 'USD',
                },
                {
                    id: 2,
                    name:'Fbu',
                    country: 'Bi',
                    abbreviation: 'BIF',
                },
                {
                    id: 3,
                    name: 'Frw',
                    country: 'Rw',
                    abbreviation: 'RWF',
                },
                {
                    id: 4,
                    name: 'ShillingKenya',
                    country: 'Ke',
                    abbreviation: 'KES',
                },
                {
                    id: 5,
                    name:'Ugshilling',
                    country: 'Ug',
                    abbreviation: 'UGX',
                },
                {
                    id: 6,
                    name: 'ShillingTanzania',
                    country: 'Tz',
                    abbreviation: 'Tsh',
                },
                {
                    id: 7,
                    name: 'Kwacha',
                    country: 'Zm',
                    abbreviation: 'ZMW',
                },
                {
                    id: 8,
                    name: 'Euro',
                    country: 'International',
                    abbreviation: 'EUR',
                },
                {
                    id: 9,
                    name:'USDT',
                    country: 'Crypto',
                    abbreviation: 'USDT',
                },
                {
                    id: 10,
                    name: 'TRX',
                    country: 'Crypto',
                    abbreviation: 'USD',
                },
                {
                    id: 11,
                    name: 'Lit Dinar',
                    country: 'Principale',
                    abbreviation: 'LID',
                },
            ]
        //this finished will contain the compiled pay methods
        const finished = ref([])
        let currency = ref('')

        function chunk(){
            //Makes a set of TOP5 and all the number and make sure no double entry remains
            var combiNEd = store.state.top5.concat(allElements)
            let uniqueValuesSet = new Set(combiNEd);
            wanted = Array.from(uniqueValuesSet);
            // console.log("INVEST CHUNK: the wanted BEFORE action: ", wanted)
            let nonZero = []
            wanted.forEach((value)=>{
                if(value !== 0){
                    nonZero.push(value)
                }
            })
            wanted = nonZero
            // console.log("INVEST CHUNK: the wanted AFTER action: ", wanted)
        }
        function construct(){
            // This is for constructing the new object of options 
            // according the wanted array
            var fini = []
            const max = wanted.length
            //the array that contains the ordering in number
            for (let i=0; i < max; i++){
                payes.forEach((data)=>{
                    if (wanted[i] == data.id){
                        let jove = {
                            'id' : data.id,
                            'name' : data.name,
                            'country' : data.country,
                            'abbreviation': data.abbreviation,
                        }
                        fini.push(jove)
                    }
                })
            }
            finished.value = fini
            console.log("INVESTED CONSTRUCT: finished has : ", finished.value)
            // console.log("INVESTED CONSTRUCT: and Payes has : ", payes)
        }
        function updateTop5(){
            // to add the newly selected options to be the first in TOP5
            store.commit('addTop5', {value: selectedItem.value})
        }
        function downloadTop5(){
            // to be called on exit or onBeforeunmounted
            localStorage.setItem('top5', store.getters.getTop5)
        }
        function uploadTop5(){
            // load the Top5 value stored locally and upload them to the store
            // To BE CALLED on onMOunted
            // console.log("store Before upload :", store.getters.getTop5)
            const storedTop5 = localStorage.getItem('top5')
            store.dispatch('uploadTop5', storedTop5)
            // console.log("store After upload :", store.getters.getTop5)
        }
        function updateOptions(){
            // makes call of chunk() and construct, should begin by 
            //by updating the top5
            chunk()
            construct()
        }
        function initFunctions(){
            // console.log("INVEST SETUP: START Initialization")
            uploadTop5() //slightly
            updateOptions()
            // console.log("INVEST SETUP: END Initialization")
        }
        initFunctions()
        watch(selectedItem, (value)=>{
            if(finished){
                currency.value = payes[value - 1].abbreviation
                console.log("Finished is available : ", currency.value)
                // console.log("Sel : ", selectedItem.value, " Val: ", value)
            } else {
                console.log("Finished is not available")
            }
        })
        onBeforeUpdate(()=>{
            // console.log("INVEST onBeforeUpdate: Start")
            updateTop5()
            // showTop5()
            updateOptions()
            console.log("Here, the currency is : ", currency.value)
            // console.log("INVEST onBeforeUpdate: Downloading...")
            // downloadTop5()
            // console.log("INVEST onBeforeUpdate: End")
        })
        onBeforeUnmount(()=>{
            // console.log("INVEST: You are about to leave me, ONBEFOREUNMOUNT")
            // console.log("INVEST: Now downloading, ONBEFOREUNMOUNT")
            if(selectedItem.value){
                updateTop5()//only if i want to find the last input in the next component
                downloadTop5()
                // console.log("INVEST ONBEFOREUNMOUNT: have downloaded: ", selectedItem.value)
            } else{
                // console.log("INVEST: didn't download, ONBEFOREUNMOUNT")
            }
            // console.log("INVEST: END downloading, ONBEFOREUNMOUNT")
        })
        
        //Ending of Things for Currencies


        return {
            selectedItem, finished,

            modalActive, waiter, respoOperation,
            toogleModal,

            numero, benefitor, montant,
        }
    },
}
</script>
