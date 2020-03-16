<template>
    <div>
        <!--        头部-->
        <van-nav-bar title="搜索结果" @click-left="$router.back()" left-arrow/>

        <!--        数据列表-->
        <van-list
                v-model="loading"
                :finished="finished"
                class="my-list"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell class="my-cell" @click="cellClick(listItem)" v-for="(listItem,idx) in seaInfo" :key="idx">
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
                    <van-row>
                        <van-col span="8">
                            <van-icon name="comment-o"/>
                            <span>评论</span>
                        </van-col>
                        <van-col span="8">
                            <van-icon name="like-o"/>
                            <span>评论</span>
                        </van-col>
                        <van-col span="8">
                            <van-icon name="share"/>
                            <span>评论</span>
                        </van-col>
                    </van-row>
                </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
  import { searchInfo } from '@/api/search.js'

  export default {
    name: 'searchcontent',
    data () {
      return {
        page: 1,
        seaInfo: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      //到底部事件
      async onLoad () {
        // 异步更新数据
        this.page++
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        await this.seaLb()
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        // if (this.len === 0) {
        this.finished = true
        // }
      },
      //获取数据事件
      seaLb () {
        searchInfo({
          page: this.page,
          q: this.$route.params.word
        }).then(msg => {
          this.seaInfo = msg.data.results
        })
      },
      //文章点击事件
      cellClick (item) {
        this.$router.push(`/detail?art_id=${item.art_id}&click=${item.trace.click}`)
      },
    },
    created () {
      this.seaLb()
    }
  }
</script>

<style scoped lang="less">
    .van-nav-bar.van-hairline--bottom {
        background: #3e9df8;

        .van-nav-bar__title.van-ellipsis {
            color: #fff;
        }

        .van-icon.van-icon-arrow-left.van-nav-bar__arrow {
            color: #fff;
        }
    }

    .my-list {
        /deep/ .my-cell {
            margin-bottom: 10px;
            padding-bottom: 0;

            .titletop {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
            }

            .pl {
                display: inline-block;
                margin-left: .5rem;
            }

            .van-col.van-col--8 {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 45px;
                font-size: 14px;
                border-top: .5px solid #ececec;;

                &:not(:first-child) {
                    border-left: .5px solid #ececec;;
                }

                .van-icon {
                    font-size: 18px;
                }

                span {
                    margin-left: 5px;
                }
            }
        }
    }

</style>
