/* eslint-disable*/
import Vue from 'vue';

const fbSignIn = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword"
const apiKey = "AIzaSyD3oyv57haLP7O0ev5F0WSEteBHHr6WYo4";


const admin = {
    namespaced: true,
    
    state: {
        email: null,
        token: null,
        refresh: null,
        authFailed: false
    },
    
    getters: {

    },
    
    mutations: {
        signIn(state, payload){
            state.email = payload.email
            state.token = payload.idToken
            state.refresh = payload.refreshToken
        },
        authFailed(state, payload){ 
            if(payload === 'reset'){
                state.authFailed = false;
            }else{
                state.authFailed = true;
            }
            
        }
    },

    actions: {
        signIn({commit}, payload){
            Vue.http.post(`${fbSignIn}?key=${apiKey}`, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
            .then(res => res.json())
            .then(authData => {
                
                commit('signIn', {...authData, type: 'signIn'});
                localStorage.setItem('token', authData.idToken)
                localStorage.setItem('refreshToken', authData.refreshToken)
                //router.push('/');
            })
            .catch(err=> {
                commit('authFailed')
            });
               
        }
        
    }
}

export default admin;