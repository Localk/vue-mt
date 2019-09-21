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

### 2、中间件的执行

在请求进入时，开始执行中间件的逻辑，遇到 next（），将请求调往下一个中间件。在最后一个中间件中，或者是路由中，处理完该请求的所有请求，此时需要将给请求返回一个响应。在返回响应的时候，还会按照倒序再此执行一遍中间件，再此执行时，执行的是中间件 next（） 之后的逻辑：

```javascript
// 中间件.js
module.exports = async function(ctx,next){
	// 请求进入时执行的逻辑
	await next();
    // 响应返回时再执行一遍逻辑
}

//  app.js 主程序中
const midd = require('./导入中间件path');

app.use(midd)
```

### 3、router中间件

使用路由中间件，来处理不同模块的请求。一个路由对象，是`koa-router`的实例。路由对象，可以用来再此设置中间件、处理请求和响应、等。

```javascript
const Router = require("koa-router");

const rout = new Router();

rout.prefix('/user'); // 设置请求前缀，只有以 /user 开头的请求，才会被路由处理
```

| router 方法   | 说明                                                   |
| ------------- | ------------------------------------------------------ |
| router.prefix | 设置请求路径前缀，只有符合该条件的请求，才会被路由处理 |
| get/post/...  | 对应的请求 method 名称                                 |

## （四）cookies 和 session
每一个进入的请求，都可以使用 ctx 对象，来给这个请求设置cookie。不同的请求之间，cookie 是不同的，且不会发生混合的情况。


# 三、MongoDB 和 Redis
## （一）MongoDB
### 1、MongoDB的安装
## （二）Redis

# 四、Nuxt.js
## （一）概述
### 1、概述
用来做 ssr 的框架。基于vue 。支持 vue router 、vuex、vue server renderer、vue-meta。使用vue开发的项目，是打包之后，形成HTML+css+js 的文件，然后由浏览器获取，并且由浏览器解析执行。这样导致的问题是，基于vue的SPA首屏加载时间过长；而且，使用js向页面内注入内容，不利于seo。而ssr 是在服务端合成HTML，然后发送给浏览器。

### 2、创建一个nuxt 项目
```JavaScript
vue init nuxt-community/koa-template 项目名称
// 如果提示缺少@vue/cli-init，在安装一个依赖
// npm install -g @vue/cli-init
```
文件夹创建成功后，进入文件夹，然后安装依赖，运行项目：
```JavaScript
cd 项目名称
npm install 
npm run dev
```
如果运行中报错，参考这个博客:
```
https://www.cnblogs.com/ITtt/p/10515456.html
```
### 3、目录说明
|目录名|说明|
|----|----|
|assets文件|放置静态资源文件|
|backpack.config.js|后端编译脚本，基本不用|
|build文件|所有编译完之后的文件|
|components文件|组件|
|layouts文件|模板|
|nuxt.config.js|nuxt的配置文件|
|pages文件|页面入口|
|server文件夹|koa相关|
|static文件夹|静态文件目录|
|store文件夹|放置vuex 的|

## （二）基础
### 0、nuxt.config.js文件
对整个HTML页面，进行配置。
`head` 配置页面head标签
`css` 配置全局的css
### 1、路由 - pages文件夹
pages文件夹下，创建的文件，都是一个vue文件。类似于vue 中的views 组件，可以作为单页应用的一个页面，用来对地址栏路由进行匹配。
例如，pages 下存在三个.vue 文件：
```
pages/
    index.vue
    about.vue
    profile.vue
```
当请求的地址是`http://127.0.0.1:3000/` 或者`http://127.0.0.1:3000/index`是，显示的页面是index.vue 文件的内容；当请求地址是`http://127.0.0.1:3000/about`时，显示的页面是 about.vue 文件的内容。
所以，pages下的vue文件，自动分配给全局的路由，文件名作为路由的地址名。
pages 文件中，可以使用`<nuxt-link class="button" to="/about">
      About page
    </nuxt-link>`组件，来当做跳转的按钮。类似于 vue 中的`router-link`
### 2、布局 - layouts文件夹
layouts文件夹下的vue文件，是布局中使用的。用来将pages中的vue文件， 和其他的组件，进行合并，一同渲染出来页面。比如pages中有一个现实中间内容的vue文件，在layouts模板文件中，先填充进pages中的文件，在填充一个页眉，或者页脚的其他组件，共同组成一个完整的页面（不准确的说，类似于layouts组件，引用了pages组件）
模板中的 `<nuxt/>` 标签，相当于vue 中的 `router-view` ，是用来被pages中的组件代替的标签。

布局文件夹下，有一个default.vue的文件，默认时，路由文件渲染时，采用的布局模板就是layouts文件夹下的default.vue文件。如果想使用自己定义的layouts布局文件：
```JavaScript
//1. 先在layouts文件夹下，定义一个自定义模板
<template>
    <div>
        <....> // 布局文件个性化内容
        <nuxt /> // 这个是用来替换pages 下的页面内容
    </div>
</template>

// 2. 在 pages 下的文件中，为当前文件，指定布局文件
<script>
export default {
    layout:"search" , // 当前路由文件，渲染时使用 layouts/search.vue 模板
}
</script>
```

## （三）获取异步数据
### 1、asyncData
在组件加载之前调用，用来异步获取数据

## （四）Vuex应用
### 1、使用vuex
如果项目的根目录下，有store文件夹，则nuxt会做如下几件事：
* 引用vuex 模块
* 将 vuex 模块 加到 vendors 构建配置中去
* 设置 Vue 根实例的 store 配置项
在创建的 vuex 实例中，state状态，返回值应该是一个函数


# 五、环境准备
### 1、环境版本号
* node - 8.12
* vue - 2.5.17
* npm - 6.4.1
* webpack - 6.4.1
* nuxt - 2.0.0
### 2、创建项目
```
// nuxt官方提供了创建脚手架工具，npx，npx在npm5以上的版本，默认安装
npm install -g npm
npm create-nuxt-app 工程名称
cd path
npm install
```
### 3、配置babel插件
因为npx创建的项目，不支持es6，对于es6语法不能进行转换，所以需要手动卑职
```
//1. 在启动命令中，配置babel，每次启动时，语法转换
// 在命令末尾加上 --exec babel-node
cross-env NODE_ENV=development nodemon server/index.js --watch server 

// 2. 然后设置babel配置文件
//    在根目录下添加 .babelrc 文件
{
     "presets":["es2015"]
}

// 3. 安装babel插件
npm install babel-preset-es2015
```

### 4、项目中引入sass
```
npm install sass-loader node-sass
```

### 5、辅助工具安装
MongoDB 、 Redis 、 studio 3T

### 6、修改build
在 nuxt.config.js 中，配置css 。














