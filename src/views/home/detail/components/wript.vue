<template>
    <div class="reply-operate">
        <form>
            <input type="text" v-model="plTxt" @keyup.enter.stop="addPl" placeholder="写评论">
        </form>
        <van-icon name="comment-o" size="22px" :info="pls"/>
        <van-icon @click="collectedfn" :name="artArr.is_collected?'star':'star-o'" size="22px"/>
        <van-icon name="share" size="22px"/>
    </div>
</template>

<script>
  import { collect, uncollect } from '@/api/home.js'
  import { plAdd, } from '@/api/comments.js'
  import bus from '@/utilis/bus.js'

  export default {
    name: 'wript',
    props: ['artArr'],
    data () {
      return {
        plTxt: '',
        pls: '',
      }
    },
    methods: {
      //收藏或取消收藏
      async collectedfn () {
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
        if (this.artArr.is_collected) {
          //取消收藏
          try {
            let msg = await uncollect(this.artArr.art_id)
            this.$toast.success('已取消收藏')
            this.artArr.is_collected = !this.artArr.is_collected
          } catch {
            this.$toast.fail('未能取消收藏')
          }

        } else {
          //收藏
          collect({ target: this.artArr.art_id }).then(msg => {
            if (msg.message == 'OK') {
              this.$toast.success('收藏成功')
              this.artArr.is_collected = !this.artArr.is_collected
            } else {
              this.$toast.fail('收藏失败')
            }
          })
        }
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
          let msg = await plAdd({
            target: this.$route.params.art_id,
            content: this.plTxt
          })
          window.console.log(msg)
          bus.$emit('newArr', msg.data.new_obj)
          this.pls++
          this.plTxt = ''
        } else {
          this.$toast('请输入内容')
        }
      }
    },
    created () {
      bus.$on('plshu', data => {
        this.pls = data
      })
    }
  }
</script>

<style scoped lang="less">
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
