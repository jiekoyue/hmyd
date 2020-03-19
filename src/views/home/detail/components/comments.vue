<template>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
        <van-cell class="mycell" v-for="(item,index) in list" :key="index">
            <div class="pl clearfix">
                <van-image
                        style="float: left;"
                        round
                        width="40px"
                        height="40px"
                        :src="item.aut_photo"
                />
                <span class="my-username">{{item.aut_name}}</span>
                <div class="my-icon">
                    <van-icon name="like" @click="likeClick(item)" :color="item.is_liking?'#ff4444':'#969799'"/>
                    <span>{{item.like_count}}</span>
                </div>
            </div>
            <div class="conent">
                <p>{{item.content}}</p>
                <div class="zt">
                    <span>{{item.pubdate | converTime}}</span>
                    <van-tag class="my-tag" @click="huifu(item)" round color="#eff7f8">回复{{item.reply_count}}</van-tag>
                </div>
            </div>

        </van-cell>
    </van-list>
</template>

<script>
  import { comments, plLike, plUnlike, } from '@/api/comments.js'
  import bus from '@/utilis/bus.js'

  export default {
    name: 'comments',
    data () {
      return {
        list: [],
        loading: false,
        finished: false,
        offser: undefined
      }
    },
    methods: {
      //下拉获取评论数据
      async onLoad () {
        // 异步更新数据
        let msg = await comments({
          type: 'a',
          source: this.$route.params.art_id,
          limit: 10,
          offset: this.offser
        })
        window.console.log(msg)
        bus.$emit('plshu', msg.data.total_count)
        this.list.push(...msg.data.results)
        this.offser = msg.data.last_id
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (msg.data.end_id == msg.data.last_id) {
          this.finished = true
        }

      },
      //评论点赞
      async likeClick (item) {
        if (!this.$judegefn('hmtt')) {
          this.$dialog.confirm({
            message: '您尚未登录，是否前去登录'
          }).then(() => {
            this.$router.push('/qtlogin')
          }).catch(() => {
            // on cancel
          })
          return
        }
        if (item.is_liking) {
          await plUnlike(item.com_id)
          item.like_count--
        } else {
          await plLike({ target: item.com_id })
          item.like_count++
        }
        item.is_liking = !item.is_liking
      },
      //点击回复
      huifu (item) {
        bus.$emit('huifu', item)
      }
    },
    created () {
      //文章评论
      bus.$on('newArr', data => {
        this.list.unshift(data)
      })
      //回复评论
      bus.$on('hfan', data => {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].com_id == data.id) {
            this.list[i].reply_count++
          }
        }
      })
    }
  }
</script>

<style scoped lang="less">
    /deep/ .mycell {
        padding: 0;
        margin-bottom: 10px;

        .my-username {
            display: inline-block;
            margin-left: 10px;
            color: #708ab6;
            margin-top: 5px;
        }

        .conent {
            padding-left: 50px;
        }

        .my-icon {
            float: right;
            display: flex;
            justify-content: center;

            .van-icon {
                font-size: 24px;
                margin-right: 10px;
            }
        }

        .my-tag {
            color: #445464;
            padding: 5px 18px;
            border-radius: 40px;
            margin-left: 10px;
            font-size: 16px;
        }
    }
</style>
