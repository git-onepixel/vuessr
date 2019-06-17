<template>
  <div class="home-page-view">
    <div class="title">This is home view</div>
    <button @click="goAbout">Fetch Data</button>
  </div>
</template>

<script>
export default {
    created() {
        console.log('home view created.');
    },
    
    methods: {
        goAbout() {
            this.$router.push({
                path: '/about'
            });
        }
    },
}
</script>

<style scoped>
.home-page-view {
    padding: 15px;
}
.title {
    line-height: 40px;
    font-size: 16px;
}
</style>