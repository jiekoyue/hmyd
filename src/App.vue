<template>
    <div id="app">
        <keep-alive>
            <router-view v-show="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-show="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="less">
    #app {
        width: 100%;
        height: 100%;
    }
</style>
