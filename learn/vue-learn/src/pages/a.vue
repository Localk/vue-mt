<template>
<div>
    <h3> page a</h3>
    <h5>{{u_num}}</h5>
    <button @click="add">add - a</button>
    <button @click="show">show</button>
</div>
</template>
<script>
export default {
    methods:{
        add(){
            this.$store.dispatch('addTest');
        },
        show(){
            console.log(this.$store.state)
        }
    },
    computed:{
        u_num(){
            return this.$store.state.u_num;
        }
    }
}
</script>
<style scoped>
</style>