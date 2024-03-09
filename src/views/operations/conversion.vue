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
                        aria-label="Nom et prenom du destinataire" type="number"></ion-input>
                </ion-item>

            </ion-list>   
            <br>
            <ion-button id="confirmButton" expand="block">Confirmer</ion-button>
    </base-menu-app>
</template>

<script>
import baseMenuApps from '../../Layout/base-menuApps.vue'
import solde from '../solde.vue';
import { IonIcon } from '@ionic/vue';
import { 
    IonItem, IonInput, IonList, IonButton,
    IonSelect, IonSelectOption, IonImg,
    IonThumbnail, IonLabel, IonToggle,
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate } from 'vue'
import { useStore} from 'vuex'
export default {
    components:{
        'base-menu-app': baseMenuApps,
        'sol-de' : solde,
        IonItem, IonInput, IonList, IonButton,
        IonSelect, IonSelectOption, IonImg, IonIcon,
        IonThumbnail, IonLabel, IonToggle,
    },
    setup() {
        const source = ref('')
        const destination = ref('Lit')
        const reserve = ref('')

        const check = ref(true)
        const store = useStore()
        const paymethod = ref(null)
        const selectedItem = ref(null)
        const allElements = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        var wanted = []
        const payes = [
                {
                    id: 1,
                    name:'Lumicash',
                    country: 'Bi'
                },
                {
                    id: 2,
                    name:'enoti',
                    country: 'Bi'
                },
                {
                    id: 3,
                    name: 'ecocash',
                    country: 'Bi'
                },
                {
                    id: 4,
                    name: 'eFeza',
                    country: 'Bi'
                },
                {
                    id: 5,
                    name:'bgf',
                    country: 'Bi'
                },
                {
                    id: 6,
                    name: 'bcb',
                    country: 'Bi'
                },
                {
                    id: 7,
                    name: 'kcb',
                    country: 'Bi'
                },
                {
                    id: 8,
                    name: 'Momo',
                    country: 'Rw'
                },
                {
                    id: 9,
                    name:'Tigo Cash',
                    country: 'Rw'
                },
                {
                    id: 10,
                    name: 'Airtel Money',
                    country: 'RDC'
                },
                {
                    id: 11,
                    name: 'Mpesa',
                    country: 'RDC'
                },
                {
                    id: 12,
                    name: 'Airtel Money',
                    country: 'Tz'
                },
                {
                    id: 13,
                    name:'Tigo Pesa',
                    country: 'Tz'
                },
                {
                    id: 14,
                    name: 'Mpesa',
                    country: 'Tz'
                },
                {
                    id: 15,
                    name: 'Mpsa',
                    country: 'Ke'
                },
                {
                    id: 16,
                    name: 'Banque Misr',
                    country: 'Egy'
                },
                {
                    id: 17,
                    name:'Arab African Int Bank',
                    country: 'Egy',
                },
                {
                    id: 18,
                    name: 'Credit agricole',
                    country: 'Fr'
                },
                {
                    id: 19,
                    name: 'BNP Paribas',
                    country: 'Fr'
                },
                {
                    id: 20,
                    name: 'PayPal',
                    country: 'Int'
                },
                {
                    id: 21,
                    name:'Eutheum',
                    country: 'Int'
                },
                {
                    id: 22,
                    name: 'Bitcoin',
                    country: 'Int'
                },
                {
                    id: 23,
                    name: 'Trust Wallet',
                    country: 'Int'
                },
            ]
        //this finished will contain the compiled pay methods
        let finished = []

        function chunk(){
            var combiNEd = store.state.top5.concat(allElements)
            let uniqueValuesSet = new Set(combiNEd);
            // console.log("The set is : ", uniqueValuesSet)
            wanted = Array.from(uniqueValuesSet);
            // console.log("CHUNK, THe array is: ", wanted)
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
                            'country' : data.country
                        }
                        fini.push(jove)
                    }
                })
            }
            finished = fini
            // console.log("This is the results : ", finished)
        }
        function updateOptions(){
            chunk()
            construct()
            //
        }
        function turnCheck(){
            check.value = !check.value
        }
        updateOptions()
        watch(paymethod,(value)=>{
            if(value == 'gallery'){
                console.log("You chose :", value)
                // this.sayHello()
                selectFile()
                // document.getElementById('fileInput').click();
            }else if(value == 'camera'){
                store.commit('initPhotoNumber')
            }
        })
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
        onBeforeUpdate(()=>{
            updateOptions()
        })

        return {
            paymethod, selectedItem, finished, payes, 
            check, source, destination, reserve,
            turnCheck,
        }
    },
}
</script>