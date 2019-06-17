<template>
  <div class='about-page-view'>
        <ul class="download-list">
            <li class="item">
                <span class="cols">Day</span>
                <span class="cols">Downloads</span>
            </li>
            <li v-for="pkg in downloads" class="item">
                <span class="cols">{{pkg.day}}</span>
                <span class="cols">{{pkg.downloads}}</span>
            </li>
        </ul>
  </div>
</template>
<script>

import { mapState } from 'vuex';

export default {
    asyncData: function({store}) {
        return store.dispatch('fetchNpmDownloads');
    },

    computed: {
        ...mapState({
            downloads: state => state.downloads
        })
    }
}
</script>
<style>
.download-list {
    margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
}
.item {
    border-bottom: 1px solid #e0e0e0;
    line-height: 36px;
    font-size: 0;
}
.cols {
    font-size: 15px; 
    display: inline-block;
    vertical-align: middle;
    width: 50%; 
}
</style>