<template>
    <feui-lle>
        <back-button></back-button>
        <div class="loginPage" style="padding: 60px 0;">
            <div class="header">
                <signature-head></signature-head>
            </div>
        </div>
    </feui-lle>
</template>

<script>
import feuille from '../../Layout/feuille.vue';
import BackButton from '../../auxiliare/backButton.vue'
export default {
    components:{
        BackButton,
    },
    setup() {
    },
}
</script>