<template>
    <div>
        <van-nav-bar
                class="my-bar"
                title="黑马程序员"
                left-arrow
                @click-left="$router.back()"
        />
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {}
    },
    methods: {
      onClickRight () {

      }
    }
  }
</script>

<style scoped lang="less">
    .my-bar {
        background: #3e9df8;

        div,i,span {
            color: #fff;
        }
    }
</style>
