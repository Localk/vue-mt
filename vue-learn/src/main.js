import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vue_router from 'vue-router';
import store from "./store.js"
import vuex from "vuex"

Vue.use(vuex);

Vue.use(vue_router)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app2')
