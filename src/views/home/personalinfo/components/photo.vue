<template>
    <van-popup v-model="show" :style="{ width: '80%' }" class="my-photo">
        <van-button block @click="$refs.file.click()">从相册选择</van-button>
        <input type="file" ref="file" style="display: none;" @change="fileChange">
        <van-button block>拍照</van-button>
        <van-button block @click="show = false">取消</van-button>
    </van-popup>
</template>

<script>
  import { ImagePreview } from 'vant'
  import { userPhoto } from '@/api/user.js'

  export default {
    name: 'photo',
    data () {
      return {
        show: false
      }
    },
    methods: {
      //上传图片
      fileChange () {
        ImagePreview({
          images: [
            URL.createObjectURL(this.$refs.file.files[0])
          ],
          showIndex: false,
          onClose: () => {
            this.$dialog.confirm({
              message: '是否设置该图片为头像'
            }).then(async () => {
              let msg = await userPhoto({ photo: this.$refs.file.files[0] })
              this.$parent.userobj.photo = msg.data.photo
              this.show = false
            }).catch(() => {
              // on cancel
            })
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
    .my-photo {
        border-radius: 5px;
    }
</style>
