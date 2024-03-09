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
                        aria-label="du deposant"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label>Nom</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du bénéficiaire"
                        aria-label="Nom et prenom du destinataire" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="de votre transfert"
                        aria-label="du destinataire" type="number"></ion-input>
                </ion-item>
                
                <!-- <ion-button id="confirmButton" expand="block">Confirmer</ion-button> -->

            </ion-list>   
            <br><br><br>
            <ion-button id="confirmButton" expand="block">Confirmer</ion-button>
</template>
<script>
import { 
    IonSelectOption, IonSelect, IonInput, 
    IonLabel, IonItem, IonButton, IonList,  
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        IonSelectOption, IonSelect, IonInput, 
        IonLabel, IonItem, IonButton, IonList,  
    },
    setup() {
        const store = useStore()
        const selectedItem = ref(null)
        let finished = []
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
        const allElements = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

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
        updateOptions()

        return {
            selectedItem, finished,
        }
    },
}
</script>
