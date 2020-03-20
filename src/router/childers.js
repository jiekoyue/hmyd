import login from '@/views/login/index.vue'
import index from '@/views/home/index.vue'
import detail from '@/views/home/detail/detail.vue'
import home from '@/views/home/home/home.vue'
import user from '@/views/home/user/user.vue'
import question from '@/views/home/question/question.vue'
import video from '@/views/home/video/flv.vue'
import search from '@/views/home/search/search.vue'
import searchcont from '@/views/home/searchcontent/searchcontent.vue'
import personalinfo from '@/views/home/personalinfo/index.vue'
import mywork from '@/views/home/mywork/index.vue'
import follow from '@/views/home/follow/index.vue'
import collect from '@/views/home/collect/index.vue'
import message from '@/views/home/message/index.vue'
import robot from '@/views/home/robot/index.vue'

export default [
  {
    path: '/login',
    component: login,
    meta: {
      title: '登录'
    }
  }, {
    path: '/qtlogin',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/search',
    component: search,
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/personalinfo',
    component: personalinfo,
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/mywork',
    component: mywork,
    meta: {
      title: '作品'
    }
  },
  {
    path: '/follow',
    component: follow,
    meta: {
      title: '关注/粉丝'
    }
  },
  {
    path: '/collect',
    component: collect,
    meta: {
      title: '收藏/历史'
    }
  },
  {
    path: '/message',
    component: message,
    meta: {
      title: '消息通知'
    }
  },
  {
    path: '/robot',
    component: robot,
    meta: {
      title: '小智同学'
    }
  },
  {
    path: '/search/:word',
    component: searchcont,
    meta: {
      title: '搜索结果'
    },
  },
  {
    path: '/detail/:art_id',
    component: detail,
    meta: {
      title: '文章详情'
    },
  },
  {
    path: '/',
    component: index,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/',
        component: home,
        meta: {
          title: '首页'
        },
      },
      {
        path: 'user',
        component: user,
        meta: {
          title: '用户'
        }
      },
      {
        path: 'question',
        component: question,
        meta: {
          title: '问答'
        }
      },
      {
        path: 'video',
        component: video,
        meta: {
          title: '视频'
        }
      },
    ]
  }
]
