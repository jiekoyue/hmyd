<template>
    <div class="login">
        <van-nav-bar
                class="titleBg"
                title="登录"/>
        <van-field v-model="from.mobile"
                   icon-prefix="iconfont icon-phone"
                   left-icon="手机"
                   clearable
                   :error-message="err.mobile"
                   placeholder="请输入手机号"/>
        <van-field
                v-model="from.code"
                center
                clearable
                :error-message="err.code"
                icon-prefix="iconfont icon-lock-fill" left-icon="密码"
                placeholder="请输入验证码"
        >
            <van-button @click="infoCode" slot="button" class="btnInp" color="#ededed" round size="small">发送验证码
            </van-button>
        </van-field>
        <div class="loginBtn">
            <van-button type="info" :loading="load" loading-text="登录中..." block @click="loginBtn">登录</van-button>
        </div>
    </div>
</template>

<script>
  import { login, mobile } from '@/api/login.js'
  import { setToken } from '@/utilis/token.js'

  export default {
    name: 'index',
    data () {
      return {
        from: {
          mobile: '18511111111',
          code: '246810',
        },
        err: {
          mobile: '',
          code: '',
        },
        load: false
      }
    },
    methods: {
      //获取验证码
      infoCode () {
        mobile(this.from.mobile).then(msg => {
          window.console.log(msg)
        })
      },
      //点击登录
      async loginBtn () {
        if (this.rouls()) {
          this.load = true
          try {
            let msg = await login(this.from)
            setToken(msg.data)
            this.$store.commit('setTokenfn', msg.data.token)
            this.$store.commit('setRefresh', msg.data.refresh_token)
            this.$toast.success('登录成功')
            this.$router.push('/')
          } catch {
            this.$toast.fail('手机号码或验证码错误')
          } finally {
            this.load = false
          }

        }
      },
      //校验登录信息
      rouls () {
        let key = true
        if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.from.mobile)) {
          this.err.mobile = ''
        } else {
          this.err.mobile = '手机格式错误'
          key = false
        }
        if (this.from.code.length === 6) {
          this.err.code = ''
        } else {
          this.err.code = '验证格式错误'
          key = false
        }
        return key
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
        padding: 20px 5%;
    }
</style>
<style>
    .icon-lock-fill, .icon-phone {
        font-size: 1.5rem;
    }
</style>
