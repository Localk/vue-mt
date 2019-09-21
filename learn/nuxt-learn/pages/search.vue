<template>
    <div class="page">
        <h3>page is search</h3>
        <ul>
            <li v-for="(item,index) of list" :key="index">{{item}}</li>
        </ul>
    </div>
</template>
<script>
import axios from "axios"
export default {
    layout:"search",
    data(){
        return {
            list:[]
        }
    },
    /*
    async created(){
        // 在服务器端渲染，不生效,所以不能再ssr 中使用
        let listData = await axios.get('/city/list');
        this.list = listData.data;
    },*/
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        let listData = await axios.get('http://localhost:3000/city/list');
        return {
            list:listData.data
        }
    },
}
</script>