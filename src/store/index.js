
import { createStore} from 'vuex'

const store = createStore({

    state(){
        return {
            devWidth : 0,
            devHeight: 0,
            hasTop5 : false,
            top5 : [6, 9, 3, 8, 15],
            capturedImage : null,
            numberTaken : 0,
            wantTakePhoto: true,


            username : 'null',
            password : 'bbb',
            user : 'null',
            isStaff: false,
            isLoggedIn : false,
            lastActivity: null,

            wantedRoute : null,
            actualRoute : '',
            actualBordereau : '..'
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
        addcapturedImage(state, capturedImage){
            state.capturedImage = capturedImage.value
        },
        addPhotoNumber(state){
            state.numberTaken++;
        },
        initPhotoNumber(state){
            state.numberTaken = 0;
        },
        setDevHeight(state, devHeight){
            state.devHeight = devHeight.value
        },
        resetActiveUser(state){
            state.user = null
            state.username = null
            state.lastActivity = null
            sessionStorage.setItem('access', null)
            sessionStorage.setItem('refresh', null)
            sessionStorage.setItem('lastActivity', null)
        },
        setLastActivity(state, value){
            state.lastActivity = value
        },
        setWantedRoute(state, value){
            state.wantedRoute = value
        },
        setActualBordereau(state, value){
            state.actualBordereau = value
        },
        setactualRoute(state, value){
            state.actualRoute = value
        },
        setIsStaff(state, value){
            state.isStaff = value
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
        },
        getcapturedImage(state){
            return state.capturedImage
        },
        getNumberTaken(state){
            return state.numberTaken
        },
        getDevHeight(state){
            return state.devHeight
        },
        getUsername(state){
            return state.username
        },
        getLastActivity(state){
            return state.lastActivity
        },
        getWantedRoute(state){
            return state.wantedRoute
        },
        getAccessToken(state){
            return state.user.access
        },
        getActualBordeau(state){
            return state.actualBordereau
        },
        getactualRoute(state){
            return state.actualRoute
        },
        getIsStaff(state){
            return state.isStaff
        }
    }
})

export default store