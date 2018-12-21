<template>
    <div class="contaner">
        <md-table md-card>
            <md-table-row>
                <md-table-head>Title</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Rating</md-table-head>
                <md-table-head>Image</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>

            <md-table-row v-for="post in posts" :key="post.id">
                <md-table-cell>{{post.title}}</md-table-cell>
                <md-table-cell>{{post.desc}}</md-table-cell>
                <md-table-cell>{{post.rating}}</md-table-cell>
                <md-table-cell>
                    <img :src="post.img" width="50">
                </md-table-cell>
                <md-table-cell>
                    <div class="post_delete" @click="deleteHandler(post.id)">
                        Delete
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <br>
    
        <md-dialog-confirm
            class="md-primary md-raised"
            :md-active.sync="confirmDelete"
            md-title="Confirm delete"
            md-content="Are you sure you want to delete this post?"
            md-confirm-text="Yes, Delete"
            md-cancel-text="No, Go back!"
            @md-cancel="onCancel"
            @md-confirm="onConfirm" 
        />

    </div>
</template>

<script>
export default {
    data(){
        return {
            confirmDelete: false,
            toBeDeleted: ''
        }
    },
    created(){
        this.$store.dispatch('admin/getAdminPosts');
    },
    computed: {
        posts(){
            return this.$store.getters['admin/getAdminPosts']
        }
    },
    methods: {
        deleteHandler(id){
            this.toBeDeleted = id;
            this.confirmDelete = true;
        },
        onConfirm(){
            this.$store.dispatch('admin/deletePost', this.toBeDeleted)
            this.confirmDelete = false;
        },
        onCancel(){
            this.toBeDeleted = '';
            this.confirmDelete = false;
        }
    }
}
</script>

<style>

</style>
