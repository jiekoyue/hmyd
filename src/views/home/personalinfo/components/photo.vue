<template>
    <van-popup v-model="show" :style="{ width: '80%' }" :close-on-click-overlay="false" class="my-photo">
        <van-button block>从相册选择</van-button>
        <van-button block>拍照</van-button>
        <van-button block @click="show = false">取消</van-button>
    </van-popup>
</template>

<script>
  export default {
    name: 'photo',
    data () {
      return {
        show: false
      }
    }
  }
</script>

<style scoped lang="less">
    .my-photo {
        border-radius: 5px;
    }
</style>
