import login from '@/views/login/index.vue'
import index from '@/views/home/index.vue'
import home from '@/views/home/home/home.vue'
import user from '@/views/home/user/user.vue'
import question from '@/views/home/question/question.vue'
import video from '@/views/home/video/flv.vue'

export default [
  {
    path: '/login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/index',
    component: index,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        component: home,
        meta: {
          title: '首页'
        }
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
  },
]
