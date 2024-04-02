
<template>
    <div class="same">
        <!-- <div class="headShower">
            <div class="shower">
                <div v-if="!soldeVisible" class="content">
                    <ion-icon :icon="eyeOff" @click="Invert" id="eye2" size="large"></ion-icon>
                    <p v-if="!soldeVisible" class="segoe">*******</p>
                </div>
                <div v-if="soldeVisible" class="visible">
                    <ion-icon :icon="eye"  @click="Invert" id="eye" size="large"></ion-icon> 
                    <p @click="Invert" 
                    class="segoe"><strong> {{ solde }} USDT </strong></p>
                </div>
            </div>
        </div> -->
        <br>
        <div class="headShower">
            <div class="shower" style="
                display: inline-flex;">
                <div v-if="!soldeVisible" class="content">
                    <ion-icon id="eyeInvisible"
                        :icon="eyeOff" @click="Invert" size="large"></ion-icon>
                    <span style="position: relative;left: 6.5rem; top: 0.45rem;"
                        v-if="!soldeVisible" class="segoe">*********</span>
                </div>
                <div v-if="soldeVisible">
                    <ion-icon id="eyeVisible"
                        :icon="eye"  @click="Invert" size="large"></ion-icon> 
                    <span @click="Invert" id="soldVisible"
                    class="segoe"><strong> {{ amount }} </strong></span>
                </div>
                <div style="display: inline-flex; position:relative; left: 4rem;
                        top: 0.35rem;"  v-if="soldeVisible && soldeObject">
                    <!-- <ion-select placeholder="USDT">
                        <ion-select-option value="apples" v-for="currency in currencies">
                            {{ currency.nom }}
                        </ion-select-option>
                    </ion-select> -->
                    <span>
                    <ion-select aria-label="Fruit" interface="popover" 
                    placeholder="choisir" cancel-text="Annuler" v-model="somme">
                        <ion-select-option
                            v-for="(jove, index) in currencies" :value="index" > 
                            {{ jove.nom }}
                        </ion-select-option>
                    </ion-select></span>
                </div>
            </div>
        </div>
        <br><br>
    </div>
</template>

<script>
import { ref, watch, onBeforeMount } from 'vue'
import { eyeOff, eye} from 'ionicons/icons'
import { IonSelect, IonSelectOption,} from '@ionic/vue'
import { useStore } from 'vuex'
export default {
    components:{
        IonSelect, IonSelectOption,
    },
    props:[
        'injectableSolde',
    ],
    setup(props) {
        const store = useStore()
        let soldeVisible = ref(false);
        // let solde = 3000000
        const soldeObject = ref(null)
        const currencies = ref(null)
        const somme = ref(0)
        const amount = ref(0)

        //Begin of Checking the INjected Solde
        function checkInjectedSolde(){
            if(props.injectableSolde){
                console.log("There is presence of PROPs : ", props.injectableSolde)
                soldeObject.value = props.injectableSolde
                buildCurrencies()
                amount.value = currencies.value.valueOf(0)[0].somme
                console.log("Currencies are: ", currencies.value)
            } else {
                console.log("There is no PROP. now asking the server")
                kubaza()
            }
        }

        onBeforeMount(()=>{
            console.log("SOLDE onBeforeUpdate")
            checkInjectedSolde()
        })
        watch(()=>props.injectableSolde, (value)=>{
            console.log("SOLDE: Injectable Changed into : ", value)
            checkInjectedSolde()
        })
        //Begin of Checking the INjected Solde

        function Invert(){
            soldeVisible.value = !soldeVisible.value
        }
        
        function buildCurrencies(){

            currencies.value = 
            [
                {
                    'nom': 'USDT',
                    'somme' : soldeObject.value.valueOf(5)['usdt']
                },
                {
                    'nom': 'USD',
                    'somme' : soldeObject.value.valueOf(5)['usd']
                },
                {
                    'nom': 'Fbu',
                    'somme' : soldeObject.value.valueOf(5)['bif']
                },
                {
                    'nom': 'Frw',
                    'somme' : String(soldeObject.value.rwf)
                },
                {
                    'nom': 'KES',
                    'somme' : String(soldeObject.value.kes)
                },
                {
                    'nom': 'Ugx',
                    'somme' : String(soldeObject.value.ugx),
                },
                {
                    'nom': 'Tsh',
                    'somme' : String(soldeObject.value.tsh)
                },
                {
                    'nom': 'Zmw',
                    'somme' : String(soldeObject.value.zmw)
                },
                {
                    'nom': 'Eur',
                    'somme' : String(soldeObject.value.eur)
                },
                {
                    'nom': 'TRX',
                    'somme' : String(soldeObject.value.trx)
                },
                {
                    'nom': 'LID',
                    'somme' : String(soldeObject.value.lid)
                },
            ]
        } 
        async function kubaza(){
            const baseURL = '//127.0.0.1:8002'
            const suffix = '/jov/api/solde/getSolde/'
            

            try {
                const response = await fetch(`${baseURL}${suffix}`,{
                    method: 'GET',
                    headers:{
                        // 'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                });

                if (response.ok){
                    soldeObject.value = await response.json()
                    console.log("SOLDE: Things are well received")
                    buildCurrencies()
                    amount.value = currencies.value.valueOf(0)[0].somme
                    console.dir(soldeObject.value)
                } else {
                    console.log("SOLDE: Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }
        // kubaza()

        watch(somme, (value)=>{
            //
            console.log("You changed into : ", value)
            console.log("; ", currencies.value.valueOf(0)[value].somme)
            amount.value = currencies.value.valueOf(0)[value].somme
            // checkInjectedSolde()
        })

        

        return {
            Invert,
            soldeVisible,
            // solde,
            eyeOff,
            eye,

            soldeObject, currencies,
            somme,amount,
        }
    },
}
</script>

<style scoped>
    .same{
        padding-top: 50px;
    }
    .shower{
        display: inline-block;
        width: 280px;
        height: 55px;
        border-radius: 10px;
        border: 2px solid gray;
        box-shadow: 0 0 35px black;
    }
    .headShower{
        text-align: center;
    }
    .shower p{
        position: relative;
        display: inline-flex;
        bottom: 3px;
    }
    p{
        font-family: var(--ion-font-family, inherit);
    }
    #eyeInvisible{
        display: inline-flex;
        position: relative; 
        left: 4.6rem; 
        top: 0.85rem;
    }
    #eyeVisible{
        display: inline-flex;
        position: relative; 
        left: 1.5rem; 
        top: 0.78rem;
    }
    #soldVisible{
        position: relative;
        left: 3rem;
        top: 0.18rem;
    }

    
</style>

