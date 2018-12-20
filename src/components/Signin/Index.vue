<template>
    <div class="container">
        <div class="signin_container">
            <h1>Sign In</h1>
            <form @submit.prevent="onSubmit">
                
                <p v-if="error" class="alert">You cannot submit an invalid field.</p>
                <p v-if="authFailed" class="alert">Please verify your login details.</p>

                <div class="input_field">
                    <label>Email</label>
                    <input type="email"
                        v-model.trim="formData.email" 
                        @blur="$v.formData.email.$touch()"
                        :class="{invalid: $v.formData.email.$error}" 
                    >
                        
                    <!-- Error Msg checks if properties are being met.-->
                    <div v-if="$v.formData.email.$error">
                        <p class="error_label" v-if="!$v.formData.email.required">This field is required.</p>
                        <p class="error_label" v-if="!$v.formData.email.email">Please enter a valid email.</p>
                    </div>
                </div>


                <div class="input_field">
                    <label for="password">Password</label>
                    <input type="password" name="password" 
                        v-model.trim="formData.password"
                        @blur="$v.formData.password.$touch()"
                        :class="{invalid: $v.formData.password.$error}" 
                    >
                    <!-- Error Msg -->
                     <div v-if="$v.formData.password.$error">
                        <p class="error_label" v-if="!$v.formData.password.required">This field is required.</p>
                        <p class="error_label" v-if="!$v.formData.password.minLength">Password must be at least 4 characters long.</p>
                    </div>
                </div>

                
                <button type="submit">                    
                    Sign In
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import {required, email, minLength} from 'vuelidate/lib/validators';

export default {
    data(){
        return{
            formData: {
                email :null,
                password: null,
            },
            error: false
        }
    },
    computed: {
        authFailed(){
            //Listens for any change in store of 'authFailed'  
            return this.$store.state.admin.authFailed;
        }
    },
    destroyed(){
        //Used to reset state of 'authFailed' in the sotre.
        this.$store.commit('admin/authFailed', "reset");
    },
    validations: {
        formData: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)            
            }
        }
    },

    methods :{
        onSubmit(){
            //Checks '$v.$invalid' for the overall state of vuelidate
            if(this.$v.$invalid){
                this.error = true;    
                setTimeout(()=>{
                    this.error = false;
                }, 3000)
            }else{
                this.$store.dispatch('admin/signIn', this.formData);
            }
            
        }
    }
}
</script>

<style scoped>
   
    input.invalid{
        border: 1px solid red;
    }
    .alert{
        text-align: center;
        padding: 10px;
        background-color: darkred;
        color: #fff;
    }
   
</style>
