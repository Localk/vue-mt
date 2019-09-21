import vuex from "vuex"
import vue from "vue"
vue.use(vuex)
let state = {
    u_num:2,
    u_list:[
        {uid:1,uname:'root',upwd:'123456'},
        {uid:2,uname:"test1",upwd:'123456'},
    ]
}

const store = new vuex.Store({
    // store 初始化对象
    state,
    // mutations，用来修改  state 
    mutations:{
        f1(state){
            console.log('检查内存调用 - mutations - state:'+state.u_num);
        },
        addTest(state){
            console.log('mutations 触发');
            state.u_num ++ ;
        },
    },
    actions:{
        f1(context){
            context.commit('addTest');
        },
        addTest(c){
            console.log('actions 触发');
            c.commit('addTest');
        }
    }
})

console.log(' --- 检测本地存储 --- ');
store.commit('f1');

export default store;
 