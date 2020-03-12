<template>
    <van-popup
            class="mypopup"
            v-model="isShow"
            position="left"
            :style="{ height: '100%',width:'85%' }"
            closeable
            close-icon-position="top-left"


    >
        <!--        我的频道-->
        <div class="mychan">
            <div class="mytop">
                <span>我的频道</span>
                <van-button color="#f85b5b" round size="mini" plain @click="isclose=!isclose">{{isclose?'完成':'编辑'}}
                </van-button>
            </div>
            <template v-for="(item,index) in myList">
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
            <template v-for="(item,index) in allList">
                <van-tag class="mytag" size="large" :key="index">{{item.name}}
                </van-tag>
            </template>
        </div>
    </van-popup>
</template>

<script>
  import { allChan, useredit } from '@/api/home.js'

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
        myList: this.mylist,
        isShow: false,
        isclose: false,
        allList: [],
      }
    },
    watch: {
      mylist (val) {
        if (val) {
          this.myList = val.filter(item => {
            return item.id != 0
          })
        }
      }
    },
    computed: {
      pd () {
        return this.allList.filter(item => {
          return !(this.myList.includes(item.id))
        })
      },
    },
    methods: {
      close (type, index) {
        type.tagShow = false
        window.console.log(type)
        this.myList = this.myList.filter((item, idx) => {
          return item != type
        })
        window.console.log(this.myList)
        let arr = this.myList.map((item, index) => {
          return {
            id: item.id,
            seq: index + 1
          }
        })
        useredit(arr).then(msg => {
          window.console.log(msg)
        })
      }
    },
    created () {
      allChan().then(msg => {
        this.allList = msg.data.channels
        window.console.log(msg)
        this.allList.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
      })
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
