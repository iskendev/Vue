import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueCompositionApi from '@vue/composition-api'
// import  from ''
const draggable = require('vuedraggable');

Vue.use(VueCompositionApi);
Vue.use(draggable);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')