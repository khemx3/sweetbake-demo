import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store';
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
import Dialog from 'vue-dialog-loading'
 
Vue.component('ThailandAutoComplete', ThailandAutoComplete)

Vue.use(Dialog, {
  dialogBtnColor: '#0f0',
  background:'rgba(0, 0, 0, 0.5)'
})

Vue.prototype.$liff = window.liff
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  
  render: h => h(App)
}).$mount('#app')
