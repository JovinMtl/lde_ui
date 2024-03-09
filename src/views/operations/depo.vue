<template>
    <me-nu title="Depot avec " backButton="true">
        <template v-slot:depot>
            <div class="centered">
            </div>
            <ion-list>
                <ion-item>
                        <!-- justify = start, end, space-between -->
                        <ion-select label-placement="floating" justify="space-between" label="Recharger avec" placeholder="votre methode de paiement" v-model="selectedItem">
                            <ion-select-option class="jov" v-for="pay in finished" :value="pay.id"> 
                                {{ pay.name }} ({{ pay.country }})
                            </ion-select-option>
                        </ion-select>
                        
                </ion-item>
                
                <ion-button expand="block" v-if="paymethod == 'gallery' || this.$store.getters.getNumberTaken > 1 && paymethod != null "
                    @click="changeImage">Supprimer Image</ion-button>
                <ion-item v-if="paymethod == null">
                    <ion-select aria-label="Fruit" interface="action-sheet" placeholder="Votre Bordereau" v-model="paymethod">
                        <ion-select-option value="gallery">From Gallery</ion-select-option>
                        <ion-select-option value="camera">From Camera</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item v-show=" paymethod == 'gallery'">
                    <!-- <input type="file" @change="onFileChange" accept="image/*" /> -->
                    <input type="file" id="fileInput" style="display: none"
                    @change="onFileChange" accept="image/*" />
                    <ion-thumbnail></ion-thumbnail>
                    <img id="selectedFile" alt="your File">

                </ion-item>
                <ion-item v-if=" paymethod == 'camera'">
                    <take-im></take-im>
                </ion-item>
                <ion-item>r
                    <ion-label>Nom  </ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du deposant"
                        aria-label="Nom et prenom du destinataire"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Numero</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="du deposant"
                        aria-label="du deposant"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Montant</ion-label>
                    <span style="margin-right: 1rem;">&nbsp;</span>
                    <ion-input color="primary" placeholder="de votre depot"
                        aria-label="du destinataire"></ion-input>
                </ion-item>
                <router-link to="/list">See list</router-link>
                <a href="">SEND</a>
                <ion-button expand="block">Pour le moment, Ne Pressez pas ICI</ion-button>

            </ion-list>   
            <br>
            <!-- <button @click="updateTop5">UpdateTop5</button><br><br>
            <button @click="updateOptions">CONFIRM</button><br><br>
            <button @click="downloadTop5">Download TOP5</button><br><br>
            <button @click="uploadTop5">Upload TOP5</button><br><br>
            <br>
            <ion-button @click="captureImage">Capture Image</ion-button>
            <img v-if="imageData" :src="imageData" alt="Captured Image" />
            <ion-button @click="uploadImage" v-if="imageData">Upload Image</ion-button> -->
        </template>
    </me-nu>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import { 
    IonItem, IonInput, IonList, IonButton,
    IonSelect, IonSelectOption, IonImg,
    IonThumbnail, IonLabel,
} from '@ionic/vue'
import Menu from '../menu.vue'
import TakeIm from './takeim.vue'
import { home } from 'ionicons/icons'
export default {
    components : {
        'me-nu' : Menu,
        'take-im' : TakeIm,
        IonItem, IonInput, IonList, IonButton,
        IonSelect, IonSelectOption, IonImg, IonIcon,
        IonThumbnail, IonLabel,

    },
    data(){
        return {
            paymethod : null,
            imageData : null,
            selectedItem: null,
            selectedFile : '',
            wanted : [ 6, 3, 8, 9, 1, 11, 2, 5],
            allElements : [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            finished : [],
            home,
            image: "../../../resources/logo/Payments/mobile_money/lumicash.png",
            payes: [
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
            ],
            selectOptions: [
                            { label: 'Option 1', value: 'option1', icon: home },
                            { label: 'Option 2', value: 'option2', icon: home },
                            // Add options as needed
                        ],
        }
    },
    beforeUpdate(){
        this.updateOptions()
    },
    watch:{
        // This is to check the changes of the selected value
        // and updates the top5 automatically
        // selectedItem(value, oldvalue){
        //     this.$store.commit('addTop5', {value: value})
        //     console.log("THe new value : ", value, "from", oldvalue)
        //     console.log("The Liked : ", this.$store.getters.getTop5)
        // }
        paymethod(value){
            if(value == 'gallery'){
                console.log("You chose :", value)
                // this.sayHello()
                this.selectFile()
                // document.getElementById('fileInput').click();
            }else if(value == 'camera'){
                this.$store.commit('initPhotoNumber')
            }
        }
    },
    methods:{
        async captureImage(){
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = mediaStream;
            video.play();

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

            this.imageData = canvas.toDataURL('image/jpeg');

            video.remove();
            mediaStream.getVideoTracks()[0].stop();
        },
        onFileChange(event, image='null') {
            this.selectedFile = event.target.files[0];
            console.log("The file selected: ", this.selectedFile)
            console.log("THe fileName is :", (this.selectedFile.name))
            const selectedImage = document.getElementById('selectedFile')

            selectedImage.style.display = 'block'
            console.log("The url: ", this.selectedFile)
            if(image != 'null'){
                console.log("Image n'est pas nuLLL")
            }
            selectedImage.src = URL.createObjectURL(this.selectedFile)
        },
        async uploadImage() {
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
        },
        updateOptions(){
            //chunk combining the existing top5 with the rest of 23
            // and return an array of 23, having removed the double
            this.chunk()
            // construct makes an real object based on an array of chunk
            this.construct()

        },
        updateTop5(){
            // to add the newly selected options to be the first in TOP5
            this.$store.commit('addTop5', {value: this.selectedItem})
        },
        downloadTop5(){
            localStorage.setItem('top5', this.$store.getters.getTop5)
        },
        uploadTop5(){
            // load the Top5 value stored locally and upload them to the store
            console.log("store Before upload :", this.$store.getters.getTop5)
            const storedTop5 = localStorage.getItem('top5')
            this.$store.dispatch('uploadTop5', storedTop5)
            // this.$store.commit('uploadTop5', {'value': storedTop5})
            console.log("store After upload :", this.$store.getters.getTop5)
        },
        SendT(){
            // this is for viewing the top5
            console.log("THe actual value is : ", this.selectedItem)
            this.$store.commit('addTop5', {value: selectedItem })
            this.checkTop5()
        },
        checkTop5(){
            const top5 = this.$store.getters.getTop5
            const max = top5.length
            for(let i=0; i < max; i++){
                console.log(top5[i])
                for(let j=i+1; j < max-i; j++){
                    if ((top5[i] == top5[j]) && (top5.indexOf(top5[j] != i))){
                        console.log("We have found a match of: ", top5[i], "and", top5[j])
                        console.log("But, ", i, "and" , j)
                        this.$store.dispatch('removeElement', j)
                    }
                }
            }
        },
        construct(){
            // This is for constructing the new object of options 
            // according the wanted array
            var fini = []
            const max = this.wanted.length
            //the array that contains the ordering in number
            for (let i=0; i < max; i++){
                this.payes.forEach((data)=>{
                    if (this.wanted[i] == data.id){
                        let jove = {
                            'id' : data.id,
                            'name' : data.name,
                            'country' : data.country
                        }
                        fini.push(jove)
                    }
                })
            }
            // console.log("This is the results : ", fini)
            this.finished = fini
        },
        chunK(){
            var combiNEd = this.wanted.concat(this.allElements)
            console.log("On the start: ", combiNEd)
            const max = combiNEd.length
            for(let i=0; i < max; i++){
                for(let j=i+1; j < max-i; j++){
                    if((combiNEd[i] == combiNEd[j]) && (combiNEd.indexOf(combiNEd[j]) == i)){
                        console.log("removing", combiNEd[j], " at", j)
                        combiNEd.splice(j, 1)
                        console.log("Confirm: ", combiNEd[j])
                    }
                }
            }
            console.log("The Elements that stays are: ", combiNEd)
        },
        chunk(){
            var combiNEd = this.$store.state.top5.concat(this.allElements)
            let uniqueValuesSet = new Set(combiNEd);
            console.log("The set is : ", uniqueValuesSet)
            this.wanted = Array.from(uniqueValuesSet);
            console.log("CHUNK, THe array is: ", this.wanted)
        },
        selectFile(){
            let file = document.getElementById('fileInput').click();
        },
        changeImage(){
            this.paymethod = null
        }
    }
}
</script>

<style scoped>
    .jov{
        display: none;
    }
</style>