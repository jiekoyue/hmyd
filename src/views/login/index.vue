<template>
    <div class="login">
        <van-nav-bar
                class="titleBg"
                title="登录"/>
        <van-field v-model="phone" icon-prefix="iconfont icon-phone" left-icon="手机" placeholder="请输入手机号"/>
        <van-field
                v-model="code"
                center
                clearable
                icon-prefix="iconfont icon-lock-fill" left-icon="密码"
                placeholder="请输入密码"
        >
            <van-button @click="infoCode" slot="button" class="btnInp" color="#ededed" round size="small">发送验证码
            </van-button>
        </van-field>
        <div class="loginBtn">
            <van-button type="info" block>登录</van-button>
        </div>
    </div>
</template>

<script>
  import { mobile } from '@/api/login.js'

  export default {
    name: 'index',
    data () {
      return {
        phone: '',
        code: ''
      }
    },
    methods: {
      infoCode () {
        mobile().then(msg => {
          window.console.log(msg)
        })
      }
    }
  }
</script>

<style scoped>
    @import "../../assets/iconfont/iconfont.css";

    .login {
        width: 100%;
        height: 100%;
        background: #f6f6f6;
    }

    .btnInp .van-button__text {
        color: #969696;
    }

    .titleBg {
        background: #3298fa;
    }

    .iconfont {
        color: #f00;
    }

    .van-nav-bar__title {
        color: #fff;
    }

    .loginBtn {
        padding: 20px 10px;
    }
</style>
<style>
    .icon-lock-fill, .icon-phone {
        font-size: 22px;
    }
</style>
