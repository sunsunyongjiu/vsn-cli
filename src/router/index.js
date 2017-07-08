import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import lists from '@/pages/lists'
import detail from '@/pages/detail'

Vue.use(Router)
// name为页面跳转后的页面标题
const router = new Router({
  routes: [
    {
      path: '/path',
      name: '积分商城',
      component: Hello,
    },
    {
      path: '/lists',
      name: '分类推荐',
      component: lists,
    },
    {
      path: '/detail',
      name: '商品详情',
      component: detail,
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
