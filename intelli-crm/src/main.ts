import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueCompositionApi from '@vue/composition-api'
const draggable = require('vuedraggable')
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import VueRouter from 'vue-router'
import { dateTime, isoDurationToTime } from './filters/dateTime'
import { cutExtraWords } from './filters/wordsHandler'

Vue.use(VueCompositionApi);
Vue.use(draggable);
Vue.use(VueToast, {
  position: 'top-right',
  duration: 3000
});

Vue.filter('date', dateTime)
Vue.filter('iso-duration', isoDurationToTime)
Vue.filter('cutExtraWords', cutExtraWords)

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