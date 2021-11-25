import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router/routes';
import i18n from './locales'
import './assets/fonticon/iconfont.css'

const router = new VueRouter({
    routes
})



Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  i18n,
  
  render: h => h(App),
  router
}).$mount('#app')
