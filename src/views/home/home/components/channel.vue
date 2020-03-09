<template>
    <van-popup
            v-model="isShow"
            position="left"
            :style="{ height: '100%',width:'80%' }"
            closeable
            close-icon-position="top-left"

    >
        asasa
    </van-popup>
</template>

<script>
  export default {
    name: 'channel',
    data () {
      return {
        isShow: false
      }
    }
  }
</script>

<style scoped>

</style>
