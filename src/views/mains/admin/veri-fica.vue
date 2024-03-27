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
        <ion-list>
            <ion-item>Jove</ion-item>
        </ion-list>
    </div>
</template>
<script>
import { ref } from 'vue'
import { IonItem, IonList, IonSearchbar } from '@ionic/vue';
export default {
    components: {
        IonItem, IonList, IonSearchbar
    },
    setup() {
        const dataInput = ref(null)

        function aboutUser(userInput){
            const query = userInput.target.value.toLowerCase();
            console.log("You want to search for : ", dataInput.value)
            // setting the urls about different Endpoints to ask
            // now sending a request
        }

        return {
            aboutUser, dataInput,
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
