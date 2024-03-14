<template>
    <router-link to="/">
        <div id="endPag">
            <div id="logolit"></div>
            <div id="text">
                LD
            </div>
        </div>
    </router-link>
</template>

<style scoped>
#endPag{
            display: inline-flex;
            position: absolute;
            /* background-color: green; */
            width: 100%;
            height: 17vh;
            margin-left: -1.2vw;
            /* margin-top: -2vh; */
            justify-content: center;
            text-align: center;
        }
    #logolit{
        display: inline-block;
        position: relative;
        width: 16vh;
        height: 16vh;
        margin-top: 1.2vh;

        /* background-image: url('/resources/logo/logo_home/Lit_Dinard_ON_ORANGE.png'); */
        background-image: url('/Lit_Dinard_ON_GRAY.png');
        background-size: cover;
    }
    #text{
        display: inline-block;
        position: relative;
        color: black;
        /* font-size: 60px; */
        font-size: 14vh;
        margin-top: 1.25vh;
    }
</style>