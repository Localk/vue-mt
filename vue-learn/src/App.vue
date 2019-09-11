<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <com :age="age" @patch="get_from_sub">
      <h3>我要加东西</h3>
    </com>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import com from './components/com'

export default {
  data(){
    return {
      age:18
    }
  },
  name: 'app',
  components: {
    HelloWorld,
    com
  },
  methods:{
    get_from_sub(ages){
      console.log('从子元素，接收到数据');
      this.age = ages;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
