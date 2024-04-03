<template>
    <base-menu pageTitle="Retrait-Admin">
        <template v-slot:back-left>
            <ion-icon :icon="chevronBack" slot="end" size="large">Back</ion-icon>
            <!-- <ion-back-button text="Retour"></ion-back-button> -->
        </template>
        <template v-slot:finish-right>
                <router-link to="/notif">
                    <ion-icon :icon="notificationsOutline" slot="end" size="large"></ion-icon>
                </router-link>
                <router-link to="/">
                    <ion-icon :icon="exitOutline" slot="end" size="large" @click="logOut"></ion-icon>
                </router-link>
                
        </template>
        <template v-slot:body-content>
            <div class="avatar-container" v-if="store.getters.getLastActivity !== null">
                <ava-tar></ava-tar>
            </div>
            <sol-de></sol-de> <br>
            <div v-if="allDepots">
                <retrai-list></retrai-list>
            </div>
            <div v-if="notApproved">
                <retli-np></retli-np>
            </div>
            <div v-if="yetApproved">
                <retli-yp></retli-yp>
            </div>
        </template>
        <template v-slot:Footer-menu>
            <router-link to="/home-admin">
                <ion-icon id="ico1" :icon="home" size="large"></ion-icon>
            </router-link>
            <!-- <router-link to="/histo">
                <ion-icon id="ico2" :icon="checkmark" size="large"></ion-icon>
            </router-link> -->
            <router-link to="" @click="nonApproved()">
                <ion-icon id="ico2" :icon="checkmark" size="large"></ion-icon>
            </router-link>
            <!-- <router-link to="/depot">
                <ion-icon id="ico3" :icon="wallet" size="large"></ion-icon>
            </router-link> -->
            <router-link to="" @click="yetApprovedFunction()">
                <ion-icon id="ico4" :icon="checkmarkDone" size="large"></ion-icon>
            </router-link>
            

            <ion-label id="lab1">Accueil</ion-label>
            <ion-label id="l2">Non approuvés</ion-label>
            <!-- <ion-label id="lab3">Portefeuille</ion-label> -->
            <ion-label id="l4">Approuvés</ion-label>
        </template>
            
    </base-menu>
</template>

<script>
import baseMenu from '../../Layout/base-menu.vue';
import solde from '../../auxiliare/solde.vue';
import { 
    IonItem, IonInput, IonList, IonButton,
    IonSelect, IonSelectOption,
    IonLabel,
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate,onBeforeUnmount,} from 'vue'
import { useStore } from 'vuex'
import emptyModalVue from '../../mains/emptyModal.vue';
// import Loader from '../../auxiliare/processing/processing1.vue'
import Loader from '../../auxiliare/processing/proce-dot1.vue'


import retLiList from '../../mains/admin/ret-li-list.vue';
import retLiNp from '../../mains/admin/ret-li-np.vue';
import retLiYp from '../../mains/admin/ret-li-yp.vue';
import { 
    exitOutline,notificationsOutline,
    home,
    chevronBack,
    checkmarkDone, checkmark
} from 'ionicons/icons'
export default {
    components:{
        'base-menu' : baseMenu,
        'sol-de' : solde,
        'empty-modal' : emptyModalVue,
        'loa-der': Loader,

        'retrai-list' : retLiList,
        'retli-np' : retLiNp,
        'retli-yp' : retLiYp,
        IonItem, IonInput, IonList, IonButton,
        IonSelect, IonSelectOption,
        IonLabel,
    },
    setup() {
        const store = useStore()

        //Start of Things of Non approved & approved investments 
        const notApproved = ref(false)
        const yetApproved = ref(false)
        const allDepots = ref(true)

        function nonApproved(){
            yetApproved.value = false
            if(notApproved.value){
                notApproved.value = false
                allDepots.value = true
            } else {
                notApproved.value = true
                allDepots.value = false
            }
        }
        function yetApprovedFunction(){
            notApproved.value = false
            if(yetApproved.value){
                yetApproved.value = false
                allDepots.value = true
            } else {
                allDepots.value = false
                yetApproved.value = true
            }
        }
        //End of Things of Non approved & approved investments

        function logOut(){
            store.commit('resetActiveUser')
        }
        //Start of things of submitting the form
        const respoOperation = ref(false)
        const depotUrl = 'http://127.0.0.1:8002/jov/api/principal/receiveDepot/'
        const baseURL = '//127.0.0.1:8002'
        async function kurungika(){
            //
            const formToBeSent = new FormData()
            formToBeSent.append('currency', currency.value)
            formToBeSent.append('capital', capital.value)
            formToBeSent.append('taux', taux)
            formToBeSent.append('duree', duree)
            
            try{
                const response = await fetch(`${baseURL}/jov/api/invest/receiveInvests/`, {
                    method:'POST',
                    headers: {
                        // 'Content-Type':'application/json',
                        // 'Content-Type':'application/octet-stream' //when file
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                    body: formToBeSent,
                })
                if(response.ok){
                    console.log("La reponse est bien: ", response)
                    respoOperation.value = true
                } else{
                    console.log("La reponse n'est pas bon")
                    respoOperation.value = false
                }
            }catch(value){
                console.log("VOus avez rencontre une erreur supprenant : ", value)
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
            console.log("store Before upload :", store.getters.getTop5)
            const storedTop5 = localStorage.getItem('top5')
            store.dispatch('uploadTop5', storedTop5)
            // this.$store.commit('uploadTop5', {'value': storedTop5})
            console.log("store After upload :", store.getters.getTop5)
        }
        function updateOptions(){
            // makes call of chunk() and construct, should begin by 
            //by updating the top5
            chunk()
            construct()
        }
        function initFunctions(){
            console.log("INVEST SETUP: START Initialization")
            uploadTop5() //slightly
            updateOptions()
            console.log("INVEST SETUP: END Initialization")
        }
        initFunctions()
        watch(selectedItem, (value)=>{
            if(finished){
                currency.value = payes[value - 1].abbreviation
                console.log("Finished is available : ", currency.value)
                console.log("Sel : ", selectedItem.value, " Val: ", value)
                // updateTop5()
            } else {
                console.log("Finished is not available")
            }
        })
        onBeforeUpdate(()=>{
            console.log("INVEST onBeforeUpdate: Start")
            updateTop5()
            // showTop5()
            updateOptions()
            console.log("Here, the currency is : ", currency.value)
            // console.log("INVEST onBeforeUpdate: Downloading...")
            // downloadTop5()
            console.log("INVEST onBeforeUpdate: End")
        })
        onBeforeUnmount(()=>{
            console.log("INVEST: You are about to leave me, ONBEFOREUNMOUNT")
            // updateTop5()
            // showTop5()
            console.log("INVEST: Now downloading, ONBEFOREUNMOUNT")
            if(selectedItem.value){
                updateTop5() //only if i want to find the last input in the next component
                downloadTop5()
                console.log("INVEST ONBEFOREUNMOUNT: have downloaded: ", selectedItem.value)
            } else{
                console.log("INVEST: didn't download, ONBEFOREUNMOUNT")
            }
            console.log("INVEST: END downloading, ONBEFOREUNMOUNT")
        })
        
        //Ending of Things for Currencies

        //SPACE between to Features

        //Beginning of Things for Investment Plan
        var taux = 0
        var duree = 0
        var interest = 0
        var result = ref(0)
        const capital = ref(null)
        const selectedPlan = ref(null)
        const periode = ref('')
        const plans = [
            {
                id : 1,
                duree : '1 mois',
                number : 1,
                taux : 0.2,
            },
            {
                id : 2,
                duree : '3 mois',
                number : 3,
                taux : 0.7
            },
            {
                id : 3,
                duree : '6 mois',
                number : 6,
                taux : 1.7
            },
            {
                id : 4,
                duree : '1 ans',
                number : 12,
                taux : 3.8
            },
            {
                id : 5,
                duree : '2 ans',
                number : 24,
                taux : 8
            },
            {
                id : 6,
                duree : '3 ans',
                number : 36,
                taux : 12.5
            },
            {
                id : 7,
                duree : '5 ans',
                number : 60,
                taux : 22
            },
        ]
        function setResult(value){
            if(selectedPlan.value){
                let id = selectedPlan.value
                periode.value = plans[id-1].duree
                taux = plans[id-1].taux
                console.log("You chose rate: " , taux)
                duree = plans[id-1].number
                console.log("You chose duree: " , duree)
                // interestLinear = capital.value * taux * duree   //Linear
                // let resultCumul = capital.value * (1 + (taux/100)) ** (duree/12) //Cumulee
                interest = (taux / 100) * capital.value * (duree/12) //simple
                console.log("Votre Interet est: ", interest)
                // result.value = resultCumul
                result.value = Number(capital.value) + Number(interest)
            
            }
            
        }
        watch(selectedPlan,(value)=>{
            setResult(selectedPlan.value)
            console.log("Vous voulez une periode de : ", periode.value)
        })
        watch(capital, (value)=>{
            setResult(selectedPlan.value)
        })
        //End of Things for Investment Plan

        //Start of submission form
        
        //End of Submission form
        
        
        return {

            store, logOut,

            exitOutline,notificationsOutline,
            home,
            chevronBack,
            checkmarkDone, checkmark,

            notApproved, yetApproved, allDepots,
            nonApproved, yetApprovedFunction,
        }
    },
}
</script>
