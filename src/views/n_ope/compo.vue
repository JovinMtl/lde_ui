
<template>
    Here is our page,{{ lastname }}: {{ fulName }} <br>
    <h3>{{ age }}</h3>
    <br>
    <button @click="setLastname">Set Age</button>
    <br>
    <input type="text" placeholder="Your FirstName" v-model="firstname">
    <input type="text" placeholder="Your LastName" ref="lastnameInput">
</template>
<script>
import { ref, computed, watch } from 'vue';
// import func from 'vue-editor-bridge';
export default {
    setup() {
        const uName = ref("Jove")
        const firstname = ref('')
        const lastname = ref('Jove')
        const age = ref(28)
        const lastnameInput = ref(null)

        function setFirstname($event){
            firstname.value = $event.target.value
        }
        
        const fullName = computed(()=>{
            return firstname.value + ' ' + lastname.value
        });

        watch(firstname,(value)=>{
                console.log("Your actual Firstname is : ", value)
            }
        );

        function setLastname(){
            lastname.value = lastnameInput.value.value
        }


        setTimeout(()=>{
            uName.value = "Muteule"
        }, 2000)

        function setAge(){
            age.value = 23
        }
        return {
            name: uName,
            age : age,
            changeAge: setAge,
            fulName: fullName,
            setFirstname,
            firstname,
            lastname,
            setLastname,
            lastnameInput,
        }
    },
}
</script>