
<template>
    <me-nu>
        <template v-slot:options>
            <div class="opt">
                 <div v-for="app in apps" class="opti1" :style="{
                    borderRadius: app.borderRadius,
                    backgroundImage: app.logo,
                }">
                    <!-- Title: APP1 -->
                    <div class="labe1">{{ app.name }}</div>
                </div>
            </div>
        </template>
    </me-nu>
</template>

<script>
import Menu from './menu.vue'
export default {
    components:{
        'me-nu': Menu,
    },
    beforeUpdate(){
        // console.log("Before UPDATE, LIst")
        // this.moveLab()
    },
    data(){
        return {
            bgco : 'yellow',
            apps : [
                {
                    logo : "url('../../resources/logo/logo_home/TopupWallet.png')",
                    name : 'Recharger',
                    color: 'red',
                    borderRadius : '5px',
                },
                {
                    logo : "url('../../resources/logo/logo_home/Transfe.png')",
                    name : 'Transferer',
                    color: 'orange',
                    borderRadius : '10px',
                },
                {
                    logo : "url('resources/logo/logo_home/MoneyDown.png')",
                    name : 'Retirer',
                    color: 'gray',
                    borderRadius : '7px',
                },
                {
                    logo : "url('resources/logo/logo_home/Savinge.png')",
                    name : 'Epargner',
                    color: 'grey',
                    borderRadius : '25px',
                },
                {
                    logo : "url('resources/logo/logo_home/Currencies.png')",
                    name : 'Convertir',
                    color: 'yellow',
                    borderRadius : '5px',
                },
            ]
        }
    },
    methods:{
        moveLab(){
            const lab = document.body.querySelector('.lab1')

            console.log("Have applied the LEFT property")
            lab.style.left = '1px'
        },
    }
}
</script>

<style scoped>
    .opt{
        margin: 20px;
        justify-content: center; 
        text-align: center;
    }
    .opti1{
        display: inline-block;
        background-size: cover;
        height: 90px;
        width: 90px;
        position : relative;
        border-radius: 5px;
        margin-top: 35px;
        margin-right: 20px;
        justify-content: center;
        text-align: center;
        align-content: center;
        background-position: center;
    }
    .labe1{
        
        display: inline-block;
        background-color: blueviolet;
        height: 20px;
        width: 90px;
        position : relative;
        margin: 0;
        top : 85px;
        fill: blue;
        border-radius: 10px;
    }
</style>