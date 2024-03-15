<template>
    <div class="container">
        <div class="container-processing">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
            <div class="line4"></div>
            <div class="line5"></div>
        </div>
    </div>
    
</template>

<style scoped>
        *{
            margin: 0;
            padding: 0;
            background-color: rgb(70, 67, 67);
        }
        /* body{
            position: relative;
            width: 100vw;
            height: 100vh;
        } */
        .container-processing{
            position: absolute;
            height: 20vh;
            width: 50vw;
            background-color: black;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .line1{
            position: relative;
            height: 50%;
            width: 10%;
            background-color: red;
            top : 50%;
            left : 15%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent1;
            animation-duration: 1s;
            /* animation-delay: 0s; */
            /* animation-timing-function: steps(5, start); */
            /* animation-range-start: 5; */
            animation-iteration-count: 5;
        }
        .line1:nth-child(3n){
            animation-delay: 5s;
        }
        .line3{
            position: absolute;
            height: 50%;
            width: 10%;
            background-color: rgb(0, 255, 34);
            left : 45%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent3;
            animation-duration: 1s;
            animation-delay: 1.7s;
            /* animation-iteration-count: infinite; */
            /* animation-range-start: 3s; */
        }
        .line5{
            position: absolute;
            height: 50%;
            width: 10%;
            background-color: rgb(8, 165, 139);
            left : 75%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent5;
            animation-duration: 1s;
            animation-name: agent5;
            animation-duration: 1s;
            animation-delay: 3.7s;
            /* animation-iteration-count: infinite; */
        }
        .line2{
            position: absolute;
            height: 50%;
            width: 10%;
            background-color: rgba(189, 224, 63, 0.959);
            background-color: rgb(217, 255, 0);
            left : 30%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent1;
            animation-duration: 1s;
            animation-delay: 0.7s;
            /* animation-iteration-count: infinite; */
        }
        .line4{
            position: absolute;
            height: 50%;
            width: 10%;
            background-color: blueviolet;
            left : 60%;
            top : 50%;
            transform: translate(-50%, -50%);
            border-radius: 10px;
            transition-property: all;
            transition-duration: 0.3s;
            animation-name: agent4;
            animation-duration: 1s;
            animation-delay: 2.7s;
            /* animation-iteration-count: infinite; */
        }
        .line1:hover{
            height: 90%;
        }
        .line2:hover{
            height: 90%;
        }
        .line3:hover{
            height: 90%;
        }
        .line4:hover{
            height: 90%;
        }
        .line5:hover{
            height: 90%;
        }
        /* .line5:hover{
            position: relative;
            height: 80%;
            top: -16%;
        } */
        @keyframes agent4 {
            0%, 100%{
                height: 50%;
            }
            50%{
                height: 75%;
                box-shadow: 0 0 45px blueviolet;
            }
            75%{
                height: 90%;
                box-shadow: 0 0 35px blueviolet;
            }
        }
        @keyframes agent5 {
            0%, 100%{
                height: 50%;
            }
            50%{
                height: 75%;
                box-shadow: 0 0 45px rgb(8, 165, 139);
            }
            75%{
                height: 90%;
                box-shadow: 0 0 35px rgb(8, 165, 139);
            }
        }
        @keyframes agent3 {
            0%, 100%{
                height: 50%;
            }
            50%{
                height: 75%;
                box-shadow: 0 0 45px rgb(0, 255, 34);
            }
            75%{
                height: 90%;
                box-shadow: 0 0 35px rgb(0, 255, 34);
                /* background-color: green; */
            }
        }
        @keyframes agent2 {
            0%, 100%{
                height: 50%;
            }
            50%{
                height: 75%;
                /* box-shadow: 0 0 45px yellow; */
                box-shadow: 0 0 35px rgb(217, 255, 0);
            }
            75%{
                height: 90%;
                /* box-shadow: 0 0 35px rgb(189, 224, 63); */
                box-shadow: 0 0 35px rgb(217, 255, 0);
            }
        }
        @keyframes agent1 {
            0%, 100%{
                height: 50%;
            }
            50%{
                height: 75%;
                box-shadow: 0 0 45px red;
            }
            75%{
                height: 90%;
                box-shadow: 0 0 35px red;
            }
        }
</style>