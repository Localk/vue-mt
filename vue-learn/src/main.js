import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vue_router from 'vue-router';

Vue.use(vue_router)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app2')
