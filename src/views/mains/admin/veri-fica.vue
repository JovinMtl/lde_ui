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
    <div class="centered" v-if="data">
        <div v-if="data.solde">
            <h5>{{ dataInput }}</h5>
            <div class="infoContainer" v-if="data.info.level > 1">
                <div class="info z1">
                    infos
                </div>
                <div class="infoContent">
                    Nom: {{ data.info.firstname }} ;
                    Prenom : {{ data.info.lastname }} ;
                    Numero : {{ data.info.phonenumber }} ;
                    Email : {{ data.info.email }} .

                </div>
            </div>
            <div class="solde">
                <sol-de :injectableSolde="data.solde"></sol-de>
            </div>
            <div class="histoContainer" v-if="(data.historique).length">
                <div class="histo z1">
                    Historique:  
                </div>
                <div class="histoContent">
                    <ol style="border-radius: 15px; background-color: transparent;
                    box-shadow: 0 0 25px white;">
                        <li v-for="histo in data.historique" 
                            >
                            <!-- {{ notif }} -->
                            {{ histo.source }} a autorisé {{ histo.motif }} de
                            {{ histo.amount }}({{ histo.currency }}) 
                            au compte de {{ histo.destination }}. 
                            Date: {{ (histo.date_approved).slice(0,10) }} ; 
                            heure: {{ (histo.date_approved).slice(14,19) }} ;
                            code d'opération: {{ histo.code }} .
                        </li>
                    </ol>
                </div>
            </div>
            <div class="notifContainer" v-if="(data.notifications).length">
                <div class="notif z1">
                    Notifications:   
                </div>
                <div class="notifContent">
                    <ol style="border-radius: 15px; background-color: transparent;
                    box-shadow: 0 0 25px white;">
                        <li v-for="notif in data.notifications" 
                            >
                            <!-- {{ notif }} -->
                            {{ notif.destination }} a fait {{ notif.motif }} de
                            {{ notif.amount }}({{ notif.currency }}). 
                            Date: {{ (notif.date_approved).slice(0,10) }} ; 
                            heure: {{ (notif.date_approved).slice(14,19) }} ;
                            code d'operation: {{ notif.code }} .
                        </li>
                    </ol>
                </div>
            </div>
            
        </div>
        <div class="centered" v-show="!data.solde">
            L'utilisateur '<span style="color: red;">{{ dataInput }}</span>' n'a pas été trouvé.
        </div>
        
    </div>
    <div class="centered welcomeText" v-else>
        Entrez simplement le nom d'utilisateur pour en savoir plus.
    </div>
    
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { 
    IonItem, IonList, IonSearchbar, IonSpinner,
    IonSelect, IonSelectOption,
} from '@ionic/vue';
import Loader from '../../../views/auxiliare/processing/processing1.vue'
import Solde from '../../../views/auxiliare/solde.vue'
export default {
    components: {
        IonItem, IonList, IonSearchbar, IonSpinner,
        IonSelect, IonSelectOption,
        'loa-der': Loader,
        'sol-de' : Solde,
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
  /* ion-searchbar:hover .welcomeText{
    background-color: red;
  } */
  .z1{
    border : 5px solid black;
    border-radius: 5px;
  }
  .solde{
    /* padding-top: -80px; */
    margin-top: -65px;
    margin-bottom: -32px;
    /* background-color: red; */
  }
</style>
