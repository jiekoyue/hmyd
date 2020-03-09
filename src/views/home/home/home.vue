<template>
    <div style="height: 100%;">
        <van-row type="flex" justify="space-between" class="topcl">
            <van-col span="3">
                <van-icon @click="$refs.chan.isShow = true" name="wap-nav" class="iconbg"/>
                <!--                <van-button icon="wap-nav" color="#3194ff" />-->
            </van-col>
            <van-col span="19">
                <van-search
                        v-model="keyword"
                        shape="round"
                        background="#3194ff"
                        placeholder="请输入搜索关键词"
                />
            </van-col>
            <van-col span="3">
                <van-icon name="search" class="iconbg"/>
            </van-col>
        </van-row>
        <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh"
                class="content"
        >
            <van-tabs color="#3194ff"
                      title-active-color="#3194ff"
                      animated
                      v-if="channels">
                <van-tab v-for="item in channels" :title="item.name">
                    内容
                </van-tab>
            </van-tabs>
        </van-pull-refresh>
        <channel ref="chan"/>
    </div>
</template>

<script>
  import { userart } from '@/api/home.js'
  import channel from './components/channel'

  export default {
    name: 'home',
    components: {
      channel,
    },
    data () {
      return {
        keyword: '',
        channels: '',
        isLoading: false,
      }
    },
    methods: {
      onRefresh () {
        setTimeout(() => {
          this.isLoading = false
        })
      }
    },
    created () {
      userart().then(msg => {
        window.console.log(msg)
        this.channels = msg.data.channels
      })
    }
  }
</script>

<style scoped lang="less">
    .topcl {
        background: #3194ff;

        .iconbg {
            color: rgb(255, 255, 255);
            font-size: 20px;
        }

    }

    .van-col.van-col--3 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        height: 100%;
        background: #fff;
    }


    .van-tabs .van-tabs--line {
        height: 100%;
    }
</style>
<style>
    .van-pull-refresh__track {
        height: 100%;
    }
</style>

