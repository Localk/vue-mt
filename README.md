# 00-vue-mt
## 环境搭建
使用的是Vue 2.5 ，脚手架使用的是 vue-cli 3.
```
npm install -g @vue/cli
```
安装vue环境，后续基于node开发
```
npm install vue
```
安装完后，使用脚手架创建vue项目
```
vue create 项目名称
```
创建完项目后，进入项目，并运行
```
cd 项目名
npm run serve

```

## ES6语法

在es6中，提供了模块的概念，支持使用 `import ` 关键字，来导入一个模块。一个模块就是一个js文件，该js文件，需要使用 `export` 来导出模块

## 事件参考

[https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%9C%80%E5%B8%B8%E8%A7%81%E7%9A%84%E7%B1%BB%E5%88%AB](https://developer.mozilla.org/zh-CN/docs/Web/Events#最常见的类别)

# 一、vue回顾

## （一）模板语法
* 文本： 标签中使用`{{ }}` 来包裹变量
* 原始HTML： 在标签中，使用 `v-html` 指令
* html属性：使用指令`v-bind` 来绑定HTML的一个属性，属性的值，是组件中的变量
## （二） 指令
* `v-on` : 监听HTML标签的事件。vue内置的事件类型
```JavaScript
<button v-on:click="function_name"></button>
```
* `v-for` : 基于源数据，多次渲染一个标签，或者组件
## （三）组件
### 1. props ：父组件向子组件传递数据
在子组件中，声明 `props` 属性，属性为一个数组，数组中，存储着接受的变量名。这样，在父组件使用子组件时，可以通过绑定同名属性（和props中存储的元素名同名）的方式，来将数据，传递进子组件的`props` 中，然后子组件就可以将props 中的元素，当做变量在模板中使用。
```javascript
// 子组件的声明
<template>
  <div class="com">
    <h3>components - name : {{name}} , {{age}}</h3>
  </div>
</template>
<script>
export default {
    data(){
        return {
            name:'com'
        }
    },
    props:['age']
};
</script>

// 在父组件中使用
<template>
  <div id="app">
    <com :age="age"></com>
  </div>
</template>
```
### 2. 子组件通过自定义事件，向父组件传递数据
1、父组件，在引用子组件时，监听一个自定义的组件：
```html
<div id="app" @自定义事件名="事件处理函数"></div>
<!--
    使用 @ 监听一个自定义的事件名，
    该事件，绑定一个事件处理函数，事件处理函数在父组件的 methods 中声明
-->
methods:{
    事件处理函数（参数1，参数2）{ ... }
}
```
2、子组件，在定义时，选择触发自定义事件的时机
```html
<div class="com">
    <h3>components - name : {{name}} , {{age}}</h3>
    <button @click="$emit('事件名'，'参数1'，...)">触发自定义的事件，向父组件传递信息</button>
</div>
<!--
    1. @click ，是触发的时机
    2. $emit('事件名'，'参数1'，...) ，触发某个事件。
-->
```
### 3. slot

## （四）路由

### 1、安装路由模块

> 官方文档 ： https://router.vuejs.org/zh/

```javascript
npm install vue-router
```

### 2、创建路由器

由于不清楚后续需要配置的路径数量多少，所以使用一个单独的文件，来配置路由对象：

router.js

```javascript
// 先导入路由模块
import vue_router from 'vue-router';
// 在导入需要配置的组件
import xx from './views/xx.vue'
// 实例化路由对象
let routerObj = new vue_router({
    routes:[ // 对象实例化参数，routes，代表路由列表
        {path:'路径',component:vue组件对象} // component对应的是vue组件对象，而不是组件名
    ]
})
// 一定要把 router obj 对象导出
export default routerObj ;
```

### 3、挂在路由对象，到全局的vue 对象

如果是在HTML中，直接使用了 src来引入的 路由模块，会自动挂在到全局的vue全局对象。但是在脚手架开发模式中，需要手动将路由对象挂在在Vue上，这杨就能使用 `router-view` 组件来起到路由替换的作用了。

在 main.js 文件中

```javascript
// 先给Vue 添加全局功能，路由功能，使用Vue.use，挂载路由组件
import vue_router from 'vue-router'
Vue.use(vue_router)
// 在给全局的 Vue 对象的初始化参数中，添加路由对象
import routerObj from 'router.js'
new Vue({
    router:routerObj;
})
```

## （五）Vue 构造函数在脚手架中的使用

### 1、render

render函数，是渲染函数，调用时，传入一个 createElement 函数。用来创建模板。如果是全局的那个Vue 对象，就是用来绑定根元素的。效果和 Vue 对象的`el` 参数一样。在脚手架里，一般是用来创建一个组件。

*render的作用，看起来是根据组件，产生一个模板，然后去替代页面中，id=app的元素。如果页面中没有id=app的元素，就不能替代。这个时候就算是 render 函数失败，自动走兜底逻辑，也就是去寻找 $mount 绑定的*



### 2、$mount('el')

手动绑定根元素。如果Vue 对象创建时没绑定到根元素上，可以再使用 $mount 函数，来绑定根元素

### 3、脚手架用法

```javascript
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

// 如果构造的参数里，有 render
//    则优先绑定vue 对象到 render 创建的根元素里

// 如果构造函数的参数里，没有 render，或者 render 没有绑定到一个 id =app 的元素上
//    则绑定到 $mount 函数指向的根元素 上。
```

## （六）Vuex

> vuex ，是vue中使用的状态共享模块。

### 1、state

为了实现所有的组件，都能访问到公共的状态属性，除了直接访问全局变量的方式，还能通过给 根组件，注入Vuex的方法，为Vue添加全局组件 vuex，然后在root 的vue 对象中，注入 vuex实例：

```javascript
// 构造 store 对象
import vuex from "vuex"
const store = new vuex.Store({
    // store 初始化对象
})

// 注入到 vue 根对象中
import store from "./store"
new Vue({
  render: h => h(App),
  router,
  store, // vue 对象的 store 属性，存储 共享状态的 store 对象
}).$mount('#app2')
```

在父组件上 注入 store 属性后，该父组件下的所有子组件，都能实现 store 的共享：

```javascript
// 在子组件中，访问共享的状态库
this.$store .....
```

### 2、mutation

修改 vuex 中状态的值，只能通过 mutation。且只能同步修改

```javascript
const store = new vuex.Store({
    // store 初始化对象
    store,
    /*
    mutations，用来修改  state
    里面定义 方法，每个方法触发时，会传入要修改的对象，还可以添加额外的事件参数
    */
    mutations:{
        f1(state,参数1，参数2){
            // f1 定义对数据的某种操作
            // 传入的第一个参数，是要修改和读取信息的对象
            // 还可以传入其他的参数
            // 函数内容，只能是同步函数
        }
    }
})
```

在 store 中定义的mutations，能修改其自身的 state，但是mutations 的方法，不能直接调用。使用的方式类似于事件调用，只能使用 Store 对象提供的`commit` 方法

```javascript
// 支持的方法：
Store.commit('触发的mutations方法名',传入的额外参数)

// 在组件中，使用提交，来修改store中的状态
this.$store.commit('触发的mutations方法名',传入的额外参数)
```

### 3、actions

actions 的作用

* 用来触发 mutations，而不是直接操作 state
* 可以使用异步操作

定义 actions：

```javascript
import vuex from "vuex"
const state = {
    u_num:2,
    u_list:[
        {uid:1,uname:'root',upwd:'123456'},
        {uid:2,uname:"test1",upwd:'123456'},
    ]
}
const store = new vuex.Store({
    // store 初始化对象
    store,
    // mutations，用来修改  state 
    mutations:{
        f1(state){
            console.log('mutations - state:'+state.u_num);
        }
    },
    /*
    	actions 属性定义的操作，是用来触发 mutations 的，不能操作 state
    	actions 中，函数传入的第一个参数，是一个和 vuex.store 相同的对象，所以能直接使用 store 的属性和方法。
    */
    actions:{
        f1(context){
            // context 是和 vuex.store 相同的对象
            context.commit('f1')
        }
    }
})
```

在组件中，如果需要触发 actions，使用 `store.dispatch`来触发。

```javascript
this.$store.dispath('f1')
/*
	dispatch 先触发 actions 中的函数
	actions 中的函数，又触发了mutaions
*/
```

如果在组建中，使用`dispatch` 触发比较麻烦，还可以 将 store 中定义的actions 打散到组件的 methods 属性中，然后通过组件自身调用方法，将方法映射为 store 的actions 函数，该方法使用的是 `mapActions` 函数，函数返回的是一个对象，直接使用`...` 来打散展开

```javascript
// templates :

export default {
    methods:{
        f1(){}, // 组件中原来的自有函数
        ...mapActions(['actions 中的函数名'])
        // 打散之后，在组件中，可以直接调用
        // this.f1() ==> this.$store.dispatch('f1')
        // 前提是methods 中自定义函数，和 actions 中的函数不冲突
    }
}

```

# 二、koa2
## （一）项目安装
### 1、安装脚手架
```javascript
npm install -g koa-generator
```
安装脚手架，自动将koa 作为依赖安装。
### 2、创建koa项目
```javascript
koa2 -e project_name
```
`-e` 指的是使用ejs模板引擎。该命令生成一个完整的脚手架文件。
### 3、运行项目
```javascript
cd koa-learn 
npm install
SET DEBUG=koa* 
npm start koa-learn
```
命令运行结束，访问 3000 端口，能成功访问到页面，服务就启动成功了。在调试中，如果想要修改后自动重启服务：
```javascript
npm run dev
```
除了 npm start 命令，其他命令需要使用 npm run 来运行。

## （二）异步

koa中大量使用 async / await 来进行一步调用

## （三）中间件

### 1、创建中间件

中间件，传入两个参数，一个是ctx对象，一个是next对象。ctx对象存储着请求和响应信息，next对象代表下一个中间件。中间件需要导出一个函数，该函数作为app.use 的参数传递：

```
// 中间件.js
module.exports = async function(ctx,next){
	// code 中间件的功能
	// 中间件操作完毕后，需要调用next ，去执行下一个中间件
	await next();
}

//  app.js 主程序中
const midd = require('./导入中间件path');

app.use(midd)
```

**app.use 的参数，需要是一个函数，如果中间件导出的就是函数，则直接当做app.use 的参数。如果中间件导出的是一个返回函数的函数，那么还需要在app.use 中调用一下**












