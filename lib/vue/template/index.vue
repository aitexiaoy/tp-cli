<template>
<div id="app" class="main-page">
    <h1>欢迎进入页面</h1>
    <router-view></router-view>
</div>
</template>

<script>

export default {
    name: 'App',
    created() {
    
    },

    mounted() {

    },

    methods: {

    },
    watch: {

    }
}
</script>

<style lang="less" scoped>
.main-page{
    width: 30px;
    background: red;
}
</style>
