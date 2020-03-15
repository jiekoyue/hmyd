import login from '@/views/login/index.vue'
import index from '@/views/home/index.vue'
import detail from '@/views/home/home/detail.vue'
import home from '@/views/home/home/home.vue'
import user from '@/views/home/user/user.vue'
import question from '@/views/home/question/question.vue'
import video from '@/views/home/video/flv.vue'
import search from '@/views/home/search/search.vue'

export default [
  {
    path: '/login',
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
    path: '/',
    component: index,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        component: home,
        meta: {
          title: '首页'
        },
        children: [
          {
            path: 'detail',
            component: detail,
            meta: {
              title: '文章详情'
            }
          },
        ]
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
