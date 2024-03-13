<template>
    <base-menu-app pageTitle ="Investissements" baArrow="true">
        <!-- Here i have imported my baseMenuApps -->
        <sol-de></sol-de>
        <ion-list>
                <ion-item>
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" label="Investir avec" placeholder="votre methode de paiement" v-model="selectedItem">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.id"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>

                <ion-item>
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="ou la taille de votre investissement"
                        aria-label="du destinataire" type="number" v-model="capital"></ion-input>
                </ion-item>

                <ion-item>
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" 
                            label="Choisissez votre plan d'investissement" 
                            placeholder="votre methode de paiement" v-model="selectedPlan">
                            <ion-select-option class="jov" v-for="plan in plans" :value="plan.id"> 
                                {{ plan.duree }} ({{ plan.taux }}%)
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>
            </ion-list>
            <span v-show="selectedPlan && capital" 
                style="display: inline-flex; position: relative; margin-top: 10px; font-size: 1.12em;"
                class="whiteOnly centered">
                Vous aurez {{ result }} ({{ currency }}) après une période de {{ periode }}.</span>  
            <br><br><br>
            <ion-button id="confirmButton" expand="block">Confirmer</ion-button>
    </base-menu-app>
</template>

<script>
import baseMenuApps from '../../../Layout/base-menuApps.vue'
import solde from '../../auxiliare/solde.vue';
import { 
    IonItem, IonInput, IonList, IonButton,
    IonSelect, IonSelectOption,
    IonLabel,
} from '@ionic/vue'
import { ref, watch, onMounted, onBeforeUpdate,onBeforeUnmount, computed, } from 'vue'
import { useStore } from 'vuex'
export default {
    components:{
        'base-menu-app': baseMenuApps,
        'sol-de' : solde,
        IonItem, IonInput, IonList, IonButton,
        IonSelect, IonSelectOption,
        IonLabel,
    },
    setup() {

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
            // console.log("INVEST CHUNK: see the combined: ", combiNEd)
            let uniqueValuesSet = new Set(combiNEd);
            wanted = Array.from(uniqueValuesSet);
            console.log("INVEST CHUNK: the wanted BEFORE action: ", wanted)
            let nonZero = []
            wanted.forEach((value)=>{
                if(value !== 0){
                    nonZero.push(value)
                }
            })
            wanted = nonZero
            console.log("INVEST CHUNK: the wanted AFTER action: ", wanted)
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
        
        
        return {
            selectedPlan, plans, capital, result, interest, periode,
            finished, selectedItem, currency
        }
    },
}
</script>