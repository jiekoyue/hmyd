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

        <van-tabs color="#3194ff"
                  title-active-color="#3194ff"
                  animated
                  @click="channelClick"
                  v-if="channels">
            <van-tab v-for="item in channels" :title="item.name" :name="item.id">
                <van-pull-refresh
                        v-model="isLoading"
                        success-text="刷新成功"
                        @refresh="onRefresh"
                        class="content"
                >
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                    >
                        <van-cell v-for="(item,index) in list" :key="index">
                            <template slot="title">
                                {{item.title}}<br>
                                <van-image
                                        width="33%"
                                        fit="cover"
                                        v-for="(imgUrl,imgI) in item.cover.images" :key="imgI"
                                        :src="imgUrl"
                                />
                            </template>
                            <template slot="label">
                                <span>{{item.aut_name}}</span>
                                <span class="pl">{{item.comm_count}}评论</span>
                                <span class="pl">{{item.pubdate | converTime}}</span>
                                <van-icon name="cross" @click="iconClick" class="crossicon"/>
                            </template>
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        <van-popup v-model="crossShow" class="crospopup">
            <van-cell title="不感兴趣" icon="failure"/>
            <van-cell title="反馈垃圾内容" icon="warning-o" is-link/>
            <van-cell title="拉黑作者" icon="delete"/>
        </van-popup>
        <channel ref="chan"/>

    </div>
</template>

<script>
  import { articles, userart } from '@/api/home.js'
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
        list: [],
        loading: false,
        finished: false,
        channelId: 0,
        isXiala: false,
        crossShow: false
      }
    },
    methods: {
      //下拉刷新事件
      onRefresh () {
        window.console.log(1)
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      },
      //到底部事件
      onLoad () {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        this.pdlb()

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      },
      //获取频道列表
      pdlb () {
        articles({
          channel_id: this.channelId,
          with_top: 1,
          timestamp: Date.parse(new Date())
        }).then(msg => {
          window.console.log(msg.data.results)
          if (this.isXiala) {
            this.list.push(...msg.data.results)
          } else {
            this.list = msg.data.results
          }
          this.isXiala = true
        })
      },
      //频道点击事件
      channelClick (name) {
        this.channelId = name
        this.isXiala = false
        this.list = ''
        this.pdlb()
      },
      //图标点击事件
      iconClick () {
        this.crossShow = true
      }
    },
    created () {
      userart().then(msg => {
        this.channels = msg.data.channels
      })
    }
  }
</script>

<style scoped lang="less">
    .topcl {
        background: #3194ff;
        position: fixed;
        z-index: 10;
        width: 100%;
        top: 0;

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

    .pl {
        display: inline-block;
        margin-left: .5rem;
    }

    .crossicon {
        border: 1px solid #ccc;
        float: right;
    }

    .crospopup {
        width: 85%;
        border-radius: .3rem;

    }
</style>
<style>
    .van-pull-refresh__track {
        height: 100%;
    }

    .van-tabs__wrap.van-hairline--top-bottom {
        position: fixed;
        z-index: 10;
        width: 100%;
        top: 3.4rem;
    }

    .van-tabs__content.van-tabs__content--animated {
        margin-top: 6rem;
        margin-bottom: 3rem;
    }
</style>

