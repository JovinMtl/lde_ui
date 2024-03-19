<template>
    <div style="text-align: center; margin-left: 45vw;">
                <div style="display: inline-flex; width: 30vw;
                height: 6vh; 
                /* background-color: red; */
                text-align: center;  line-height: 6vh;
                position:absolute">
                <div class="avatar" style="
                    ">
                    <ion-icon class="iconAvatar" :icon="personCircle"></ion-icon>
                </div>
                <div class="username">
                    {{ store.getters.getUsername }}
                </div>
            </div>
            </div>
</template>