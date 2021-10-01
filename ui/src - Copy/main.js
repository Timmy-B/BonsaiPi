import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'
import vuetify from './plugins/vuetify';
import store from './store.js'
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
