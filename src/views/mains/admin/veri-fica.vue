<template>
    <!-- <p>Here we Check the USER</p> -->
    <div style="margin-top: 40px;">
        <ion-searchbar 
            class="custom"
            animated="true"
            :debounce="1000" 
            placeholder="Tapez le nom d'utilisateur"
            showCancelButton="focus"
            cancel-button-text="Rechercher"
            @ionCancel="aboutUser($event)"
            enterkeyhint="search"
            v-model="dataInput"
            >
        </ion-searchbar>
        <div style="text-align: center;" v-show="waiting">
            <loa-der></loa-der>
            <!-- <ion-spinner></ion-spinner> -->
        </div>
        <ion-list>
            
            <ion-item>Jove</ion-item>
        </ion-list>
        <div>
                <ion-button id="open-popover">Open Popover</ion-button>
                <ion-popover :keep-contents-mounted="true" trigger="open-popover" animated="true">
                <ion-content class="ion-padding" style="background-color: red;
                ">
                    This content was mounted as soon as the popover was created.
                    This content was mounted as soon as the popover was created.

                </ion-content>
                </ion-popover>
        </div>
    </div>
    <div>
        <ion-button id="present-alert">Click Me</ion-button>
        <ion-alert
            trigger="present-alert"
            header="Operation Reussie"
            sub-header="A Sub Header Is Optional"
            message="Vous avez bien approuve cette recharge"
            :buttons="alertButtons"
        ></ion-alert>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { 
    IonItem, IonList, IonSearchbar, IonSpinner,
    IonButton, IonContent, IonPopover,
    IonAlert,
} from '@ionic/vue';
import Loader from '../../../views/auxiliare/processing/processing1.vue'
export default {
    components: {
        IonItem, IonList, IonSearchbar, IonSpinner,
        IonButton, IonContent, IonPopover,
        IonAlert,
        'loa-der': Loader,
    },
    setup() {
        const store = useStore()
        const dataInput = ref(null)
        const data = ref(null)
        const waiting = ref(false)
        const alertButtons = ['Ok'];

        function aboutUser(userInput){
            waiting.value = true
            const query = userInput.target.value.toLowerCase();
            console.log("You want to search for : ", dataInput.value)
            // setting the urls about different Endpoints to ask
            // now sending a request
            kubaza()
        }

        async function kubaza(){
            const url = ' http://localhost:8002/jov/api/invest/allInvests/'
            const baseURL = '//127.0.0.1:8002'
            var suffix = '/jov/api/check/userAvailable/'
            
            

            try {
                const response = await fetch(`${baseURL}${suffix}`,{
                    method: 'POST',
                    headers:{
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+ store.getters.getAccessToken,
                    },
                    body : JSON.stringify({
                        username : dataInput.value,
                    }),
                });

                if (response.ok){
                    data.value = await response.json()
                    waiting.value = false
                    console.log("VERIFICA: Things are well : ", data.value)
                    console.log("CODE: ", response.status)
                    if(data.value.response == 'new'){
                        console.log("You are truly new")
                    }
                } else {
                    console.log("Connection wasn't successfull, with : ", store.getters.getAccessToken)
                }
            } catch(value){
                console.log("THe reason is : ", value)
            }
        }



        return {
            aboutUser, dataInput, data, waiting,
            alertButtons,
        }
        
    },
}
</script>

<style scoped>
ion-searchbar.custom {
    --background: #2c2a2852;
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: orange;
    --clear-button-color: #fff;

    /* --border-radius: 4px; */
  }

  ion-searchbar.ios.custom {
    --cancel-button-color: black;
  }

  ion-searchbar.md.custom {
    --cancel-button-color: #fff;
  }
</style>
