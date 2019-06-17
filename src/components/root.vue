<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    }
}
</script>
<style>
html, body, ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>