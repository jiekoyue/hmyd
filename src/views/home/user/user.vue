<template>
    <div style="height: 100%;">
        <div class="usertop">
            <van-image
                    width="4rem"
                    height="4rem"
                    fit="contain"
                    :src="require('./imgs/wd_weidl.png')"
            />
            <div class="usertag">
                <p>今日阅读</p>
                111分钟
            </div>
        </div>

        <van-row>
            <van-col span="8" class="userrow" @click="fn">
                <van-icon name="star-o" color="#ff4444" size="2.4rem"/>
                <p>收藏</p>
            </van-col>
            <van-col span="8">
                <van-icon name="underway-o" color="#ff9e1f" size="2.4rem"/>
                <p>历史</p>
            </van-col>
            <van-col span="8">
                <van-icon name="records" color="#6a93ff" size="2.4rem"/>
                <p>作品</p>
            </van-col>
        </van-row>

        <van-cell-group>
            <van-cell title="消息通知" is-link/>
            <van-cell title="用户反馈" is-link/>
            <van-cell title="小智同学" is-link/>
        </van-cell-group>

    </div>
</template>

<script>
  export default {
    name: 'user',
    methods: {
      fn () {
        window.console.log(1)
      }
    }
  }
</script>

<style scoped lang="less">
    .usertop {
        width: 100%;
        height: 30%;
        background: #3e9df8;
        display: flex;
        justify-content: center;

        .van-image {
            margin-top: 2.5rem;
        }
    }

    .usertag {
        position: fixed;
        right: 0;
        top: 8%;
        color: #fff;
        background: rgba(0, 0, 0, .3);
        padding: .4rem .8rem;
        border-radius: 999px 0 0 999px;
    }

    .van-row {
        height: 15%;
        background: #fff;
        display: flex;
        align-items: center;

        p {
            font-size: 1rem;
            margin-top: .2rem;
        }

        .van-col.van-col--8 {
            text-align: center;
            height: 60%;
        }

        .van-col + .van-col {
            border-left: 1px #ccc solid;
        }
    }

    .van-cell-group.van-hairline--top-bottom {
        margin-top: .5rem;
    }


</style>
