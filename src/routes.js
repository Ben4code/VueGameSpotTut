import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/Index.vue';
import Signin from './components/Signin/Index.vue';

Vue.use(VueRouter);

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
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior( ){
        return {x:0, y: 0}
    }
})

