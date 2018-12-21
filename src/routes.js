
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/Index.vue';
import Signin from './components/Signin/Index.vue';
import Dashboard from './components/Dashboard/Index.vue';
import MainDashboard from './components/Dashboard/Main.vue';
import AddPosts from './components/Dashboard/AddPosts.vue';
import ListPosts from './components/Dashboard/ListPosts.vue';
import Post from './components/Post/Post.vue'
import NotFound from './components/404/NotFound.vue'

import store from './Store/store'

Vue.use(VueRouter);

const routeGuard = {
    beforeEnter (to, from, next) {
        const sendHome = () =>{
            if(store.getters['admin/isAuth']){
                if(to.path === '/signin'){
                    next('/dashboard')
                }else{
                    next();
                }
                
            }else{
                if(to.path === '/sigin'){
                    next();
                }else{
                    next('/');
                }
            }
        }
        
        //We use a store watcher to trigger the func below
        if(store.state.admin.refreshLoading){
            //Async Wait
            store.watch( (state, getters)=> getters['admin/refreshLoading'], ()=>{ sendHome(); })
        }else{  
            sendHome();
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
        ...routeGuard,
        children:[
            {
                path: '/',
                name: 'main',
                component: MainDashboard,
            },
            {
                path: 'add_posts',
                name: 'add_post',
                component: AddPosts,
            },
            {
                path: 'list_posts',
                name: 'list_post',
                component: ListPosts,
            },
            
        ]
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    },
]

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior( ){
        return {x:0, y: 0}
    }
})

