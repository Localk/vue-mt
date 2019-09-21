<template>
    <div>
        <h3>{{$store.state.count}}</h3>
        <button @click="increment">add</button>
        <!-- <button @click="decrement">decrement</button> -->
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    // methods:mapActions([
    //     'increment',
    //     'decrement'
    // ])  
    methods:{
        increment(){
            this.$store.commit('increment');
        }
    }  
}
</script>

<style scoped>
</style>