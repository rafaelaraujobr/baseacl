import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'
import i18n from './i18n'

import moment from "./plugins/moment";
import axios from "./plugins/axios";
Vue.use(moment);

Vue.config.productionTip = false

new Vue({
  axios,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
