// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import  { AlertPlugin } from 'vux';
import AppConfig from './configers/appconfig';
import axios from 'axios';

Vue.prototype.$http = axios
Vue.use(new AppConfig())
Vue.use(AlertPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})


