// Npm imports
import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueResource from 'vue-resource';
import store from './Store/store';
import Vuelidate from 'vuelidate'


//vuelidate Middleware
Vue.use(Vuelidate);

// File imports
import Button from './components/UI/Button.vue';

//Import Vue material.
import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

// Material Design Used
Vue.use(MdCard)

// Custom Component
Vue.component('app-button', Button);

// Vue Resource
Vue.use(VueResource)
Vue.http.options.root = ''


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
