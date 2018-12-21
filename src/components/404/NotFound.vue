<template>
    <div class="container not_found_container">
        <h3>Sorry the page could not be found.</h3>
        <p>Go 
            <router-link to="/">Home</router-link> 
        </p>
    </div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
    a, a:visited{
        color: slategrey!important;
    }
</style>
