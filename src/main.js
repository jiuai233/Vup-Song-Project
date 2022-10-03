import Vue from 'vue'
import App from './App.vue'
import '@/assets/index.css'
import "./assets/font/font.css"
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import router from '@/Router'
// import axios from "axios";
Vue.config.productionTip = false
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// Vue.config.productionTip = false
Vue.use (ElementUI);
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
