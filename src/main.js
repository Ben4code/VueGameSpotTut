// Npm imports
import Vue from 'vue'
import App from './App.vue'
import router from './routes'

// File imports
import Button from './components/UI/Button.vue';

//Import Vue material.
import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

// Material Design Used
Vue.use(MdCard)


Vue.component('app-button', Button);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
