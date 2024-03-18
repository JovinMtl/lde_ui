<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
            <div v-show="modalActive" class="modal-inner">
                <!-- <i class="fa fa-times-circle" aria-hidden="true"></i> -->
                <slot/>
                <button v-if="erreur=='false'" @click="bye" type="button" class="fermer positiveCas">Fermer</button>
                <button v-if="erreur=='true'" @click="bye" type="button" class="fermer erreurCas">Fermer</button>
            </div>
        </transition>
    </div>
  </transition>
</template>

<script>
export default {
    props:[
        'modalActive',
        'beneficiaire',
        'erreur',
    ],
    setup(props, {emit}){
        const payee = props.beneficiaire
        const bye = ()=>{
            emit('byeModal')
        }
        return {
            bye, payee,
        }
    }

}
</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Karla", sans-serif;
}
buttoni{
    padding: 20px 30px;
    border: none;
    font-size: 16px;
    background-color: crimson;
    color : #fff;
    cursor: pointer;
}
.modal{
    display: flex;
    justify-content: center; 
    align-items: center ;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 10;

    .modal-inner{
        position: relative;
        width: 100%;
        height: 42%;
        margin: 20px;
        // box-shadow: 3 3px #fff;
        background-color: #fff;
        // background-color: red;
        box-shadow: 0 0 35px #ab7400;
        // padding: 15px;
        // padding-top: -5vh;
        padding-right: 5vw;
        padding-left: 5vw;
        justify-content: center;
        text-align: center;
        border-radius: 15px;
        font-size: .88rem;
        z-index: 8;

        .fermer{
            position: sticky;
            bottom: 1vh;
            width: 24vw;
            background-color: #ab7400;
            padding: 5px;
            border-radius: 5px;
            box-shadow: 0 0 30px orange;
            font-size: 3vh;
        }
        .erreurCas{
             position: relative;
             top : 5vh;
        }
        @media screen and (max-height: 400px) and (max-width: 700px) {
            .erreurCas{
                top: -1.3vh;
            }
        }
        @media screen and (max-width: 350px) and (max-height: 500px ) {
            .erreurCas{
                top: -2.3vh;
            }
        }
    }
}
</style>