import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import details from '@/pages/details'

Vue.use(Router)
// name为页面跳转后的页面标题
const router = new Router({
  routes: [
    {
      path: '/path',
      name: '首页',
      component: Hello,
    },
    {
      path: '/details',
      name: 'details',
      component: details,
    },
    {
      path: '*',
      name: '首页',
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
