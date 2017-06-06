import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'

Vue.use(Router)
// name为页面跳转后的页面标题
const router = new Router({
  routes: [
    {
      path: '/path',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '*',
      name: 'Hello',
      redirect: '/path'
    },
  ]
})
// 页面跳转后修改网页title
router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})
export default router;
