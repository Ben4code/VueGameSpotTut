/* eslint-disable*/
import Vue from 'vue';
import router from '../../routes'

const fbSignIn = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword"
const apiKey = "AIzaSyD3oyv57haLP7O0ev5F0WSEteBHHr6WYo4";


const admin = {
    //-- When Referencing A Namespaced Property --
    //state.namespace.stateProperty
    //getters['namespace/getter']
    //commit('namespace/migration', payload)
    //dispath('namespace/action', payload)
    
    namespaced: true,
    
    state: {
        email: null,
        token: null,
        refresh: null,
        authFailed: false,
        refreshLoading: true
    },
    
    getters: {
        isAuth(state){
            if(state.token){
                return true;
            }
            return false;
        },
        refreshLoading(state){
            //We will wait till this state property is false before using our route guard.
            return state.refreshLoading
        }
    },
    
    mutations: {
        signIn(state, payload){
            state.email = payload.email
            state.token = payload.idToken
            state.refresh = payload.refreshToken

            if(payload.type === 'signIn'){
                router.push('/dashboard');
            }
            if(payload.type === 'refresh'){
                state.token = payload.id_token
                state.refresh = payload.refresh_token
            }
        },
        authFailed(state, payload){ 
            if(payload === 'reset'){
                state.authFailed = false;
            }else{
                state.authFailed = true;
            }
        },

        logoutUser(state){
            //Logout is a sync process so no need for actions.
            //Wipe all data
            state.email = null;
            state.token = null;
            state.refresh = null;

            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            router.push('/');
        },
        refreshLoading(state){
            state.refreshLoading = false;
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
            })
            .catch(err=> {
                commit('authFailed')
            });   
        },
        autoAuth({commit}, payload){
            Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
                grant_type: "refresh_token",
                refresh_token: payload,
            })
            .then(res => res.json())
            .then(authData => {
                commit('signIn', {...authData, type: 'refresh'});
                localStorage.setItem('token', authData.id_token)
                localStorage.setItem('refreshToken', authData.refresh_token)

                //Set refresh loading to true
                commit('refreshLoading');
            })
            .catch(err=> {
                console.log('Error in sigin in.')
            });   
        }
    }
}

export default admin;