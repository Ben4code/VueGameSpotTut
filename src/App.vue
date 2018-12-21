<template>
  <div id="app">
    <comp-header/>
      <router-view></router-view>
    <comp-footer/>
  </div>
</template>

<script>
import compHeader from './components/Header-Footer/Header';
import compFooter from './components/Header-Footer/Footer';


export default {
  name: 'app',
  components: {
    compHeader,
    compFooter
  },

  created(){
    //Auto auth on page refresh.
    if(localStorage.getItem('refreshToken')){
      const refreshToken = localStorage.getItem('refreshToken');
      this.$store.commit('admin/refreshLoading');
      this.$store.dispatch('admin/autoAuth', refreshToken );
    }else{
      this.$store.commit('admin/refreshLoading');
    }
  }
}
</script>

<style>
  @import './assets/style.css';
  a:visited{
    color: #fff!important;
  }
  a.button_default{
    color: #fff!important;
  }
</style>
