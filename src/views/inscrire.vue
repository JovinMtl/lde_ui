
<template>
    <base-layout pageTitle="Have an account to LDE">
    <template v-slot:back-left>
      <ion-icon :icon="arrowBack" class="bige"></ion-icon>
      <ion-icon :icon="home"></ion-icon>
    </template>
    <sign-ature></sign-ature>
    <div class="same">
      <div class="centered">
            <p>Please Complete this Form to create your Account</p>
      </div>
        <form>
            <div class="user">
              <input class="fields" placeholder="Your username" v/> <br>
              <input class="fields" placeholder="Your Email" v/> <br>
              <input class="fields" placeholder="Your Phone Number" v/> <br>
              <input class="fields" placeholder="Your Address" v/> <br>
              <input class="fields" type="password" placeholder="Your Password"/> <br>
              <input class="fields" type="password" placeholder="Your Password again"/> <br>
              <input class="fields send"  type="button" value="Add Account" />
            </div>
            <br>
            <!-- <div class="centered">
              <input type="button" value="Connexion" />
            </div> -->
            
        </form>
    </div>
    </base-layout>
</template>
<script>
import { IonBackButton,  } from '@ionic/vue'
// import { return-up-back } from 'ionicons/icons'
import { add } from 'ionicons/icons'
import { heart, returnUpBack, arrowBack, home} from 'ionicons/icons';
import Signature from './signature.vue'

export default {
  components: {
    IonBackButton,
    Signature
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
  .send{
    color:rgb(136, 255, 0);
    justify-content: center;
    text-align: center;
    line-height: 100%;
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
