<template>
  <ion-list>
        <ion-item v-for="(log, index) in reversedLogs">
            {{ index + 1 }}: "{{ log.content }}":{{ log.time }}
        </ion-item>
    </ion-list>   
</template>

<script>
import { IonList, IonItem
} from '@ionic/vue'
import { ref, computed} from 'vue'
export default {
    components: {
        IonList, IonItem
    },
    setup(){
        const logs = [
            {
                id: 0,
                content: 'Vous avez recharger votre compte avec Lumicash',
                time: '2024 03 02 15:20'
            },
            {
                id: 1,
                content: 'Vous avez recharger votre compte avec Ecocash',
                time: '2024 03 02 17:20'
            },
            {
                id: 2,
                content: 'Vous avez recharger votre compte avec KCB',
                time: '2024 03 02 18:10'
            },
            {
                id: 3,
                content: 'Vous avez Retirer 5000 votre compte sur Lumicash',
                time: '2024 03 03 08:20'
            },
            {
                id: 4,
                content: 'Vous avez recharger votre compte avec KCB',
                time: '2024 03 03 08:30'
            },
            {
                id: 5,
                content: 'Vous avez Retirer 15000 votre compte sur eNoti',
                time: '2024 03 03 08:35'
            },
            {
                id: 6,
                content: 'Vous avez recharger 8000 sur votre compte avec eNoti',
                time: '2024 03 03 09:10'
            },
        ]
        const reversedLogs = computed(()=>{
            return logs.reverse().splice(0,5)
        })
        return {
            logs, reversedLogs
        }
    }
}
</script>

<style>

</style>