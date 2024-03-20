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
            height: 100px;
            width: 320px;
            /* background-color: #fff; */
            background-color: transparent;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .dot-left{
            position: relative;
            height: 50%;
            /* width: 8%; */
            width: 16%;
            background-color: red;
            background-color: black;
            background-color: rgba(255, 187, 0, 0.781);
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
            /* width: 8%; */
            width: 16%;
            background-color: rgb(0, 255, 34);
            background-color: #ab7400;
            background-color: white;
            left : 45%;
            left : 50%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 250px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent3;
            animation-duration: 1s;
            animation-delay: 1.7s;
            /* animation-delay: 0.7s; */
            animation-delay: 0.5s;
            animation-iteration-count: infinite;
            /* animation-range-start: 3s; */
        }
        .dot-right{
            position: absolute;
            height: 50%;
            /* width: 8%; */
            width: 16%;
            background-color: rgb(8, 165, 139);
            background-color: white;
            background-color: rgba(255, 187, 0, 0.781);
            /* left : 75%; */
            left : 90%;
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
                /* left: 60%; */
                box-shadow: 0 0 15px rgb(255, 187, 0);
            }
            69%{
                box-shadow: 0 0 55px orange;
            }
            75%{
                left: 33.5%;
                box-shadow: 0 0 15px orange;
            }
        }
        @keyframes agent3 {
            0%, 100%{
                /* background-color: rgb(0, 255, 34);; */
            }
            50%{
                /* background-color : red; */
                /* box-shadow: 0 0 45px rgb(0, 255, 34); */
                box-shadow: 0 0 45px white;
            }
            75%{
                /* background-color: rgb(8, 165, 139); */
                /* box-shadow: 0 0 65px rgb(0, 255, 34); */
                box-shadow: 0 0 75px white;
                /* background-color: green; */
            }
        }
        @keyframes agent5 {
            0%, 100%{
                left: 90%;
            }
            50%{
                /* left: 60%; */
                box-shadow: 0 0 15px rgb(255, 187, 0);
            }
            69%{
                box-shadow: 0 0 55px orange;
            }
            75%{
                left: 67%;
                box-shadow: 0 0 15px orange;
            }
        }
</style>