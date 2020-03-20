<template>
    <div style="height: 100%;">
        <div class="usertop">
            <van-image
                    v-if="!userobj.name"
                    width="4rem"
                    height="4rem"
                    fit="contain"
                    :src="require('./imgs/wd_weidl.png')"
            />
            <div class="my-user" v-else>
                <img @click="$router.push('/personalinfo')" class="my-img" :src="userobj.photo" alt="">
                <span>{{userobj.name}}</span>
            </div>
            <div class="my-dt">
                <div @click="$router.push('/mywork')">
                    <span>{{userobj.art_count||0}}</span>
                    <div class="mydtdiv">动态</div>
                </div>
                <div @click="$router.push('/follow?type=c')">
                    <span>{{userobj.follow_count||0}}</span>
                    <div class="mydtdiv">关注</div>
                </div>
                <div @click="$router.push('/follow')">
                    <span>{{userobj.fans_count||0}}</span>
                    <div class="mydtdiv">粉丝</div>
                </div>
            </div>
            <div class="usertag">
                <p>今日阅读</p>
                111分钟
            </div>
        </div>

        <van-row>
            <van-col span="8" class="userrow" @click="$router.push('/collect?type=c')">
                <van-icon name="star-o" color="#ff4444" size="2.4rem"/>
                <p>收藏</p>
            </van-col>
            <van-col span="8" @click="$router.push('/collect')">
                <van-icon name="underway-o" color="#ff9e1f" size="2.4rem"/>
                <p>历史</p>
            </van-col>
            <van-col span="8" @click="$router.push('/mywork?type=c')">
                <van-icon name="records" color="#6a93ff" size="2.4rem"/>
                <p>作品</p>
            </van-col>
        </van-row>

        <van-cell-group>
            <van-cell title="消息通知" is-link @click="$router.push('/message')"/>
            <van-cell title="用户反馈" is-link @click="$router.push('/robot')"/>
            <van-cell title="小智同学" is-link @click="$router.push('/robot')"/>
        </van-cell-group>

    </div>
</template>

<script>
  import { userInfo, } from '@/api/user.js'

  export default {
    name: 'user',
    data () {
      return {
        userobj: {}
      }
    },
    methods: {

    },
    async created () {
      let msg = await userInfo()
      window.console.log(msg)
      this.userobj = msg.data
    }
  }
</script>

<style scoped lang="less">
    .usertop {
        width: 100%;
        height: 30%;
        background: #3e9df8;

        .van-image {
            width: 100% !important;
            margin: 2.5rem auto 0;
        }

        .my-user {
            display: flex;
            align-items: center;
            padding-left: 35px;

            .my-img {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                margin-top: 2.5rem;
            }

            span {
                color: #fff;
                font-size: 16px;
                margin-left: 15px;
            }
        }

        .my-dt {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            color: #fff;
            text-align: center;
            font-size: 16px;

            .mydtdiv {
                margin-top: 10px;
            }
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
