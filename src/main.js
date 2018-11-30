// Npm imports
import Vue from 'vue'
import App from './App.vue'
import router from './routes'

// File imports
import Button from './components/UI/Button.vue';

Vue.component('app-button', Button);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
