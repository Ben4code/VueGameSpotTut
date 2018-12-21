// Npm imports
import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueResource from 'vue-resource';
import store from './Store/store';
import Vuelidate from 'vuelidate'
import wysiwyg from 'vue-wysiwyg';


//VueWYSIWYG Middleware
Vue.use(wysiwyg);

//vuelidate Middleware
Vue.use(Vuelidate);

// File imports
import Button from './components/UI/Button.vue';

//Import Vue material.
import { MdCard, MdButton, MdDialog, MdContent, MdTable, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css' // This line here


// Material Design Used
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(MdTable);
Vue.use(MdDialogConfirm);

// Custom Component
Vue.component('app-button', Button);

// Vue Resource
Vue.use(VueResource)
Vue.http.options.root = "https://gamespot-4963a.firebaseio.com/"


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
