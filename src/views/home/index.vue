<template>
    <div style="height: 100%;">
        <router-view/>
        <van-tabbar route v-show="isShow">
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
  import bus from '@/utilis/bus.js'

  export default {
    name: 'index',
    data () {
      return {
        isShow: true
      }
    },
    created () {
      bus.$on('isShow', key => {
        this.isShow = key
      })
    }
  }
</script>

<style>
</style>
