<template>
    <van-popup v-model="crossShow" class="crospopup">
        <van-cell-group v-if="isfeed">
            <van-cell title="不感兴趣" icon="failure" @click="unlike"/>
            <van-cell title="反馈垃圾内容" icon="warning-o" is-link @click="feedback"/>
            <van-cell title="拉黑作者" icon="delete" @click="blacklist"/>
        </van-cell-group>
        <van-cell-group v-else>
            <van-cell icon="shop-o">
                <van-icon
                        slot="icon"
                        name="arrow-left"
                        @click.stop="isfeed = true"
                />
            </van-cell>
            <van-cell v-for="(item,index) in feedList" :key="index" :title="item.title" @click="feedfn(item.type)"/>
        </van-cell-group>
    </van-popup>
</template>

<script>
  import { artdislikes, artReports, userUnlike } from '@/api/home.js'

  export default {
    name: 'more',
    data () {
      return {
        crossShow: false,
        action: '',
        actionList: [],
        isfeed: true,
        feedList: [
          {
            type: 1,
            title: '标题夸张'
          },
          {
            type: 2,
            title: '低俗色情'
          },
          {
            type: 3,
            title: '错别字多'
          },
          {
            type: 4,
            title: '旧闻重复'
          },
          {
            type: 5,
            title: '广告软文'
          },
          {
            type: 6,
            title: '内容不实'
          },
          {
            type: 7,
            title: '涉嫌违法犯罪'
          },
          {
            type: 8,
            title: '侵权'
          },
          {
            type: 0,
            title: '其他问题'
          }
        ],
        remark: ''
      }
    },
    methods: {
      //点击不感兴趣
      async unlike () {
        try {
          await artdislikes({ target: this.action.art_id })
          for (let i = 0; i < this.actionList.length; i++) {
            if (this.actionList[i].art_id == this.action.art_id) {
              this.actionList.splice(i, 1)
              this.$toast('操作成功')
              break
            }
          }
        } catch {
          this.$toast('操作失败')
        } finally {
          this.crossShow = false
        }
      },
      //点击反馈
      feedback () {
        this.isfeed = false
      },
      //点击拉黑
      async blacklist () {
        try {
          let msg = await userUnlike({ target: this.action.aut_id })
          for (let i = 0; i < this.actionList.length; i++) {
            if (this.actionList[i].aut_id.toString() == this.action.aut_id.toString()) {
              window.console.log(1)
              this.actionList.splice(i, 1)
              i--
            }
          }
          this.$toast('操作成功')
        } catch {
          this.$toast('操作失败')
        } finally {
          this.crossShow = false
        }
      },
      //反馈
      async feedfn (type) {
        try {
          let msg = await artReports({
            target: this.action.art_id,
            type,
            remark: this.remark
          })
          for (let i = 0; i < this.actionList.length; i++) {
            if (this.actionList[i].art_id == this.action.art_id) {
              this.actionList.splice(i, 1)
              this.$toast('操作成功')
              break
            }
          }
        } catch {
          this.$toast('操作失败')
        } finally {
          this.crossShow = false
        }
      }
    }
  }
</script>

<style scoped>
    .crospopup {
        width: 85%;
        border-radius: .3rem;

    }
</style>
