<template>
    <div style="height: 100%;">
        <van-row type="flex" justify="space-between" class="topcl">
            <van-col span="3">
                <van-icon @click="pdxz" name="wap-nav" class="iconbg"/>
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
                  v-model="active"
                  title-active-color="#3194ff"
                  animated
                  @click="channelClick">
            <van-tab v-for="(item,index) in channels" :key="index" :title="item.name" :name="item.id">
                <van-pull-refresh
                        v-model="item.isLoading"
                        success-text="刷新成功"
                        @refresh="onRefresh(item)"
                        class="content"
                >
                    <van-list
                            v-model="item.loading"
                            :finished="item.finished"
                            finished-text="没有更多了"
                            @load="onLoad(item)"
                    >
                        <van-cell v-for="(listItem,idx) in item.list" :key="idx">
                            <template slot="title">
                                {{listItem.title}}<br>
                                <van-image
                                        width="33%"
                                        fit="cover"
                                        v-for="(imgUrl,imgI) in listItem.cover.images" :key="imgI"
                                        :src="imgUrl"
                                />
                            </template>
                            <template slot="label">
                                <span>{{listItem.aut_name}}</span>
                                <span class="pl">{{listItem.comm_count}}评论</span>
                                <span class="pl">{{listItem.pubdate | converTime}}</span>
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
        <channel ref="chan" :mylist="channels"/>

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
        channels: [],
        crossShow: false,
        len: '',
        active: ''
      }
    },
    methods: {
      //频道选择
      pdxz () {
        this.$refs.chan.isShow = true
      },
      //下拉刷新事件
      async onRefresh (item) {
        item.preTimestamp = Date.now()
        item.list = []
        await this.pdlb(item, true)
        item.isLoading = false
      },
      //到底部事件
      async onLoad (item) {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        await this.pdlb(item)
        // 加载状态结束
        item.loading = false

        // 数据全部加载完成
        if (this.len === 0) {
          item.finished = true
        }
      },
      //获取频道列表
      async pdlb (item, ispush) {
        try {
          let msg = await articles({
            channel_id: item.id,
            with_top: 0,
            timestamp: item.preTimestamp
          })
          this.len = msg.data.results.length
          if (this.len > 0) {
            item.preTimestamp = msg.data.pre_timestamp
            window.console.log(msg)
            if (ispush) {
              item.list = msg.data.results
            } else {
              item.list.push(...msg.data.results)
            }
          }

        } catch {

        } finally {
        }

      },
      //频道点击事件
      channelClick (item) {
        // window.console.log(item)
        // this.len = 1
        // this.pdlb(item)
      },
      //图标点击事件
      iconClick () {
        this.crossShow = true
      }
    },
    async created () {
      let msg = await userart()
      this.channels = msg.data.channels
      this.channels.forEach(item => {
        this.$set(item, 'isLoading', false)
        this.$set(item, 'list', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'tagShow', true)
        item.preTimestamp = Date.now()
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

