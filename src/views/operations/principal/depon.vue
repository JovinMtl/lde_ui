<template>
    <base-menu-app pageTitle ="Faites votre dépôt" baArrow="true">
        <!-- Here i have imported my baseMenuApps -->
        <sol-de></sol-de>
        <!-- <p>1 Lid pour chaque 1000 Lid</p> -->
        <ion-list>
                <ion-item v-if="!selectedItem">
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" label="Recharger avec :" placeholder="votre methode de paiement" v-model="selectedItem">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.id"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>

                <ion-item v-if="selectedItem">
                    <ion-label>Nom  </ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du déposant"
                        aria-label="Nom et prenom du destinataire"></ion-input>
                </ion-item>
                <ion-item v-if="selectedItem">
                    <ion-label>Numero</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du déposant"
                        aria-label="du deposant"></ion-input>
                </ion-item>
                <ion-item v-if="selectedItem">
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="de votre dépot"
                        aria-label="du destinataire" type="number"></ion-input>
                </ion-item>
                
                <ion-button expand="block" v-if="paymethod == 'gallery' || this.$store.getters.getNumberTaken > 1 && paymethod != null "
                    @click="changeImage">Supprimer Image</ion-button>
                <ion-item v-if="paymethod == null && selectedItem">
                    <ion-select  aria-label="Fruit" interface="action-sheet" placeholder="Votre Bordereau" v-model="paymethod">
                        <ion-select-option value="gallery">From Gallery</ion-select-option>
                        <ion-select-option value="camera">From Camera</ion-select-option>
                    </ion-select>
                </ion-item>
                <!-- <ion-item v-show=" paymethod == 'gallery' || takenPhoto > 2"> when we want to display that image taken -->
                <ion-item v-show=" paymethod == 'gallery'">
                    <!-- <input type="file" @change="onFileChange" accept="image/*" /> -->
                    <input type="file" id="fileInput" style="display: none"
                    @change="FileSelect" accept="image/*" />
                    <ion-thumbnail></ion-thumbnail>
                    <img id="selectedFile" alt="your File" >

                </ion-item>
                <ion-item v-if=" paymethod == 'camera' ">
                    <take-im @imageCaptured="receivePhoto" v-if="takenPhoto < 10"></take-im>
                </ion-item>

                <ion-item v-if=" paymethod == 'camera'" id="takenImage">
                    <img  :src="emittedBlobUri" style="border-radius: 24px; background-color: red;">
                    <!-- <p>The value: {{ temp }}</p> -->
                </ion-item>
                
                <!-- <ion-button id="confirmButton" expand="block">Confirmer</ion-button> -->

            </ion-list>  
            <br><br><br>
            <div class="loader" v-if="waiter" 
                style="background-color: transparent; position:fixed; 
                top: 60%; left: 50%; transform: translate(-50%, -50%);
                z-index: 5;"
                >
                <loa-der></loa-der>
            </div>
            <div class="guide" v-if="true" >
                <div class="home">
                <empty-modal @byeModal="toogleModal" :modalActive="infoModal" :beneficiaire="payee">
                    <div class="modal-content">
                        <h1 style="font-size: 3.5vh;">Pour votre information </h1>
                        <div  v-if="payee">
                            <p v-show="payee.currency !== 'Lit Dinar'">Veuillez transférer votre fonds à cette addresse: 
                            <br><br>
                            <span>
                                Monnaie: {{payee.currency}} <br> 
                                Méthode: {{ payee.description[0].paymethod }} <br>
                                Compte cible : <strong>{{ payee.description[0].target }}</strong> <br>
                                Opérateur: {{ payee.description[0].owner }} <br>
                            </span>
                            
                            </p>
                            <p v-show="payee.currency == 'Lit Dinar'">
                                Cette méthode n'est pas disponible dans votre région.
                            </p>
                        </div>
                        
                    </div>
                </empty-modal>
            </div>
            
            </div>
            <div class="home">
                <empty-modal @byeModal="toogleModal" :modalActive="modalActive">
                    <div class="modal-content">
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
            <!-- <ion-button v-show="!modalActive && !infoModal" id="confirmButton" expand="block" @click="toogleModal">Confirmer</ion-button> -->
            <ion-button v-show="!modalActive && !infoModal && selectedItem && waiter==false" id="confirmButton" expand="block" @click="toogleModal">Confirmer depot</ion-button>
    </base-menu-app>
</template>

<script>
import baseMenuApps from '../../Layout/base-menuApps.vue';
import solde from '../../auxiliare/solde.vue';
import TakeIm from '../../mains/takeim.vue'
import emptyModalVue from '../../mains/emptyModal.vue'
import Loader from '../../auxiliare/processing/processing1.vue'
import { IonIcon } from '@ionic/vue';
import { 
    IonItem, IonInput, IonList, IonButton,
    IonSelect, IonSelectOption, IonImg,
    IonThumbnail, IonLabel,
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate, onBeforeUnmount, onMounted, reactive } from 'vue'
import { useStore} from 'vuex'
export default {
    components:{
        'base-menu-app': baseMenuApps,
        'take-im' : TakeIm,
        'sol-de' : solde,
        'empty-modal' : emptyModalVue,
        'loa-der': Loader,
        IonItem, IonInput, IonList, IonButton,
        IonSelect, IonSelectOption, IonImg, IonIcon,
        IonThumbnail, IonLabel,
    },
    setup() {
        const store = useStore()
        //Start of things of submitting the form
        const formData = ref({
            currency : '',
            deposant : store.getters.getUsername,
            numero : '',
            montant : '',
            bordereau : 'emittedBlobUri',
            owner: '',
            date: Date.UTC,
        })
        const depotUrl = 'http://127.0.0.1:8002/jov/api/principal/receiveDepot/'
        const baseURL = '//127.0.0.1:8002'
        async function kurungika(){
            //
            const formToBeSent = new FormData()
            formToBeSent.append('currency', 'BIF')
            if(emittedBlobUri){
                // Convert the emittedBlobUri to a Blob
                const respons = await fetch(emittedBlobUri);
                const blob = await respons.blob();
                
                // Create a File object from the Blob
                const imageFile = new File([blob], 'image.png');
                
                // Append the image file to the FormData object
                formToBeSent.append('bordereau', imageFile);
                        }
            try{
                const response = await fetch(`${baseURL}/jov/api/principal/receiveDepot/`, {
                    method:'POST',
                    // headers: {
                    //     'Content-Type':'application/json',
                    //     'Content-Type':'application/octet-stream' //when file
                    // },
                    body: formToBeSent,
                })
                if(response.ok){
                    console.log("La reponse est bien: ", response)
                } else{
                    console.log("La reponse n'est pas bon")
                }
            }catch(value){
                console.log("VOus avez rencontre une erreur supprenant : ", value)
            }
        }
        //End of things of submitting the form
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

        //Begin of Managing the waiter
        const waiter = ref(false)
        //Ending of Managing the waiter


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
            if(value){
                //pick in numbers the one that matches that value
                console.log("You selected: ", value)
                //value is and id
                var methodName = payes[value-1].name
                console.log("THe method name is : ", methodName)
                var chosen = {
                    currency : 'Fbuuu',
                    description : 
                        {
                            paymethod: 'Lumicasheee',
                            phone: "+257 61 96 68 9dfdf2",
                            owner: 'owner-namdfdfe',
                        },

                }
                payees.forEach((value)=>{
                    // var i = 0;
                    if(value.currency == methodName){
                        chosen = value
                        payee.value = value
                        infoModal.value = true
                    }
                })
                console.log("The method in CHOSEN is : ", chosen)
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

        //Start of things of Pay numbers
        const payee = ref(null)
        const payees = [
            {
                currency : 'Fbu',
                description : [
                    {
                        paymethod: 'Lumicash',
                        target: "+257 61 96 68 92",
                        owner: 'owner-name',
                    },
                ]

            },
            {
                currency : 'US Dollar',
                description : [
                    {
                        paymethod: 'PayPal',
                        target: "lidfunds@lid.com",
                        owner: 'userPay-name',
                    },
                ]

            },
            {
                currency : 'Frw',
                description : [
                    {
                        paymethod: 'Momo',
                        target: "+257 61 96 68 92",
                        owner: 'liDRwanda',
                    },
                ]

            },
            {
                currency : 'ShillingKenya',
                description : [
                    {
                        paymethod: 'Mpesa',
                        target: "+254 323 3433 21",
                        owner: 'ke-name',
                    },
                ]

            },
            {
                currency : 'Ugshilling',
                description : [
                    {
                        paymethod: 'Mpesa',
                        target: "+254 323 3433 21",
                        owner: 'agent-Ug',
                    },
                ]

            },
            {
                currency : 'ShillingTanzania',
                description : [
                    {
                        paymethod: 'Mpesa',
                        target: "+254 323 3433 21",
                        owner: 'mpesa-name',
                    },
                ]

            },
            {
                currency : 'Kwacha',
                description : [
                    {
                        paymethod: 'Momo',
                        target: "+257 61 96 68 92",
                        owner: 'liDRwanda',
                    },
                ]

            },
            {
                currency : 'Euro',
                description : [
                    {
                        paymethod: 'BNP Paribas',
                        target: "+254 323 3433 21",
                        owner: 'Lid-euro',
                    },
                ]

            },
            {
                currency : 'USDT',
                description : [
                    {
                        paymethod: 'Binance',
                        target: "+257 61 96 68 92",
                        owner: 'liDRwanda',
                    },
                ]

            },
            {
                currency : 'TRX',
                description : [
                    {
                        paymethod: 'Binance',
                        target: "+254 323 3433 21",
                        owner: 'Lid-euro',
                    },
                ]

            },
            {
                currency : 'Lit Dinar',
                description : [
                    {
                        paymethod: 'none',
                        target: "none",
                        owner: 'none',
                    },
                ]

            },

        ]
        //End of things of Pay numbers




        const selectedPhoto = ref(null)
        const selectedImage = ref({})
        var temp = ''
        var tempe = '../../../public/resources/logo/epar.png'
        let takenPhoto = ref(0);
        const emittedBlobUri = ref('')


        function changeImage(){
            paymethod.value = null
            takenPhoto.value = 0
            store.state.wantTakePhoto = true
        }
        function selectFile(){
            let file = document.getElementById('fileInput').click();
        }
        
        function FileSelect(event, image='null') {
            URL.revokeObjectURL(selectedPhoto.value);
            let selectedFile = event.target.files[0];
            console.log("The file selected: ", selectedFile)
            console.log("THe fileName is :", (selectedFile.name))
            selectedImage.value = document.getElementById('selectedFile')

            selectedImage.value.style.display = 'block'
            console.log("The url: ", selectedFile)
            if(image != 'null'){
                console.log("Image n'est pas nuLLL")
            }
            selectedPhoto.value = URL.createObjectURL(selectedFile)
            selectedImage.value.src = URL.createObjectURL(selectedFile)
            emittedBlobUri = URL.createObjectURL(selectedFile)
        }
        function receivePhoto(data){
            // selectedPhoto.value = data.capturedImage
            emittedBlobUri.value = data.capturedImage
            console.log("The photo sent: ", emittedBlobUri.value)
            takenPhoto.value +=1
        }
        function compressImageBeforeSent(){
                        // Assuming you have the image stored as a Blob
            const imageBlob = emittedBlobUri.value /* Your image blob */;
            console.log("The actual Blob: ", imageBlob)
            const maxWidth = 800; // Maximum width for the compressed image
            const maxHeight = 600; // Maximum height for the compressed image
            const quality = 0.7; // Compression quality (0.0 to 1.0)

            // Create a new Image object
            const img = new Image();

            img.onload = () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Calculate the new dimensions for the compressed image
            let newWidth;
            let newHeight;
            if (img.width > img.height) {
                newWidth = maxWidth;
                newHeight = img.height * (maxWidth / img.width);
            } else {
                newHeight = maxHeight;
                newWidth = img.width * (maxHeight / img.height);
            }

            // Set the new dimensions for the canvas
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw the image on the canvas with the new dimensions
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert the canvas content to a compressed data URL
            const compressedDataURL = canvas.toDataURL('image/jpeg', quality);

            // Convert the data URL to a Blob
            fetch(compressedDataURL)
                .then(res => res.blob())
                .then(compressedBlob => {
                // Now you can use 'compressedBlob' in place of the original 'imageBlob'
                // Append it to FormData and send it to the server
                });
            };

            // Load the image into the Image object
            img.src = URL.createObjectURL(imageBlob);

        }
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
        
        onMounted(() => {
            watch(
                () => store.state.wantTakePhoto,
                (newValue, oldValue) => {
                // Your logic to handle the state property change
                if(newValue == false){
                    console.log("THe value of wantTakePhoto : ", newValue)
                    const image = document.getElementById("takenImage")
                    image.style.marginTop = "-60px"
                }
                
                }
            );
        });
        watch(takenPhoto, (value)=>{
            console.log("THe value of type of image has changed to:", value)
            // selectedImage.value.src = URL.bind(selectedPhoto.value)
        })

        return {
            paymethod, selectedItem, finished, payes, takenPhoto,
            selectedImage, temp,tempe, emittedBlobUri,
            changeImage, FileSelect, receivePhoto, compressImageBeforeSent,

            modalActive,
            toogleModal,

            payee,infoModal,

            waiter,
        }
    },
}
</script>

<style scoped>
.modal-content{
    font-size: 2.5vh;
}
h1{
    font-size: 4vh;
}
</style>