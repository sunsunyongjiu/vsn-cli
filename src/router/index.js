import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import test from '@/pages/test'

Vue.use(Router)
// name为页面跳转后的页面标题
const router = new Router({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/test',
      name: 'Test',
      component: test,
    },
    {
      path: '*',
      name: 'Index',
      redirect: '/Index'
    },
  ]
})
// 页面跳转后修改网页title
router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})
export default router;
