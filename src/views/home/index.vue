<template>
    <div style="height: 100%;">
        <router-view/>

        <van-tabbar route>
            <van-tabbar-item replace to="/index/home" icon="home-o">
                主页
            </van-tabbar-item>
            <van-tabbar-item replace to="/index/question" icon="comment-o">
                问答
            </van-tabbar-item>
            <van-tabbar-item replace to="/index/video" icon="tv-o">
                视频
            </van-tabbar-item>
            <van-tabbar-item replace to="/index/user" icon="user-o">
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
    .botfoot {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #707070;
        background: #fff;

        .icon {
            font-size: 18px;
            width: 100%;
            text-align: center;
        }

        p {
            font-size: 12px;
        }
    }
</style>
