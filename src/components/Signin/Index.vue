<template>
    <div class="container">
        <div class="signin_container">
            <h1>Sign In</h1>
            <form @submit.prevent="onSubmit">
                <div class="input_field">
                    <label for="email">email</label>
                    <input type="email" name="email" v-model="formData.email">
                </div>
                <div class="input_field">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="formData.password">
                </div>
                <button type="submit">
                    Sign In
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData: {
                email :'',
                password: ''
            }
        }
    },
    methods :{
        onSubmit(){
            this.$store.dispatch('admin/signIn', this.formData);
        }
    }
}
</script>

<style>

</style>
