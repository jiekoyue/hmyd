<template>
    <van-popup
            class="mypopup"
            v-model="isShow"
            position="left"
            :style="{ height: '100%',width:'85%' }"
            closeable
            @closed="isclose=false"
            close-icon-position="top-left"


    >
        <!--        我的频道-->
        <div class="mychan">
            <div class="mytop">
                <span>我的频道</span>
                <van-button color="#f85b5b" round size="mini" plain @click="isclose=!isclose">{{isclose?'完成':'编辑'}}
                </van-button>
            </div>
            <template v-for="(item,index) in mylist">
                <van-tag :closeable="isclose"
                         @close="close(item,index)" class="mytag" size="large"
                         v-if="item.id !==0"
                         :key="index">{{item.name}}
                </van-tag>
            </template>
        </div>
        <!--        频道推荐-->
        <div class="mychan">
            <div class="mytop">
                <span>频道推荐</span>
            </div>
            <template v-for="(item,index) in pd">
                <van-tag class="mytag" size="large" :key="index" @click="addpd(item)">+{{item.name}}
                </van-tag>
            </template>
        </div>
    </van-popup>
</template>

<script>
  import { allChan, userdel, useredit } from '@/api/home.js'

  export default {
    name: 'channel',
    props: {
      mylist: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        isShow: false,
        isclose: false,
        allList: [],
      }
    },
    computed: {
      pd () {
        let arr1 = this.mylist.map(item => {
          return item.id
        })
        return this.allList.filter(item => {
          return !arr1.includes(item.id)
        })
      },
    },
    methods: {
      //关闭弹出层
      closedfn () {
        this.isclose = false
      },
      //删除频道
      async close (type, index) {
        for (var i = 0; i < this.mylist.length; i++) {
          if (this.mylist[i] == type) {
            this.mylist.splice(i, 1)
          }
        }
        try {
          await userdel({ channels: type.id })
          this.$toast('删除成功')
        } catch {
          // this.$toast('参数错误')
        }
      },
      //请求
      ajaxfn () {
        let channels = this.mylist.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 1
          }
        })
        useredit({ channels }).then(msg => {
          window.console.log(msg)
        })
      },
      //添加频道
      addpd (data) {
        this.$set(data, 'isLoading', false)
        this.$set(data, 'list', [])
        this.$set(data, 'loading', false)
        this.$set(data, 'finished', false)
        data.preTimestamp = Date.now()
        this.mylist.push(data)
        this.ajaxfn()
      }
    },
    async created () {
      try {
        let msg = await allChan()
        this.allList = msg.data.channels
        window.console.log(msg)
      } catch {

      }

    }
  }
</script>

<style scoped lang="less">
    /deep/ i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
        font-size: 1.5rem;
        color: #2c3e50;
    }

    /deep/ i.van-icon.van-icon-cross.van-tag__close {
        position: absolute;
        top: -0.4rem;
        right: -.4rem;
        background: #cdcdcd;
        border-radius: 50%;
        font-size: .5rem;
        padding: .1rem;
    }

    .mypopup {
        padding: 0 .5rem;
    }

    .mychan {
        .mytop {
            display: flex;
            margin-top: 3.8rem;
            font-size: 1rem;
            margin-bottom: .8rem;
            justify-content: space-between;
        }

        &:nth-child(2) {
            .mytop {
                margin-top: 3rem;
            }
        }
    }

    .mytag {
        margin-right: .8rem;
        position: relative;
        margin-top: .5rem;
    }
</style>
