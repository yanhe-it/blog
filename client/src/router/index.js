import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin'
import front from './front'
Vue.use(Router)
//路由多次点击报错，解决代码
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//合并两个路由
let routes = new Set([...admin, ...front]);
const router = new Router({
  routes,
  mode: 'history',
  // 解决滚动条不在顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(!to.meta.isPublic && !sessionStorage.token) {
    Vue.prototype.$message({
      type: 'error',
      message: '请先登录'
    })
    return next('/login')
  }
  next()
})
export default router