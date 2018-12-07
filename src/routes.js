import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/Index.vue';
import Signin from './components/Signin/Index.vue';
import Dashboard from './components/Dashboard/Index.vue';

import store from './Store/store'

Vue.use(VueRouter);

const routeGuard = {
    beforeEnter (to, from, next) {
        if(store.getters['admin/isAuth']){
            next();
        }else{
            next('/');
        }
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        ...routeGuard
    }

]

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior( ){
        return {x:0, y: 0}
    }
})

