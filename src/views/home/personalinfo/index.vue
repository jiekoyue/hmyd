<template>
    <div>
        <van-nav-bar
                class="my-bar"
                title="个人信息"
                right-text="保存"
                left-arrow
                @click-left="$router.back()"
                @click-right="onClickRight"
        />
        <van-cell-group>
            <van-cell title="头像" is-link @click="$refs.pic.show = true">
                <template>
                    <img class="my-img" :src="userobj.photo" alt="">
                </template>
            </van-cell>
            <van-cell title="昵称" is-link @click="nameshow = true" :value="userobj.name"/>
            <van-cell title="介绍" is-link @click="introshow = true" :value="userobj.intro"/>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="性别" is-link @click="gendershow = true" :value="userobj.gender==0?'男':'女'"/>
            <van-cell title="生日" is-link @click="birthdayshow = true" :value="userobj.birthday"/>
        </van-cell-group>
        <!--        头像-->
        <photo ref="pic"/>
        <!--        昵称-->
        <van-popup
                v-model="nameshow"
                position="bottom"
        >

            <van-field
                    v-model="userobj.name"
                    required
                    placeholder="不能为空"
            />
        </van-popup>
        <!--        介绍-->
        <van-popup
                v-model="introshow"
                position="bottom"
        >

            <van-field
                    v-model="userobj.intro"
                    type="textarea"
                    rows="4"
                    placeholder="请输入您的个人介绍"
            />
        </van-popup>
        <!--        性别-->
        <van-action-sheet
                v-model="gendershow"
                :actions="actions"
                :round="false"
                cancel-text="取消"
                @cancel="onCancel"
                @select="onSelect"
        />
        <!--        生日-->
        <van-popup
                v-model="birthdayshow"
                position="bottom"
        >

            <van-datetime-picker
                    v-model="userobj.birthday||currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="birthdayshow = false"
                    @confirm="birthdayOk"
            />
        </van-popup>
    </div>
</template>

<script>
  import { userInfo, userPro, userProfile, } from '@/api/user.js'
  import photo from './components/photo'
  import dayjs from 'dayjs'

  export default {
    name: 'index',
    components: {
      photo,
    },
    data () {
      return {
        userobj: {},
        currentDate: new Date(),
        minDate: new Date(1950, 0, 1),
        maxDate: new Date(),
        nameshow: false,
        introshow: false,
        gendershow: false,
        birthdayshow: false,
        actions: [
          {
            name: '男',
            gender: 0
          },
          {
            name: '女',
            gender: 1
          },
        ],
      }
    },
    methods: {
      //性别弹出框的取消
      onCancel () {
        this.gendershow = false
      },
      //性别弹出框的选项点击
      onSelect (item) {
        this.userobj.gender = item.gender
        this.gendershow = false
      },
      //保存点击事件
      async onClickRight () {
        window.console.log(this.userobj.name.length)
        if (this.userobj.name.length > 7) {
          this.$toast('昵称长度要在1~7之间')
          return
        }
        let obj = {
          name: this.userobj.name,
          gender: this.userobj.gender,
          birthday: this.userobj.birthday,
          intro: this.userobj.intro,
        }
        let msg = await userPro(obj)
        this.$toast('修改成功')
      },
      //生日弹出框确认事件
      birthdayOk (val) {
        let date = dayjs(val).format('YYYY-MM-DD')//DD/MM/
        this.userobj.birthday = date
        this.birthdayshow = false
      },
    },
    async created () {
      let res = await userProfile()
      let msg = await userInfo()
      window.console.log(res)
      this.userobj = { ...res.data, ...msg.data }
    }
  }
</script>

<style scoped lang="less">
    .my-bar {
        background: #3e9df8;

        div, i, span {
            color: #fff;
        }

        span:active {
            background: #5f93c5;
        }
    }

    .my-img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
    }
</style>
