
<template>
    <div id="info" style="margin-top: 3vh;">
        <p class="segoe">Veuillez choisir l'opération de votre choix.</p>
    </div>
    <div class="opt">
        <router-link v-for="app in apps" :to="app.path">
            <div class="opti1" :style="{
            borderRadius: app.borderRadius,
            backgroundImage: app.logo,
        }">
                <div class="labe1">{{ app.name }}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    setup() {
        const apps = [
                {
                    logo : "url('../../resources/logo/logo_home/TopupWallet.png')",
                    name : 'Recharger',
                    color: 'red',
                    borderRadius : '5px',
                    path : '/depot',
                    // path : '/depot-admin',
                },
                // {
                //     logo : "url('../../resources/logo/logo_home/Transfe.png')",
                //     name : 'Transferer',
                //     color: 'orange',
                //     borderRadius : '10px',
                //     path : '/transfer',
                // },
                {
                    logo : "url('resources/logo/logo_home/MoneyDown.png')",
                    name : 'Retirer',
                    color: 'gray',
                    borderRadius : '7px',
                    path : '/retrait',
                    // path : '/retrait-admin',
                },
                // {
                //     logo : "url('resources/logo/logo_home/Currencies.png')",
                //     name : 'Convertir',
                //     color: 'yellow',
                //     borderRadius : '5px',
                //     path : '/convert',
                // },
                {
                    logo : "url('resources/logo/logo_home/savine_.png')",
                    name : 'Investir',
                    color: 'grey',
                    borderRadius : '25px',
                    path : '/invest',
                    // path : '/invest-admin',
                },
                
            ]
        return {
            apps,
        }
    },
}
</script>


<style scoped>
    .centered {
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -50px;
  }
    .opt{
        /* margin: 20px; */
        /* margin-top: -15px; */
        /* padding-bottom: 20vh; */
        /* background-color: red; */
        justify-content: center; 
        text-align: center;
        margin-top: -10px;
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
        /* background-color: blueviolet; */
        background-color: black;
        height: 20px;
        width: 90px;
        position : relative;
        /* color: #ab7400; */
        margin: 0;
        /* top : 85px; */
        top : 55px;
        fill: blue;
        border-radius: 10px;
    }
    .haut{
        /* background-color: red; */
        margin-top: -10px;
    }
</style>