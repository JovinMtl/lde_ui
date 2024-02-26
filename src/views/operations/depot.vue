<template>
    <me-nu title="Depot avec " backButton="true">
        <template v-slot:depot>
            <div class="centered">
                Here is our Form of Depot
                <!-- <ion-list>
                    <ion-item>
                        <ion-input label="Stacked label" 
                            label-placement="stacked" 
                            placeholder="Enter text"></ion-input>
                     </ion-item>
                </ion-list>
                 -->
            </div>
            <ion-list>
                    <ion-item>
                        <ion-input label="Stacked label" 
                            label-placement="stacked" 
                            placeholder="Enter text"></ion-input>
                        <br>
                        <ion-select>
                            <ion-select-option value="Jov">Jove</ion-select-option>
                            <ion-select-option value="Mtl">Mute</ion-select-option>
                        </ion-select>
                        
                     </ion-item>
                     <ion-item>
                        <ion-select value="CHoose">
                            <ion-select-option value="Jov">Jove</ion-select-option>
                            <ion-select-option value="Mtl">Mute</ion-select-option>
                        </ion-select>
                     </ion-item>
                     <ion-item>
                        <ion-select label="Floating label" label-placement="floating">
                            <ion-select-option value="apple">Apple</ion-select-option>
                            <ion-select-option value="banana">Banana</ion-select-option>
                            <ion-select-option value="orange">Orange</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select placeholder="Select a Fruit">
                            <div slot="label">Favorite Fruit <ion-text color="danger">(Required)</ion-text></div>
                            <ion-select-option value="apple">Apple</ion-select-option>
                            <ion-select-option value="banana">Banana</ion-select-option>
                            <ion-select-option value="orange">Orange</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select aria-label="Favorite Fruit" value="apple">
                            <ion-select-option value="apple">Apple</ion-select-option>
                            <ion-select-option value="banana">Banana</ion-select-option>
                            <ion-select-option value="orange">Orange</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select aria-label="Fruit" placeholder="Select all fruits that apply" :multiple="true">
                            <ion-select-option value="apples">Apples</ion-select-option>
                            <ion-select-option value="oranges">Oranges</ion-select-option>
                            <ion-select-option value="bananas">Bananas</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select aria-label="Fruit" interface="action-sheet" placeholder="Select fruit">
                            <ion-select-option value="apples">Apples</ion-select-option>
                            <ion-select-option value="oranges">Oranges</ion-select-option>
                            <ion-select-option value="bananas">Bananas</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-select aria-label="Fruit" interface="popover" placeholder="Select fruit">
                            <ion-select-option value="apples">Apples</ion-select-option>
                            <ion-select-option value="oranges">Oranges</ion-select-option>
                            <ion-select-option value="bananas">Bananas</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <br>Want something new <br>
                    <ion-item>
                        <ion-select
                            aria-label="Fruit"
                            placeholder="Select fruit"
                            @ionChange="handleChange($event)"
                            @ionCancel="handleCancel()"
                            @ionDismiss="handleDismiss()"
                        >
                            <ion-select-option value="apples">Apples</ion-select-option>
                            <ion-select-option value="oranges">Oranges</ion-select-option>
                            <ion-select-option value="bananas">Bananas</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <!-- justify = start, end, space-between -->
                        <ion-select justify="space-between" label="Space Between" placeholder="Favorite fruit">
                            <ion-select-option value="apple">Apple</ion-select-option>
                            <ion-select-option value="banana">Banana</ion-select-option>
                            <ion-select-option value="orange">Orange</ion-select-option>
                        </ion-select>
                    </ion-item>
                </ion-list>
            <!-- <form action="">
                <label for=""></label>
                <input/>
            </form> -->

            
        </template>
    </me-nu>
</template>

<script>
import { 
    IonItem, IonInput, IonList,
    IonSelect, IonSelectOption,
} from '@ionic/vue'
import Menu from '../menu.vue'
export default {
    components : {
        'me-nu' : Menu,
        IonItem, IonInput, IonList,
        IonSelect, IonSelectOption,
    },
    methods: {
      handleChange(ev) {
        console.log('ionChange fired with value: ' + ev.detail.value);
      },
      handleCancel() {
        console.log('ionCancel fired');
      },
      handleDismiss() {
        console.log('ionDismiss fired');
      },
    },
}
</script>