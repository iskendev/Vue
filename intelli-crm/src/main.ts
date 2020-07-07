import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueCompositionApi from '@vue/composition-api'
const draggable = require('vuedraggable')
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(VueCompositionApi);
Vue.use(draggable);

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDlA9b74zfSo4fGdxvzgCnoaUW6ONgNvkU",
  authDomain: "intelli-crm.firebaseapp.com",
  databaseURL: "https://intelli-crm.firebaseio.com",
  projectId: "intelli-crm",
  storageBucket: "intelli-crm.appspot.com",
  messagingSenderId: "365087687669",
  appId: "1:365087687669:web:28448c68adbf2cfda896bc",
  measurementId: "G-P1ZGLPCFCB"
}

firebase.initializeApp(firebaseConfig)

let app: any;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})