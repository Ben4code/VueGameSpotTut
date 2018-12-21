<template>
    <div class="contaner post_container">
        List Posts
    </div>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('admin/getAdminPosts');
    }
}
</script>

<style>

</style>
