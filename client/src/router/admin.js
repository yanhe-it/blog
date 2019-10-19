// 管理界面路由
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/admin/Login.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: 'home',
        name: 'admin_home',
        component: () => import('@/components/admin/AdminHome.vue')
      },
      {
        path: 'article-list',
        name: 'article-list',
        component: () => import('@/components/admin/AllArticles.vue')
      },
      // 标签查询
      {
        path: 'search_tag/:search_tag',
        component: () => import('@/components/admin/SearchTag.vue'),
        props: true
      },
      // 全文搜索
      {
        path: 'search/:search',
        component: () => import('@/components/admin/Search.vue'),
        props: true
      },
      {
        path: 'article-list/page/:num',
        component: () => import('@/components/admin/ArticleList.vue'),
        props: true
      },
      {
        path: 'new-article',
        component: () => import('@/components/admin/EditArticle.vue')
      },
      {
        path: 'edit-article/:id',
        component: () => import('@/components/admin/EditArticle.vue'),
        props: true
      },
      {
        path: 'tag-list',
        name: 'tag-list',
        component: () => import('@/components/admin/TagList.vue')
      },
      {
        path: 'new-tag',
        component: () => import('@/components/admin/EditTag.vue')
      },
      {
        path: 'edit-tag/:id',
        component: () => import('@/components/admin/EditTag.vue'),
        props: true
      },
      {
        path: 'page_article-list',
        name: 'page_article-list',
        component: () => import('@/components/admin/PageArticleList.vue')
      },
      {
        path: 'new-page_article',
        component: () => import('@/components/admin/EditPageArticle.vue')
      },
      {
        path: 'edit-page_article/:id',
        component: () => import('@/components/admin/EditPageArticle.vue'),
        props: true
      },
      {
        path: 'admin_user-list',
        name: 'admin_user-list',
        component: () => import('@/components/admin/AdminUserList.vue')
      },
      {
        path: 'new-admin_user',
        component: () => import('@/components/admin/EditAdminUser.vue')
      },
      {
        path: 'edit-admin_user/:id',
        component: () => import('@/components/admin/EditAdminUser.vue'),
        props: true
      }
    ]
  }
]