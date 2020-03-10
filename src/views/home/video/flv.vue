<template>
    <div>
        <van-nav-bar
                title="视频"
                left-arrow
                @click-left="onClickLeft"
        />

        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="conent"
        >
            <van-cell v-for="item in list" :key="item">
                <div class="flvMv">
                    黑马问答
                </div>
                <div class="flvUser">
                    <van-image
                            round
                            width="2.5rem"
                            height="2.5rem"
                            :src="require('@/assets/imgs/01.jpeg')"
                    />
                    <span>搞笑的奇葩坊</span>
                </div>
            </van-cell>
        </van-list>

    </div>
</template>

<script>
  export default {
    name: 'flv',
    data () {
      return {
        list: [1, 2, 3, 4, 5],
        loading: false,
        finished: false
      }
    },
    methods: {
      //点击返回事件
      onClickLeft () {
        this.$router.push('/index/user')
      },
      //到底部事件
      onLoad () {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }

          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          // if (this.list.length >= 40) {
          //   this.finished = true
          // }
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">
    .van-nav-bar.van-hairline--bottom {
        background: #3e9df8;

        .van-nav-bar__title.van-ellipsis {
            color: #fff;
        }

        i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
            color: #fff;
        }

    }

    .conent {
        padding-top: 2.5rem;
        margin-bottom: 3rem;
        background: #f5f7f9;

        .van-cell {
            background: #f5f7f9;
        }

        .flvMv {
            height: 12.5rem;
            background: #3e9df8;
            border-radius: .3rem;
            font-size: 2rem;
            color: #fff;
            text-align: center;
            line-height: 12.5rem;
        }

        .flvUser {
            height: 5rem;
            display: flex;
            align-items: center;

            span {
                display: inline-block;
                margin-left: .6rem;
            }
        }
    }
</style>
