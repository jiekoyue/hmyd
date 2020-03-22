<template>
    <div style="min-height: 100%;background: #fff;">
        <van-nav-bar :title="artInfo.title" left-arrow @click-left="onClickLeft">
            <van-icon name="ellipsis" slot="right"/>
        </van-nav-bar>
        <div class="article_box">
            <div class="article">{{artInfo.title}}</div>
            <div class="artuser" ref="user" :class="isfixed?'artfixed':''">
                <div style="display: flex;align-items: center;">
                    <van-image
                            round
                            width="50px"
                            height="50px"
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
                <van-button round plain @click="attitude1"
                            :type="artInfo.attitude==1?'danger':'default'" icon="like">点赞
                </van-button>
                <van-button round plain @click="attitude2"
                            :type="artInfo.attitude==0?'danger':'default'" icon="delete">不喜欢
                </van-button>
            </div>
            <div style="text-align: left;
                         font-size: 16px;
                         font-weight: 900;
                         padding: 10px 0;
                         margin: 10px 0;
                         margin-bottom: 50px;
                         color: #2c3e50;">猜你喜欢
            </div>
            <comment/>
        </div>
        <wript :artArr="artInfo"/>
        <comback :loding="commentback"/>
    </div>
</template>

<script>
  import { artdislikes, articlesInfo, artlikes, followings, unartdislikes, unartlikes, unfollow } from '@/api/home.js'
  import comment from './components/comments.vue'
  import wript from './components/wript.vue'
  import comback from './components/commentback.vue'

  export default {
    name: 'detail',
    components: {
      comment,
      wript,
      comback,
    },
    data () {
      return {
        artInfo: {},
        isfixed: false,
        commentback: false
      }
    },
    watch: {},
    methods: {
      //点击返回
      onClickLeft () {
        this.$router.back()
        // this.$router.go(-1)
        // this.$parent.isShow = true
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
        if (this.artInfo.is_followed) {
          //取消关注

          await unfollow(this.artInfo.aut_id)
          this.$toast('已取消关注')
          this.artInfo.is_followed = !this.artInfo.is_followed
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
      //点赞
      async attitude1 () {
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
        if (this.artInfo.attitude == 1) {
          await unartlikes(this.artInfo.art_id)
          this.artInfo.attitude = -1
        } else {
          await artlikes({ target: this.artInfo.art_id })
          this.artInfo.attitude = 1
        }
      },
      //不喜欢
      async attitude2 () {
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
        if (this.artInfo.attitude == 0) {
          await unartdislikes(this.artInfo.art_id)
          this.artInfo.attitude = -1
        } else {
          await artdislikes({ target: this.artInfo.art_id })
          this.artInfo.attitude = 0
        }
      },
    },
    async created () {
      try {
        let msg = await articlesInfo(this.$route.params.art_id)
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
        margin-bottom: 50px;
        word-wrap: break-word;
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
            overflow: hidden;

            /deep/ img {
                max-width: 100%;
            }
        }

        .operate {
            display: flex;
            margin-top: 30px;
            justify-content: space-around;
        }

    }


</style>
