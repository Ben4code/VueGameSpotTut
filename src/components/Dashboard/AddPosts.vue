<template>
    <div class="dashboard_form">
        <h1>Add Posts</h1>
        <form @submit.prevent="submitHandler">
            <div class="input_field" >
                <label >Title</label>
                <input 
                    :class="{invalid: $v.formData.title.$error}"
                    type="text" v-model="formData.title" @blur="$v.formData.title.$touch()">
                <p class="error_label" v-if="$v.formData.title.$error">Title field is required.</p>
            </div>

            <div class="input_field" :class="{invalid: $v.formData.desc.$error}">
                <label>Description</label>
                <input type="text" v-model="formData.desc" @blur="$v.formData.desc.$touch()">
                <p class="error_label" v-if="$v.formData.desc.$error">Description field is required.</p>
                <p class="error_label" v-if="!$v.formData.desc.maxLength">Description field max length is 100 characters.</p>
            </div>

            <div class="input_field">
                <wysiwyg v-model="formData.content"></wysiwyg>
            </div>

            <div class="input_field" :class="{invalid: $v.formData.rating.$error}">
                <label>Rating</label>
                <select v-model="formData.rating" @blur="$v.formData.rating.$touch()">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <p class="error_label" v-if="$v.formData.rating.$error">You need to select a rating.</p>
            </div>
            <div v-if="addPostStatus" class="post_succesfull">
                Post was added successfully.
            </div>
            <md-button class="md-raised  md-accent" type="submit">Add Post</md-button>
        </form>

        <md-dialog :md-active="dialog">
            <p>Your post has no content. Are you sure you wish to continue?</p>
            <md-dialog-actions>
                <md-button class="md-raised md-accent" @click="cancelDialog">Oops, was a mistake.</md-button>
                <md-button class="md-raised md-primary" @click="okDialog">Yes, continue</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
/* eslint-disable*/

import { required, maxLength } from 'vuelidate/lib/validators';


export default {
    data(){
        return{
            dialog: false,
            formData: {
                title: '',
                desc: '',
                content: '',
                rating: ''
            }
        }
    },
   computed: {
       addPostStatus(){
           let status  = this.$store.getters['admin/addPost'];
           if(status){
               this.clearPost();
           }
           return status
       }
   },
    validations: {
        formData: {
            title:{
                required
            },
            desc:{
                required,
                maxLength: maxLength(100)
            },
            
            rating:{
                required
            }
        }
    },
    methods:{
        submitHandler(){
            if(!this.$v.$invalid){
                if(this.formData.content === ''){
                    //No errors but content is empty
                    this.dialog = true;
                }else{
                    //No errors, has content. 
                    this.addPost();
                }
            }else{
                //Has errors.
                console.log("Something went wrong.")
            }   
        },
        cancelDialog(){
            this.dialog = false;
        },
        okDialog(){
            this.dialog = false;
            this.addPost();
        },
        addPost(){
            this.$store.dispatch('admin/addPost', this.formData);
        },
        clearPost(){
            //reset Vuelidate
            this.$v.$reset();

            //Clear form data
            this.formData = {
                title: '',
                desc: '',
                content: '',
                rating: ''
            }
        }
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

    .dashboard_form .input_field input.invalid{
        border: 1px solid red;
    }
    .alert{
        text-align: center;
        padding: 10px;
        background-color: darkred;
        color: #fff;
    }
</style>
