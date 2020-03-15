<template>
    <div>
        <van-nav-bar :title="artInfo.title" left-arrow @click-left="onClickLeft">
            <van-icon name="ellipsis" slot="right"/>
        </van-nav-bar>
        <div class="article_box" v-if="artInfo.length">
            <div class="article">{{artInfo.title}}</div>
            <div class="artuser" ref="user" :class="isfixed?'artfixed':''">
                <div style="display: flex;align-items: center;">
                    <van-image
                            round
                            width="50px"
                            :src="artInfo.aut_photo"
                    />
                    <div class="username">
                        <p>{{artInfo.aut_name}}</p>
                        <p>{{artInfo.pubdate | converTime}}</p>
                    </div>
                </div>
                <div>
                    <van-button type="info" @click="followedfn">{{artInfo.is_followed?'已关注':'+关注'}}
                    </van-button>
                </div>
            </div>
            <!--            <div>{{artInfo.content}}</div>-->
            <div class="artcont" ref="con" v-html="artInfo.content"></div>
            <div class="operate">
                <van-button round icon="like">点赞</van-button>
                <van-button round icon="delete">不喜欢</van-button>
            </div>
            <div class="reply-operate">
                <form>
                    <input type="text" placeholder="写评论">
                </form>
                <van-icon name="comment-o" size="22px"/>
                <van-icon @click="collectedfn" :name="artInfo.is_collected?'star':'star-o'" size="22px"/>
                <van-icon name="share" size="22px"/>
            </div>
        </div>
    </div>
</template>

<script>
  import { articlesInfo, collect, followings, uncollect, unfollow } from '@/api/home.js'

  export default {
    name: 'detail',
    data () {
      return {
        artInfo: {},
        isfixed: false
      }
    },
    watch: {},
    methods: {
      //点击返回
      onClickLeft () {
        this.$router.push('/')
        this.$parent.isShow = true
      },
      //鼠标滚动事件
      handleScroll () {
        // window.console.log(this.$refs.user.offsetHeight)
        // window.console.log(this.$refs.con.getBoundingClientRect().top)
        if (this.$refs.con.getBoundingClientRect().top > this.$refs.user.offsetHeight) {
          this.isfixed = false
        } else {
          this.isfixed = true
        }
      },
      //取消或关注用户
      async followedfn () {
        if (this.artInfo.is_followed) {
          //取消关注
          try {
            await unfollow(this.artInfo.aut_id)
            this.$toast.success('已取消关注')
            this.artInfo.is_followed = !this.artInfo.is_followed
          } catch {
            this.$toast.fail('未能取消关注')
          }
        } else {
          //关注
          followings({ target: this.artInfo.aut_id }).then(msg => {
            if (msg.message == 'OK') {
              this.$toast.success('关注成功')
              this.artInfo.is_followed = !this.artInfo.is_followed
            } else {
              this.$toast.fail('关注失败')
            }
          })
        }

      },
      //收藏或取消收藏
      async collectedfn () {
        if (this.artInfo.is_collected) {
          //取消收藏
          try {
            let msg = await uncollect(this.artInfo.art_id)
            this.$toast.success('已取消收藏')
            this.artInfo.is_collected = !this.artInfo.is_collected
          } catch {
            this.$toast.fail('未能取消收藏')
          }

        } else {
          //收藏
          collect({ target: this.artInfo.art_id }).then(msg => {
            if (msg.message == 'OK') {
              this.$toast.success('收藏成功')
              this.artInfo.is_collected = !this.artInfo.is_collected
            } else {
              this.$toast.fail('收藏失败')
            }
          })
        }
      },
    },
    async created () {
      this.$store.commit('setTrace', this.$route.query.click)
      try {
        let mag = await articlesInfo(this.$route.query.art_id)
        window.console.log(msg.data)
        this.artInfo = msg.data
      } catch {
        this.$toast.fail('该文章已被删除')
      }
    },
    mounted () {
      // window.addEventListener('mousewheel', this.handleScroll, false)

    }
  }
</script>

<style scoped lang="less">
    .van-nav-bar.van-hairline--bottom {
        background: #3194ff;
    }

    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
        color: #fff;
        font-size: 20px;
    }

    .van-nav-bar__title.van-ellipsis {
        color: #fff;
    }

    i.van-icon.van-icon-ellipsis {
        color: #fff;
        font-size: 20px;
    }

    .article_box {
        padding: 10px;
        white-space: normal;

        .article {
            font-size: 26px;
            text-align: center;
            margin: 20px 0;
        }

        .artfixed {
            position: fixed;
            top: 0;
            left: 0;
            padding: 10px !important;
            background: #fff;
        }

        .artuser {
            padding: 10px 0;
            display: flex;
            width: 100%;
            justify-content: space-between;

            .username {
                p {
                    color: #2c3e50;
                    font-size: 16px;
                    margin-left: 10px;
                }

                p + p {
                    margin-top: 10px;
                }
            }
        }

        .artcont {
            /*margin-top: 90px;*/
        }

        .operate {
            display: flex;
            justify-content: space-around;
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
    }

</style>
