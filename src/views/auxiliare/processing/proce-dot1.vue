<template>
    <div class="dot-container">
        <div class="dot-left"></div>
        <div class="dot-middle"></div>
        <div class="dot-right"></div>
    </div>
</template>

<style scoped>
        *{
            margin: 0;
            padding: 0;
            background-color: rgb(70, 67, 67);
        }
        body{
            position: relative;
            width: 100vw;
            height: 100vh;
        }
        .dot-container{
            position: absolute;
            height: 20vh;
            width: 50vw;
            background-color: #fff;
            background-color: transparent;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .dot-left{
            position: relative;
            height: 50%;
            width: 8%;
            background-color: red;
            top : 50%;
            left : 15%;
            transform: translate(-50%, -50%);
            border-radius: 250px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent1;
            animation-duration: 1s;
            animation-iteration-count: infinite;
        }
        .dot-middle{
            position: absolute;
            height: 50%;
            width: 8%;
            background-color: rgb(0, 255, 34);
            left : 45%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 250px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent3;
            animation-duration: 1s;
            animation-delay: 1.7s;
            /* animation-delay: 0.7s; */
            animation-iteration-count: infinite;
            /* animation-range-start: 3s; */
        }
        .dot-right{
            position: absolute;
            height: 50%;
            width: 8%;
            background-color: rgb(8, 165, 139);
            left : 75%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 250px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent5;
            animation-duration: 1s;
            animation-name: agent5;
            animation-duration: 1s;
            /* animation-delay: 3.7s; */
            animation-iteration-count: infinite;
        }
        @keyframes agent1 {
            0%, 100%{
                left: 10%;
            }
            50%{
                left: 30%;
                box-shadow: 0 0 45px red;
            }
            75%{
                left: 35%;
                box-shadow: 0 0 35px red;
            }
        }
        @keyframes agent3 {
            0%, 100%{
                /* background-color: rgb(0, 255, 34);; */
            }
            50%{
                /* background-color : red; */
                box-shadow: 0 0 45px rgb(0, 255, 34);
            }
            75%{
                /* background-color: rgb(8, 165, 139); */
                box-shadow: 0 0 65px rgb(0, 255, 34);
                /* background-color: green; */
            }
        }
        @keyframes agent5 {
            0%, 100%{
                left: 75%;
            }
            50%{
                left: 60%;
                box-shadow: 0 0 45px rgb(8, 165, 139);
            }
            75%{
                left: 55%;
                box-shadow: 0 0 35px rgb(8, 165, 139);
            }
        }
</style>