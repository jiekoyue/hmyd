<template>
    <div style="height: 100%;">
        <van-row type="flex" justify="space-between" class="topcl">
            <van-col span="3">
                <van-icon @click="pdxz" name="wap-nav" class="iconbg"/>
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
        >
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
                        <van-cell @click="cellClick(listItem)" v-for="(listItem,idx) in item.list" :key="idx">
                            <template slot="title">
                                <div class="titletop">{{listItem.title}}
                                    <van-image v-if="listItem.cover.type==1" :src="listItem.cover.images[0]"
                                               width="116px" height="73px" fit="contain"/>

                                </div>

                                <van-grid v-if="listItem.cover.type==3" :border="false" :column-num="3">
                                    <van-grid-item v-for="(imgUrl,imgI) in listItem.cover.images" :key="imgI">
                                        <van-image :src="imgUrl" style="height: 73px"/>
                                    </van-grid-item>

                                </van-grid>
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
        <router-view class="zindex"/>
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
        active: '',
      }
    },
    methods: {
      //文章点击事件
      cellClick (item) {
        this.$router.push(`/detail?art_id=${item.art_id}&click=${item.trace.click}`)
        this.$parent.isShow = false
      },
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

    .zindex {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
    }

    .van-col.van-col--3 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        height: 100%;
        background: #fff;

        .titletop {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
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

