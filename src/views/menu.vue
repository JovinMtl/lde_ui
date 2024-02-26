
<template>
    <base-layout :pageTitle="title ? title : 'Bienvenue sur LD'">
    <template v-slot:back-left v-if="backButton == 'true'">
      <ion-icon :icon="arrowBack" size="large" class="bige"></ion-icon>
      <!-- <ion-icon :icon="home"></ion-icon> -->
    </template>
    <template v-slot:finish-right>
      <div class="right-icon">
        <ion-icon :icon="notifications" size="large"></ion-icon>
        <ion-icon :icon="exit" slot="end" size="large"></ion-icon>
      </div>
        
    </template>
    <div class="same">
        <div class="headShower">
            <div class="shower">
                <ion-icon :icon="eyeOff" v-if="!soldeVisible" @click="Invert"></ion-icon>
                <ion-icon :icon="eye" v-if="soldeVisible" @click="Invert"></ion-icon> 
                <p v-if="!soldeVisible">*******</p>
                <p v-else @click="Invert">{{ solde }} LiD</p>
            </div>
        </div>
        <br><br>
        <slot name="options"></slot>
        <slot name="depot"></slot>
    </div>
    <template v-slot:bottom-menu>
        <div class="menu">
        </div>
        <div class="conti">
            <ion-icon class="ico1" :icon="home" size="large"></ion-icon>
            <ion-icon class="ico2" :icon="layers" size="large"></ion-icon>
            <ion-icon class="ico3" :icon="wallet" size="large"></ion-icon>
            <ion-icon class="ico4" :icon="personCircle" size="large"></ion-icon>
        </div>
        <div class="labels">
            <ion-label class="lab1">Home</ion-label>
            <ion-label class="lab2">History</ion-label>
            <ion-label class="lab3">Portefeuille</ion-label>
            <ion-label class="lab4">Profile</ion-label>
        </div>
        
        
    </template>
    </base-layout>
</template>
<script>
import { 
    IonBackButton, IonMenuButton, IonButton, 
    IonMenuToggle
} from '@ionic/vue'
import { add } from 'ionicons/icons'
import { 
    heart, returnUpBack, arrowBack, home, exit,
    eyeOff, eye, wallet, layers, personCircle, 
    notificationsCircle, notifications
     } from 'ionicons/icons';
export default {
  props:[
    'title',
    'backButton',
  ],
  components: {
    IonBackButton,
    IonMenuButton,
    IonButton,
    IonMenuToggle,
  },
  beforeCreate(){
    console.log("Before Create")
  },
  created(){
    console.log("Created")
    this.getWth()
  },
  beforeMount(){
    console.log("Before Mount")
  },
  mounted(){
    console.log("Mounted")
    this.setMenuIcons()
  },
  data(){
    return { 
        solde : 2000,
        soldeVisible : false,
        devWidth : 0,
        add, heart, returnUpBack, arrowBack, home, exit,
        eyeOff, eye, wallet, layers, personCircle, 
        notificationsCircle, notifications
     }
  },
  methods: {
    Invert(){
        this.soldeVisible = !this.soldeVisible
    },
    CheckClick(){
        alert("You have clicked")
    },
    getWth(){
        const devWidth = window.innerWidth
        this.devWidth = devWidth

        console.log("THe new width is : ", this.devWidth)
    },
    getWidth(){
        window.onload = ()=>{
            const devWidth = window.innerWidth
            this.devWidth = devWidth

            console.log("THe width is : ", this.devWidth)
        }
        // this.setMenuIcons()
    },
    setMenuIcons(){
        const homeButton = document.body.querySelector('.ico1')
        const homeLabel = document.body.querySelector('.lab1')

        const historyButton = document.body.querySelector('.ico2')
        const histoLabel = document.body.querySelector('.lab2')

        const walletButton = document.body.querySelector('.ico3')
        const walletLabel = document.body.querySelector('.lab3')

        const profileButton = document.body.querySelector('.ico4')
        const profileLabel = document.body.querySelector('.lab4')

        
        var copta = 0
        const i = Number(this.devWidth / 7)
        console.log("Attempting to apply : ", this.devWidth, "first: ", i)
        const newI = (i-(this.devWidth / 70))
        // newI = i
        const i1 = newI
        // const i1 = 30
        const i2 = (i1 * 2) + (i1/10)
        const i3 = (i1 * 3) + (i1/10)
        const i4 = (i1 * 4) + (i1/10)
        homeButton.style.left = `${i1}px`
        homeLabel.style.left = `${i1}px`

        historyButton.style.left = `${i2+(i*0.5)}px`
        histoLabel.style.left = `${i2+(i*0.47)}px`
        

        if(this.devWidth < 470) {
            copta = 0.0
        } else if ((this.devWidth > 470) && (this.devWidth < 550)){
            copta = 0.02
        }else if ((this.devWidth > 550) && (this.devWidth < 640)){
            copta = 0.08
        } else if ((this.devWidth > 640) && (this.devWidth < 870)){
            copta = 0.12
        } else {
            copta = 0.2
        }
        walletButton.style.left = `${i3+(i*1.0)}px`
        walletLabel.style.left = `${i3+(i*(0.74135+copta))}px`

        profileButton.style.left = `${i4+(i*1.65)}px`
        // profileButton.style.left = '580px'
        profileLabel.style.left = `${i4+(i*1.65)}px`
        // profileLabel.style.left = '580px'
        // profileButton.style.left = '472px'

        console.log("First: ", i1, "\n", "second :", i2, i3, ((this.devWidth-50)-i1))
        console.log("With Copta: ", copta)
    }
  }
}
</script>

<style scoped>

 .fields{
    height: 30px;
    border-radius: 15px;
    /* color: green; */
    color: #ab7400;
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
    /* background-color: green; */
    background-color: #ab7400;;
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
  .shower{
    display: inline-block;
    width: 280px;
    height: 55px;
    /* background-color: aqua; */
    border-radius: 10px;
    border: 2px solid black;
    /* color: blue; */
    /* fill: none; */
  }
  .headShower{
    text-align: center;
    /* background-color: red; */
  }
  p p {
    background-color: red;
  }

  .shower ion-icon {
    position: relative;
    display: inline-flex;
    bottom: 0px;
    right: 20px;
    /* display: flex;
    margin-left: 10px;
    margin-top: 5px; */
  }
  .shower p{
    position: relative;
    display: inline-flex;
    bottom: 3px;
  }
  .conti{
    display: inline-flex;
    width: 100vw;
    height: 100%;
    /* color: green; */
    /* background-color: yellow; */
    /* background-color: black; */
    /* top: 30px; */
    /* margin: 0; */

  }
  .ico4{
    display: inline-flex;
    position: fixed;
    left: 200px;
    /* left: var(--min-width); */
    color: black;
    /* color: green; */
    color: #ab7400;
  }
  .lab4{
    display: inline-flex;
    position: fixed;
    left: 185px;
    top: 28px;
  }
  .ico3{
    display: inline-flex;
    position: fixed;
    left: 150px;
    /* left: var(--min-width); */
    color: black;
    /* color: green; */
    color: #ab7400;

  }
  .lab3{
    display: inline-flex;
    position: fixed;
    left: 125px;
    top: 28px;
  }
  .ico2{
    display: inline-flex;
    position: fixed;
    left: 100px;
    /* color: green; */
    color: #ab7400;
    }
  .lab2{
    display: inline-flex;
    position: fixed;
    left: 75px;
    top: 28px;
  }
    .ico1{
    display: inline-flex;
    position: relative;
    left: 50px;
    /* color: green; */
    color: #ab7400;
    }
  .labels{
    display: flex;
    /* position: relative; */
    top : 25px;
    font-size: 12px;
  }
  .lab1{
    display: inline-flex;
    position: fixed;
    left: 45px;
    top: 28px;
  }
  ion-icon{
    position: relative;
    bottom: 5px;
    /* font-size: 11px; */
  }
  .right-icon{
    position:relative;
    top: 6px;
  }
  .bige{
    top: 4px;
  }
</style>
