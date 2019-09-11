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









