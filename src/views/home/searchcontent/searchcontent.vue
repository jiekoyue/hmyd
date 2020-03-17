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
            <van-cell class="my-cell" @click.stop="cellClick(listItem)" v-for="(listItem,idx) in seaInfo" :key="idx">
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
                    <div class="my-row">
                        <div class="my-col" @click.stop="goPl">
                            <van-icon name="comment-o"/>
                            <span>评论</span>
                        </div>
                        <div class="my-col">
                            <van-icon name="like-o"/>
                            <span>评论</span>
                        </div>
                        <div class="my-col">
                            <van-icon name="share"/>
                            <span>评论</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-list>
        <router-view/>
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
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        let msg = await searchInfo({
          page: this.page,
          per_page: 10,
          q: this.$route.params.word
        })
        this.seaInfo.push(...msg.data.results)
        // 加载状态结束
        this.page++

        let mypage = Math.ceil(msg.data.total_count / 10)
        // 数据全部加载完成
        if (this.page > mypage) {
          this.finished = true
        }
        this.loading = false
      },
      //评论
      goPl () {
        window.console.log(this.$judegefn('hmtt'))
        if (this.pdDl()) {

        } else {
          this.$dialog.confirm({
            message: '您尚未登录，是否前去登录'
          }).then(() => {
            this.$router.push('/qtlogin')
          }).catch(() => {
            // on cancel
          })
        }
      },
      //判断是否登录
      pdDl () {
        if (this.$store.state.token) {
          return true
        } else {
          return false
        }
      },
      //文章点击事件
      cellClick (item) {
        window.console.log(item)
        this.$router.push(`/detail/${item.art_id}`)
      },
    },
    created () {
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

            .my-row {
                display: flex;

                .my-col {
                    display: flex;
                    flex: 1;
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
    }

</style>
