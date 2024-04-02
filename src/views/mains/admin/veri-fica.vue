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
            @keyup="checkEnter($event)"
            enterkeyhint="search"
            mode="ios"
            v-model="dataInput"
            >
        </ion-searchbar>
        <div style="text-align: center;" v-show="waiting">
            <loa-der></loa-der>
            <!-- <ion-spinner></ion-spinner> -->
        </div>
    </div>
    <div class="centered">
        <h5>jove</h5>
        <div class="info z1">
            infos
        </div>
        <div class="solde z1"></div>
        <div class="histo z1"></div>
        <div class="notif z1"></div>
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

        const checkEnter = (ev)=>{
            if(ev.key=='Enter'){
                dataInput.value = ev.target.value
                console.log("You type: ", dataInput.value)
                kubaza()
                // console.log("")
            } else {
                //
                console.log("Waiting that you press enter : ",ev.key,";",ev.target.value)
            }
        }

        async function kubaza(){
            const url = ' http://localhost:8002/jov/api/invest/allInvests/'
            const baseURL = '//127.0.0.1:8002'
            var suffix = '/jov/api/check/userAvailable/'

            console.log("Applying INPUT: ", dataInput.value)
            
            

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
            aboutUser, dataInput, data, waiting, checkEnter,
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
  .z1{
    border : 5px solid black;
    border-radius: 5px;
  }
</style>
