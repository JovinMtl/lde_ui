
<template>
    <base-layout pageTitle="You are about to Connect to LDE">
    <template v-slot:back-left>
      <!-- <ion-button  @listenJove="saveMemory">
        <ion-icons slot="icon-only" :icon="add"></ion-icons>
      </ion-button> -->
      <ion-icon slot="icon-only" :icon="add"></ion-icon>
      <ion-icon :icon="heart"></ion-icon>
      <ion-icon :icon="returnUpBack"></ion-icon>
      <ion-icon :icon="arrowBack" class="bige"></ion-icon>
      <ion-icon :icon="home"></ion-icon>
    </template>
    <div class="same">
      <div class="centered">
            <p>Please Provide Your Username and Password</p>
      </div>
        <form>
            <div class="user">
              <input class="fields" placeholder="Your username" v/> <br>
              <input class="fields" type="password" placeholder="Your Password"/> <br>
            </div>
            <br>
            <div class="centered">
              <input type="button" value="Connexion" />
            </div>
            
        </form>
    </div>
    </base-layout>
</template>
<script>
import { IonBackButton,  } from '@ionic/vue'
// import { return-up-back } from 'ionicons/icons'
import { add } from 'ionicons/icons'
import { heart, returnUpBack, arrowBack, home} from 'ionicons/icons';
export default {
  components: {
    IonBackButton,
  },
  data(){
    return { add, heart, returnUpBack, arrowBack, home, }
  },
}
</script>

<style scoped>
  .centered {
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }

 .fields{
    height: 30px;
    border-radius: 15px;
    color: green;
    /* background-color: green !important; */
  }
  .user {
    height: 150px;
    display: block;
    text-align: center;
    text-align: center;
    line-height: 60px;
    /* background-color: red; */
  }
  .same{
    height: 100vh;
    background-color: green;
    padding-top: 50px;
  }
  ion-back-button{
    color:red;
    background-color: blue;
  }
  /* .bige{
    display: inline;
    position: absolute;
    width: 160px;
    height: 20px;
    margin-left: 20px;
    color: red;
    font-size: 80px;
  } */
</style>
