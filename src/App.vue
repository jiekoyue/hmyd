<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive==1"></router-view>
        </keep-alive>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive==2"></router-view>
        </keep-alive>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive==3"></router-view>
        </keep-alive>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive==4"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="less">
    #app {
        width: 100%;
        height: 100%;
    }
</style>
