
<template>
    <div class="endPag">
        <p>LD Lit Dinar</p>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log("MOUNTED, Signature")
        this.findHeigh()
    },
    beforeUpdate(){
        console.log("BEFORE Update, Signature")
        this.findHeigh()
    },
    methods:{
        findHeigh(){
            window.onload = ()=>{
                const winHeight = window.innerHeight
                const lab1 = document.body.querySelector('.lab2')
                const positionSignature = document.body.querySelector('.endPag')
                const parLab1 = lab1.parentElement.parentElement.parentElement.parentElement
                // const grandparLab1 = 
                const parHeight = parLab1.innerHeight
                const toolbarHeight = parLab1.offsetHeight
                positionSignature.style.bottom = `${toolbarHeight + 35}px`

                console.log("The height of your ViewPort is : ", winHeight)
                console.log("Setting the color to RED ")
                // lab1.style.color = 'green'
                lab1.style.color = '#ab7400'

                // parLab1.style.backgroundColor= 'green'
                parLab1.style.backgroundColor= '#ab7400'
                console.log("THe parent has: ", parLab1.offsetHeight)

            }
        },
    },
}
</script>

<style scoped>
    .endPag{
            display: inline-block;
            position: fixed;
            width: 100%;
            height: 20px;
            text-align: center;
        }
    .endPage p{
        display: -webkit-box; 
        position: relative;
    }
    
</style>