<template>
    <feui-lle>
        <back-button></back-button>
        <view-image></view-image>
    </feui-lle>
</template>

<script>
import feuille from '../Layout/feuille.vue'
import BackButton from '../auxiliare/backButton.vue';
import viewImage from '../mains/view-image.vue';
export default {
    components:{
        'feui-lle': feuille,
        'view-image': viewImage,
        BackButton,
    },
    setup() {
    },
}
</script>