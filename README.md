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









