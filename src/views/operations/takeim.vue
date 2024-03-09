
        <template>
            <!-- It is here that we're going to take a photo -->
            <div id="camera-container" v-if="wantCamera">
                <div class="camera-frame" v-if="wantCamera">
                <video ref="videoElement" autoplay playsinline></video>
                </div>
                <div style="display: inline-block;"  v-if="wantCamera">
                    <a :href="capturedImage" :download="`captured_photo_${this.$store.getters.getNumberTaken}_${new Date().toISOString().slice(0,9)}.jpg`">
                        <ion-button ref="tAke" class="takePhoto" 
                                @click="captureImage" 
                                v-if="this.$store.getters.getNumberTaken  > 1">
                            <ion-icon :icon="downloadOutline" size="large"></ion-icon>
                        </ion-button>
                    </a>
                    
                    <ion-button ref="tAke" class="takePhoto" 
                            @click="captureImage" 
                            >
                        <ion-icon :icon="camera" size="large"></ion-icon>
                    </ion-button>
                        <ion-button ref="tAke" class="takePhoto" 
                                @click="hideContainer" 
                                v-if="this.$store.getters.getNumberTaken  > 1">
                        <ion-icon :icon="checkmark" size="large"></ion-icon>
                    </ion-button>
                    <!-- <sign-ature></sign-ature> -->

                </div>
                
                
                <!-- <img v-if="capturedImage" :src="capturedImage" alt="Captured Image" /> -->
            </div>
        </template>

<script>
// import Menu from '../menu.vue'
import signature from '../signature.vue'
import { camera, add, checkmark, downloadOutline} from 'ionicons/icons'
import { IonButton, IonButtons, IonIcon } from '@ionic/vue'
export default {
    components:{
        // 'me-nu' : Menu,
        'sign-ature': signature,
        'ion-button' : IonButton,
        IonButtons,
        IonIcon,
    },
    emits:[
        'imageCaptured',
    ],
    data(){
        return {
            camera, add, checkmark, downloadOutline,
            imageData: null,
            videoElement: null,
            capturedImage: '',
            numberTaken : 0,
            stream: null,
            wantCamera : true,
        }
    },
    mounted(){
        this.$refs.tAke.clicked()
    },
    mounted(){
        this.captureImage()
    },
    updated(){},
    watch: {
        // capturedImage(value){
        //     this.numberTaken += 1
        //     console.log("You are taking a photo: ", this.numberTaken)
        // }
    },
    methods: {
        hideContainer(){
            this.stopCamera()
            this.wantCamera = false
            this.$store.state.wantTakePhoto = false
        },
        async captureImage() {
            try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

            this.$refs.videoElement.srcObject = this.stream; // Set the srcObject property using $refs

            const track = this.stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            // this.numberTaken += 1;
            this.$store.commit('addPhotoNumber');
            console.log("The number taken: ", this.$store.getters.getNumberTaken)
            
            if(this.$store.getters.getNumberTaken > 1){
                const blob = await imageCapture.takePhoto();

                this.capturedImage = URL.createObjectURL(blob);
            }
            this.$emit('imageCaptured', {
                capturedImage:this.capturedImage,
                imageData: this.imageData,
            })
            } catch (error) {
                console.error('Error accessing camera or capturing image:', error);
            }
        },
        stopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach(async (track) => {
                try {
                    await track.stop(); // Stop each track in the media stream
                    console.log("Track stopped successfully");
                } catch (error) {
                    console.error("Error stopping track:", error);
                }
                });
            } else {
                console.log("No valid media stream to stop");
            }
        },
        async captureImage2(){
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

            // const video = document.getElementsByTagName('video');
            // document.body.appendChild(video);
            // video.srcObject = mediaStream;
            // video.play();

            // const canvas = document.createElement('canvas');
            // canvas.width = video.videoWidth;
            // canvas.height = video.videoHeight;
            // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

            // this.imageData = canvas.toDataURL('image/jpeg');

            // video.remove();
            mediaStream.getVideoTracks()[0].stop();
        },
        async captureImageFromCamera(){
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                // Display the video stream in a video element
                // You can provide your custom UX for capturing the image, for example, a "Capture" button
                // When the user clicks the "Capture" button, you can capture a frame from the video stream
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const imageDataURL = canvas.toDataURL('image/jpeg');
            const blob = await (await fetch(imageDataURL)).blob();

           },
           approveImage(){
            this.$store.commit('addcapturedImage', {value: this.capturedImage})
            this.$router.back()
           },
        async sendImageToApi() {
            try {
                const response = await fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify({ image: this.capturedImage }), // Send the image data in the request body
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                if (response.ok) {
                console.log('Image successfully sent to the API');
                } else {
                console.error('Failed to send image to the API');
                }
            } catch (error) {
                console.error('An error occurred while sending the image to the API:', error);
            }
            },

    }
}
</script>

<style scoped>
#camera-container {
  display: inline-flex;
  flex-direction: column;
  width: 90vw;
  height: 45vh;
  align-items: center;
}

.camera-frame {
    display: inline-flex;
  position: relative;
  /* width: 300px; Adjust the width and height as necessary */
  height: 200px;
  width: 45vw;
  /* height: calc(45vw * 1.2); */
  height: 42vh;
  overflow: hidden;
  border: 6px solid #fff; /* Frame border style */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Frame shadow effect */
  border-radius: 10px; /* Round the corners of the frame */
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the video fills the frame without stretching */
}

</style>