<template>
    <van-popup
            v-model="show"
            position="bottom"
            closeable
            close-icon-position="top-left"
            :style="{ height: '70%' }"
    >
        <div class="my-back">{{len}}条回复</div>
        <van-list
                v-if="show"
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
                        <van-icon name="like" @click="likeClick(item)"
                                  :color="item.is_liking?'#ff4444':'#969799'"/>
                        <span>{{item.like_count}}</span>
                    </div>
                </div>
                <div class="conent">
                    <p>{{item.content}}</p>
                    <div class="zt">
                        <span>{{item.pubdate | converTime}}</span>
                    </div>
                </div>

            </van-cell>
        </van-list>
        <div class="reply-operate">
            <form>
                <input type="text" v-model="plTxt" @keyup.enter.stop="addPl" placeholder="写评论">
            </form>
            <van-icon name="comment-o" size="22px" :info="len"/>
        </div>
    </van-popup>
</template>

<script>
  import { comments, plAdd, plLike, plUnlike } from '@/api/comments.js'
  import bus from '@/utilis/bus.js'

  export default {
    name: 'commentback',
    data () {
      return {
        list: [],
        loading: false,
        finished: false,
        offser: undefined,
        show: false,
        plobj: '',
        plTxt: '',
        len: 0,
      }
    },
    methods: {
      //下拉获取评论数据
      async onLoad () {
        // 异步更新数据
        let msg = await comments({
          type: 'c',
          source: this.plobj.com_id.toString(),
          limit: 10,
          offset: this.offser
        })
        window.console.log(msg)
        this.list.push(...msg.data.results)
        this.len = msg.data.total_count
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
      //发表评论
      async addPl () {
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
        if (this.plTxt.trim() != '') {
          try {
            let msg = await plAdd({
              target: this.plobj.com_id.toString(),
              content: this.plTxt,
              art_id: this.$route.params.art_id,
            })
            this.list.unshift(msg.data.new_obj)
            this.len++
            bus.$emit('hfan', {
              id: this.plobj.com_id,
              len: this.list.length
            })
          } catch {
            this.$toast('无法评论')
          } finally {
            this.plTxt = ''
          }
        } else {
          this.$toast('请输入内容')
        }
      }
    },
    created () {
      bus.$on('huifu', data => {
        this.plobj = data
        this.list = []
        this.show = true
        this.loading = false
        this.finished = false
        this.offser = undefined
      })
    }
  }
</script>

<style scoped lang="less">
    .my-back {
        height: 40px;
        font-size: 20px;
        color: #2c3e50;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /deep/ i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
        font-size: 30px;
        top: 5px;
        color: #2c3e50;
        left: 5px;
    }

    .mycell {
        padding: 0 10px;
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

    .van-list {
        padding-bottom: 50px;
    }

    .reply-operate {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 50px;
        padding: 5px 10px;
        background: #fff;
        border-top: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-around;
        overflow: hidden;

        form {
            flex-basis: 55%;
            border-radius: 40px;
            border: 1px solid #eee;
            text-align: center;
            font-size: 18px;

            input {
                border: none;
                line-height: 32px;
                height: 32px;
                width: 80%;
                margin: 0 auto;
            }

        }

    }
</style>
