<template>
    <div>
        <van-nav-bar
                class="my-bar"
                title="小智同学"
                left-arrow
                @click-left="$router.back()"
        />
        <div class="conent" ref="cons">
            <div class="chat_item" v-for="(item,index) in list" :key="index" :class="{user:item.isMi}">
                <img class="chat-img"
                     :src="item.isMi?$route.params.icon:'http://img5.imgtn.bdimg.com/it/u=2407059363,1195389560&fm=26&gp=0.jpg'"
                     alt="">
                <div class="chat-con">{{item.con}}</div>
            </div>
        </div>
        <div class="fas">
            <input type="text" v-model="value" placeholder="请输入.." @keyup.enter="onSearch">
            <span @click="onSearch">发送</span>
        </div>
    </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    name: 'index',
    data () {
      return {
        value: '',
        socket: '',
        list: []
      }
    },
    methods: {
      //点击发送
      onSearch () {
        if (this.value.trim() == '') {
          this.$toast('请输入内容')
          return
        } else {
          this.socket.emit('message', {
            msg: this.value,
            timestamp: Date.now()
          })
        }
        this.list.push({
          isMi: true,
          con: this.value
        })
        this.$nextTick(() => {
          this.$refs.cons.scrollTop = this.$refs.cons.scrollHeight
        })
        this.value = ''
      },
    },
    created () {
      this.socket = io(`http://ttapi.research.itcast.cn?token=${this.$store.state.token}`)
    },
    mounted () {
      this.socket.on('message', data => {
        window.console.log(data)
        this.list.push({
          isMi: false,
          con: data.msg
        })
        this.$nextTick(() => {
          this.$refs.cons.scrollTop = this.$refs.cons.scrollHeight
        })
      })
    }
  }
</script>

<style scoped lang="less">
    .my-bar {
        background: #3e9df8;

        div, i, span {
            color: #fff;
        }
    }

    .conent {
        overflow: auto;
        position: fixed;
        width: 100%;
        top: 45px;
        bottom: 50px;
        padding: 20px 10px;

        .chat_item {
            display: flex;
            margin-bottom: 20px;

            .chat-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .chat-con {
                margin: 0 0 0 10px;
                max-width: 48%;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 15px;
                line-height: 20px;
                background-color: #e0effb;
                border: 1px solid #c2d9ea;
            }
        }

        .user {
            flex-direction: row-reverse;

            .chat-con {
                margin: 0 10px 0 0;
            }
        }
    }

    .fas {
        position: fixed;
        bottom: 0;
        left: 0;
        background: #f5f5f5;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;

        input {
            height: 36px;
            line-height: 36px;
            padding: 0 10px;
            font-size: 15px;
            border-radius: 20px;
            flex: 1;
            margin-left: 10px;
            border: none;
            vertical-align: baseline;
        }

        span {
            font-size: 16px;
            height: 50px;
            line-height: 50px;
            display: inline-block;
            text-align: center;
            width: 15%;
            color: #cacaca;

            &:active {
                color: #3e9df8;
            }
        }
    }
</style>
