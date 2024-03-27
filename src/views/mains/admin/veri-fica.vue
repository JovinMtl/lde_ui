<template>
    <!-- <p>Here we Check the USER</p> -->
    <div style="margin-top: 40px;">
        <ion-searchbar 
            class="custom"
            animated="true"
            :debounce="1000" 
            @ionInput="aboutUser($event)"
            placeholder="Tapez le nom d'utilisateur"
            showCancelButton="focus"
            cancel-button-text="Oublier"
            >
        </ion-searchbar>
    </div>
</template>
<script>
import { IonItem, IonList, IonSearchbar } from '@ionic/vue';
export default {
    components: {
        IonItem, IonList, IonSearchbar
    },
    setup() {

        function aboutUser(userInput){
            const query = userInput.target.value.toLowerCase();
            // setting the urls about different Endpoints to ask
            // now sending a request
        }

        return {
            aboutUser,
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
