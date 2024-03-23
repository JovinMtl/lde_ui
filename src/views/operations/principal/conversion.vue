<template>
    <base-menu-app pageTitle ="Convertir" baArrow="true">
        <!-- Here i have imported my baseMenuApps -->
        <sol-de></sol-de>
        <p class="centered">
            <span v-show="!source">Pour convertir </span>
            <span v-show="source">Convertir </span>   
            <span class="white">{{ source }}
            </span>  en <span v-show="!destination">...</span> 
            <span class="white">{{ destination }}</span>
            <span v-show="!source">, veuillez choisir votre source.</span>
         </p>
        <ion-list>
                <ion-item v-show="check">
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" label="Depuis votre Source :" placeholder="votre methode de paiement" v-model="source">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.name" :key="pay.id"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>

                <ion-item>
                    <ion-toggle :checked="check" @click="turnCheck"
                    :enable-on-off-labels="true"
                    label-placement="start"
                    ><span v-show="check">Vers</span> 
                    <span v-show="!check">Depuis</span>
                    Lit Dinard (LD)</ion-toggle><br /><br />
                </ion-item>

                <ion-item v-show="!check">
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" label="Vers votre destination :" placeholder="votre methode de paiement" v-model="destination">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.name"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>

                <ion-item>
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="à convertir"
                        aria-label="Nom et prenom du destinataire" 
                        type="number" v-model="montant"></ion-input>
                </ion-item>
                <input v-show="!showBalance && source" class="centered" 
                    type="button" value="Afficher balance" 
                    @click="turnBalance" style="background-color: white; border-radius: 12px;"/>
                <input v-show="showBalance" class="centered" type="button" 
                    value="Enlever balance" @click="turnBalance"
                    style="background-color: white; border-radius: 12px;"/>
                <div class="mother" v-show="showBalance">
                    <div id="ch1">
                        <!-- Source :  -->
                        <span style="margin-right: .2rem;">&nbsp;</span> 
                        <span style="font-size: 1.4em;margin-top: -3px;;">{{ sourceId }}</span> <span style="color: white;">{{ source }}</span>
                    </div>
                    <div id="ch2">
                        <span style="font-size: 1.4em;margin-top: -3px;">{{ destinationId }}</span>  <span style="color: white;">{{ destination }} </span>  
                        <span style="margin-right: .2rem;">&nbsp;</span>
                        <!-- <span> Destination</span> -->
                    </div>
                </div>
                <p v-if="montant && source" class="centered">Avec <span style="color: white;">{{ montant }} {{ source }}</span>, vous pouvez avoir 
                    <span style="color: white;"><span v-show="source !== 'Lit'">{{ (montant / sourceId).toFixed(2) }}</span>
                    <span v-show="source == 'Lit'">{{ (montant * destinationId).toFixed(2) }}</span> {{ destination }}</span>.</p>
                
            </ion-list>   
            <br>
            <ion-button id="confirmButton" expand="block">Confirmer</ion-button>
    </base-menu-app>
</template>

<script>
import baseMenuApps from '../../Layout/base-menuApps.vue';
import solde from '../../auxiliare/solde.vue';
import { 
    IonItem, IonInput, IonList,
    IonSelect, IonSelectOption, IonImg,
    IonThumbnail, IonLabel, IonToggle,
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate, onBeforeUnmount, computed } from 'vue'
import { useStore} from 'vuex'
export default {
    components:{
        'base-menu-app': baseMenuApps,
        'sol-de' : solde,
        IonItem, IonInput, IonList,
        IonSelect, IonSelectOption, IonImg,
        IonThumbnail, IonLabel, IonToggle,
    },
    setup() {
        const source = ref('')
        const destination = ref('Lid')
        const reserve = ref('')

        const check = ref(true)
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
                updateTop5()//only if i want to find the last input in the next component
                downloadTop5()
                console.log("INVEST ONBEFOREUNMOUNT: have downloaded: ", selectedItem.value)
            } else{
                console.log("INVEST: didn't download, ONBEFOREUNMOUNT")
            }
            console.log("INVEST: END downloading, ONBEFOREUNMOUNT")
        })
        
        //Ending of Things for Currencies

        //Start about Balance
        var sourceId = ref(0)
        var destinationId = ref(0)
        const showBalance = ref(false)
        const balances = [
            // {
            //     monnaie : id muri payes,
            //     achat : ayo tuyimugirarako,
            //     vente : ayo tuyimuherezako,
            // },
            {
                monnaie : 1,
                name:'US Dollar',
                achat : 1,
                vente : 1,
            },
            {
                monnaie : 2,
                name:'Fbu',
                achat : 4200,
                vente : 4400,
            },
            {
                monnaie : 3,
                name: 'Frw',
                achat : 1100,
                vente : 1250,
            },
            {
                monnaie : 4,
                name: 'ShillingKenya',
                achat : 100,
                vente : 102,
            },
            {
                monnaie : 5,
                name:'Ugshilling',
                achat : 6050,
                vente : 6300,
            },
            {
                monnaie : 6,
                name: 'ShillingTanzania',
                achat : 3900,
                vente : 4100,
            },
            {
                monnaie : 7,
                name: 'Kwacha',
                achat : 4200,
                vente : 4400,
            },
            {
                monnaie : 8,
                name: 'Euro',
                achat : 0.9,
                vente : 0.92,
            },
            {
                monnaie : 9,
                name:'USDT',
                achat : 1,
                vente : 1,
            },
            {
                monnaie : 10,
                name: 'TRX',
                achat : 1,
                vente : 1,
            },
            {
                monnaie : 11,
                name: 'Lit Dinar',
                achat : 1,
                vente : 1,
            },
            
        ]
        function turnBalance(){
            showBalance.value = !showBalance.value
            console.log("Now can show : ", showBalance.value)
        }
        watch(source, (value)=>{
            var i = 1
            payes.forEach((value)=>{
                if(value.name == source.value){
                    if(source.value !== 'LIT'){
                        console.log("VOUS voulez LIT <>", source.value)
                        console.log("La Source est : ", value.name, " destination : ", destination.value)
                        sourceId.value = balances[i-1].vente
                        destinationId.value = balances[10].vente
                    } else{
                        console.log("VOUS ne voulez pas LIT <>", source.value)
                        console.log("La Source est : ", value.name, " destination : ", destination.value)
                        sourceId.value = balances[i-1].achat
                        destinationId.value = balances[10].achat
                    }
                        

                }
                i += 1
            })
        })
        watch(destination, (value)=>{
            var i = 1
            payes.forEach((value)=>{
                if(value.name == destination.value){
                    if(destination == 'Lit'){
                        console.log("VOUS VOULEZ LIT <> ", destination.value)
                        console.log("La destination est : ", value.name, " Source: ", source.value)
                        destinationId.value = balances[i-1].vente
                        sourceId.value = balances[10].vente
                    } else {
                        console.log("VOUS NE VOULEZ PAS LIT <> ", destination.value)
                        console.log("La destination est : ", value.name, " Source: ", source.value)
                        destinationId.value = balances[i-1].achat
                        sourceId.value = balances[10].achat
                    }
                    
                }
                i += 1
            })
        })


        //End of Things of Balance
        
        function turnCheck(){
            check.value = !check.value
        }
        watch(check, (value)=>{
            if(value == false){
                console.log("Vous utilisez Lit comme Source")
                destination.value = source.value
                source.value = 'Lit'
                reserve.value = source.value
            } else {
                reserve.value = destination.value
                destination.value = source.value
                source.value = reserve.value
                console.log("Vous utilisez LIT comme Destination")
            }
        })
        // General Things
        const montant = ref(null)

        // watch(montant, (value)=>{
        //     //
        // })

        return {
            paymethod, selectedItem, finished, payes, 
            check, source, destination, reserve,

            balances, sourceId, destinationId,turnBalance,
            showBalance,

            montant,

            turnCheck,
        }
    },
}
</script>

<style scoped>
.mother{
    display: inline-flex;
    height: 6vh;
    width: 80vw;
    margin-left: 6%;
    margin-top: 1em;
    margin-bottom: -5rem;
    /* background-color: red; */
    padding: 0px;
}
#ch1{
    display: inline-block;
    width: 48%;
    height: 100%;
    /* background-color: green; */
}
#ch2{
    display: inline-block;
    width: 48%;
    height: 100%;
    margin-left: 4%;
    /* background-color: yellow; */
    justify-content: right;
    text-align: right;
    padding: 0px;
}
</style>