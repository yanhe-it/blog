// 前端路由
export default [
  {
    path: '*',
    redirect: '/404',
    meta: { isPublic: true }
  },
  {
    path: '/404',
    component: () => import('@/views/front/404.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/front/Home.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/front/About.vue'),
    meta: { isPublic: true },
    props: true
  },
  {
    path: '/link',
    name: 'my_link',
    component: () => import('@/views/front/Link.vue'),
    meta: { isPublic: true },
    props: true
  },
  {
    path: '/search_tag/:search_tag',
    component: () => import('@/components/front/SearchTag.vue'),
    meta: { isPublic: true },
    props: true
  },
  {
    path: '/search/:search',
    component: () => import('@/components/front/Search.vue'),
    meta: { isPublic: true },
    props: true
  },
  {
    path: '/article/:id',
    name: 'article_page',
    component: () => import('@/components/front/Article.vue'),
    meta: { isPublic: true },
    props: true
  }
]