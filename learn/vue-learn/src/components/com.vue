<template>
  <div class="com">
    <h3>components - name : {{name}} , {{age}}</h3>
    <input type="button" @click="$emit('patch',ages)" value="发送到父组件">
    <slot></slot>
  </div>
</template>
<script>
export default {
    data(){
        return {
            name:'com',
            ages:30
        }
    },
    props:['age']
};
</script>
<style scoped>
</style>
