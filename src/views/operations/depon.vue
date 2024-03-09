<template>
    <base-menu-app pageTitle ="Faites votre dépôt" baArrow="true">
        <!-- Here i have imported my baseMenuApps -->
        <sol-de></sol-de>
        <ion-list>
                <ion-item>
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" label="Recharger avec" placeholder="votre methode de paiement" v-model="selectedItem">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.id"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>

                <ion-item>
                    <ion-label>Nom  </ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du déposant"
                        aria-label="Nom et prenom du destinataire"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Numero</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du déposant"
                        aria-label="du deposant"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="de votre dépot"
                        aria-label="du destinataire" type="number"></ion-input>
                </ion-item>
                
                <ion-button expand="block" v-if="paymethod == 'gallery' || this.$store.getters.getNumberTaken > 1 && paymethod != null "
                    @click="changeImage">Supprimer Image</ion-button>
                <ion-item v-if="paymethod == null">
                    <ion-select aria-label="Fruit" interface="action-sheet" placeholder="Votre Bordereau" v-model="paymethod">
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
            <ion-button id="confirmButton" expand="block">Confirmer</ion-button>
    </base-menu-app>
</template>

<script>
import baseMenuApps from '../../Layout/base-menuApps.vue'
import solde from '../solde.vue';
import TakeIm from './takeim.vue'
import { IonIcon } from '@ionic/vue';
import { 
    IonItem, IonInput, IonList, IonButton,
    IonSelect, IonSelectOption, IonImg,
    IonThumbnail, IonLabel,
} from '@ionic/vue'
import { ref, watch, onBeforeUpdate, onMounted } from 'vue'
import { useStore} from 'vuex'
export default {
    components:{
        'base-menu-app': baseMenuApps,
        'take-im' : TakeIm,
        'sol-de' : solde,
        IonItem, IonInput, IonList, IonButton,
        IonSelect, IonSelectOption, IonImg, IonIcon,
        IonThumbnail, IonLabel,
    },
    setup() {
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
        async function uploadImage() {
            if (this.selected) {
                const formData = new FormData();
                formData.append('image', this.selected);

                try {
                const response = await fetch('your-upload-api-endpoint', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log('File uploaded successfully');
                    // You can handle the server's response here if needed
                } else {
                    console.error('File upload failed');
                }
                } catch (error) {
                console.error('An error occurred while uploading the file:', error);
                }
            } else {
                console.log('No file selected');
            }
        }
        updateOptions()
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
        onBeforeUpdate(()=>{
            updateOptions()
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
        // watch(emittedBlobUri, (value)=>{
        //     //
        // })

        return {
            paymethod, selectedItem, finished, payes, takenPhoto,
            selectedImage, temp,tempe, emittedBlobUri,
            changeImage, FileSelect, receivePhoto, compressImageBeforeSent,
        }
    },
}
</script>