<template>
    <div style="height: 100%;">
        <router-view/>

        <van-tabbar route>
            <van-tabbar-item replace to="/" icon="home-o">
                主页
            </van-tabbar-item>
            <van-tabbar-item replace to="/question" icon="comment-o">
                问答
            </van-tabbar-item>
            <van-tabbar-item replace to="/video" icon="tv-o">
                视频
            </van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="user-o">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
  export default {
    name: 'index',
  }
</script>

<style scoped lang="less">

</style>
