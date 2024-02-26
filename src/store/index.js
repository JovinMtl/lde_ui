
import { createStore} from 'vuex'

const store = createStore({

    state(){
        return {
            toobarTop : '',
            toobarBotom : '',
            hasTop5 : false,
            top5 : [1, 2, 3, 4, 5],
        }
    },
    mutations:{
        addTop5(state, newUpdate){
            if (state.top5.length < 5){
                state.top5.unshift(newUpdate.value)
            } else {
                state.top5.pop()
                state.top5.unshift(newUpdate.value)
            }
            
        },
        removeElement(state, element){
            state.top5.pop(element.value)
        },
        uploadTop5(state, uploadedArray){
            const stringUploaded = uploadedArray.value.split(',')
            var numberArray = []
            var a = 1
            stringUploaded.forEach((data)=>{
                a = Number(data)
                numberArray.push(a)
            })
            state.top5 = numberArray
        },
    },
    actions:{
        async addTop5(context, value){
            await context.commit('addTop5', {value:value})
        },
        async removeElement(context, index){
            await context.commit('removeElement', {value:index})
        },
        async uploadTop5(context, storedTop5){
            // await context.commit('uploadedArray', {value: storedTop5})
            await context.commit('uploadTop5', {'value': storedTop5})
        },
    },
    getters:{
        getTop5(state){
            return state.top5
        }
    }
})

export default store