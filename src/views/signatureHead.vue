<template>
    <router-link to="/">
        <div id="endPag">
            <div id="logolit"></div>
            <div id="text">
                <p>LD </p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
#endPag{
            display: inline-block;
            position: relative;
            width: 100%;
            height: 20px;
            justify-content: center;
            text-align: center;
            /* font-size: 60px; */
        }
    #logolit{
        display: inline-block;
        position: relative;
        width: 85px;
        height: 85px;
        top: 15px;
        /* margin-right: 10px; */
        background-image: url('../../public/resources/logo/logo_home/Lit_Dinard_ON_ORANGE.png');
        background-size: cover;
    }
    #text{
        display: inline-flex;
        position: relative;
        color: black;
        font-size: 60px;
        /* top: -50px; */
        /* right: -5px; */
    }
</style>