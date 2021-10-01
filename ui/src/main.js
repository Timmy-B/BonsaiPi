import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import vuetify from './plugins/vuetify';
import { setupComponents } from './config/setup-components';
import moment from "vue-moment";
Vue.use(moment);
Vue.component('apexchart', VueApexCharts)
setupComponents(Vue);
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  data: {
    themeColor: "#1D2939",
  },
  render: (h) => h(App),
}).$mount("#app");
