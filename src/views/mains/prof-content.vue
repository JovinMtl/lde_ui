<template>
    <!-- <p>Hello profile</p> -->
    <div style="margin-left: 10vw;margin-right: 10vw;">
        <ion-icon :icon="personCircle" style="font-size: 8vh; margin-top: 4vh; " ></ion-icon> 
        <span style="margin-right: .2rem;">&nbsp;</span> 
        <div style="margin-top: 7vh; display: inline-flex; 
            position: relative; width: 60vw; height: 8vh; top: -4.8vh; font-weight: bold;">
            <span style="font-size: 2.8vh;">Nom d'utilisateur</span> <br>
            <span style="position: absolute; margin-top: 3.8vh; font-size: 2.8vh;">+257 61 233 532</span>
        </div> <br>
        
    </div>
    <br><br>
    <router-link to="/chpa" style="text-decoration: none;">
        <div style="background-color: black; 
        height: 7.5vh; width: 80vw; padding-top: 1vh;
        border-radius: 12px; padding-left: 6vw; margin-left: 6vw; color: white;">
            <ion-icon :icon="fingerPrint" style="color: orange; font-size: 5vh;"></ion-icon>
            <span style="margin-right: .2rem;">&nbsp;</span> 
            <span style="position: absolute;margin-top: .9vh; font-weight: bold;">Changer le mot de passe</span> 

            <ion-icon :icon="chevronForward" style="position: absolute;
                left: 77vw; font-size: 5vh; color: orange;"></ion-icon>
        </div> 
    </router-link>
    <br><br>
    <a href="https://wa.me/+971563970168" style="text-decoration: none;">
        <div style="background-color: black; 
        height: 7.5vh; width: 80vw; padding-top: 1vh;
        border-radius: 12px; padding-left: 6vw; margin-left: 6vw; color: white;">
            <ion-icon :icon="logoWhatsapp" style="color: orange; font-size: 5vh;"></ion-icon>
            <span style="margin-right: .2rem;">&nbsp;</span> 
            <span style="position: relative; bottom: 1.6vh; text-align: center; font-weight: bold;">
                Nous contacter</span> 

            <ion-icon :icon="chevronForward" style="position: absolute;
                left: 77vw; font-size: 5vh; color: orange;"></ion-icon>
        </div> 
    </a>
    <div>
        <!-- Callback mode -->
        <span v-if="!isLoaded">Loading...</span>
        <telegram-login-temp
        mode="callback"
        telegram-login="lid111bot"
        @loaded='telegramLoadedCallbackFunc'
        @callback="yourCallbackFunction"
        />
    
        <!-- Redirect mode -->
        <telegram-login-temp
        mode="redirect"
        telegram-login="lid111bot"
        @loaded='telegramLoadedCallbackFunc'
        redirect-url="https://your-website.io"
        />
    </div>


</template>
<script>
import {  IonList, IonItem, IonIcon } from '@ionic/vue'
import { 
    settings, fingerPrint, logoWhatsapp, personCircle, 
    chevronForward,
} from 'ionicons/icons'
import VueTelegramLogin from 'vue-telegram-login';
import { telegramLoginTemp } from 'vue3-telegram-login'
import { ref } from 'vue'
export default {
    components:{
        IonList, IonItem, IonIcon,
        VueTelegramLogin, telegramLoginTemp,
    },
    setup() {
        const openLogin = (user)=>{
            console.log("Vous etes: ", user)
        }
        function handleTelegramLogin(user) {
            // Handle the Telegram user data here
            console.log(user);
        }
        const isLoaded = ref(false)
  
        function telegramLoadedCallbackFunc () {
            console.log('script is loaded')
            isLoaded.value = true
        }
        
        function yourCallbackFunction (user) {
            // gets user as an input
            // id, first_name, last_name, username,
            // photo_url, auth_date and hash
            console.log(user)
        }
        return {
            settings, fingerPrint, logoWhatsapp, personCircle,
            chevronForward,

            handleTelegramLogin, openLogin,
            telegramLoadedCallbackFunc, yourCallbackFunction,
            isLoaded,
        }
    },
}
</script>

<style scoped>
ion-item{
    margin: 20px;
    color : black;
    border: 5px 5px red;
}
</style>