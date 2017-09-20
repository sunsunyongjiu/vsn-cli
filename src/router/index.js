import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import lists from '@/pages/lists'
import detail from '@/pages/detail'
import search from '@/pages/search'
import cart from '@/pages/cart'
import personal from '@/pages/personal'
import order from '@/pages/order'
import contact from '@/pages/contact'
import lifeList from '@/pages/list/list-life'
import pointHistory from '@/pages/person/pointHistory'
import lifePresent from '@/pages/list/list-present'
import sureOrder from '@/pages/order/sureOrder'
import orderTicket from '@/pages/order/orderTicket'
import choseLocation from '@/pages/order/choseLocation'
import addLocation from '@/pages/order/addLocation'
import orderDetail from '@/pages/order/orderDetail'
import returnOrder from '@/pages/order/return'
import changeOrder from '@/pages/order/changeOrder'
import listTime from '@/pages/list/list-time'
import pay from '@/pages/pay/pay'
import paySc from '@/pages/pay/paySuccess'


Vue.use(Router)
// name为页面跳转后的页面标题
const router = new Router({
	 mode: 'history',
  routes: [{
      path: '/search',
      name: '搜索列表',
      component: search,
    },
    {
      path: '/cart',
      name: '购物车',
      component: cart,
    },
    {
      path: '/personal',
      name: '个人信息',
      component: personal,
    },
    {
      path: '/order',
      name: '个人订单',
      component: order,
    },
    {
      path: '/contact',
      name: '联系客服',
      component: contact,
    },
    {
      path: '/life',
      name: '品牌生活',
      component: lifeList,
    },
    {
      path: '/present',
      name: '超值礼品',
      component: lifePresent,
    },
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
      path: '/hot',
      name: '秒杀商品',
      component: listTime,
    },
    {
      path: '/detail',
      name: '商品详情',
      component: detail,
    },
    {
      path: '/sureOrder',
      name: '确认订单',
      component: sureOrder,
    },
    {
      path: '/choseLocation',
      name: '选择地址',
      component: choseLocation,
    },
    {
      path: '/addLocation',
      name: '添加新地址',
      component: addLocation,
    },
    {
      path: '/orderDetail',
      name: '订单详情',
      component: orderDetail,
    },
    {
      path: '/returnOrder',
      name: '退换货申请',
      component: returnOrder,
    },
    {
      path: '/changeOrder',
      name: '申请退款',
      component: changeOrder,
    },
    {
      path: '/orderTicket',
      name: '发票信息',
      component: orderTicket,
    },
    {
      path: '/pay',
      name: '支付订单',
      component: pay,
    },
    {
      path: '/success',
      name: '支付成功',
      component: paySc,
    },
    {
      path: '/pointHistory',
      name: '积分兑换记录',
      component: pointHistory,
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
  Vue.$vux.loading.hide()
  document.title = to.name
  next()
})
export default router;
