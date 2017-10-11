import Vue from 'vue'
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime());
const basePath = 'http://123.57.157.212:9090'
export default {
  get(params = {}) {
    return Vue.http.get(basePath + '/home/getCommendProdList', { params }).then(res => {
      // some handling
      return res.data
    })
  },
  // 登陆
  login(params = {}) {
    console.log(params)
    return Vue.http.post(basePath + '/login', params, { emulateJSON: true }).then(res => {
      // some handling
      return res.data
    })
  },
  // 判断秒杀
  getisByProd(params = {}) {
    console.log(params)
    return Vue.http.post(basePath + '/order/getisByProd', params, { emulateJSON: true }).then(res => {
      // some handling
      return res.data
    })
  },
  // 上传图片
  uploadImage(imageBase64,imageType) {
    var params={
      imageBase64:imageBase64,
      imageType:imageType
    }
    return Vue.http.post(basePath + '/order/uploadImage', params, { emulateJSON: true }).then(res => {
      // some handling
      return res.data
    })
  },
  // 查询记录
  insertProdSearch(token, params = {}) {
    // some handling
    return Vue.http({
      method: 'POST',
      url: basePath + '/home/insertProdSearch',
      params: params,
      headers: header('/home/insertProdSearch', token),
      emulateJSON: true
    }).then(res => {
      console.log('-------------')
      return res.data
    })
  },
  // 删除订单
  deleteOrder(token, params = {}) {
    // some handling
    return Vue.http({
      method: 'POST',
      url: basePath + '/order/deleteOrder',
      params: params,
      headers: header('/order/deleteOrder', token),
      emulateJSON: true
    }).then(res => {
      return res.data
    })
  },
  // 获取订单详情
  getOrderDetail(token,params = {}) {
    return Vue.http.get(basePath + '/order/getOrderDetail', {
      params: params,
      headers:header('/order/getOrderDetail', token)
    }).then(res => {
      return res.data
    })
  },
  // 获取退换货详情
  getProdReturnDetail(token,params = {}) {
    return Vue.http.get(basePath + '/order/getProdReturnDetail', {
      params: params,
      headers:header('/order/getProdReturnDetail', token)
    }).then(res => {
      return res.data
    })
  },
  // 获取查询结果
  searchProdList(params = {}) {
    return Vue.http.get(basePath + '/home/searchProdList', { params }).then(res => {
      // some handling
      return res.data
    })
  },
  // 获取超值礼品
  getProdListByCategory(params = {}) {
    return Vue.http.get(basePath + '/home/getProdListByCategory', { params }).then(res => {
      // some handling
      return res.data
    })
  },
  // 积分支付
  scorePay(token, params = {}) {
    // some handling
    return Vue.http({
      method: 'POST',
      url: basePath + '/order/scorePay',
      params: params,
      headers: header('/order/scorePay', token),
      emulateJSON: true
    }).then(res => {
      console.log('-------------')
      return res.data
    })
  },
  // 获取退换货原因列表
  getProdReturnReasonList() {
    return Vue.http.get(basePath + '/order/getProdReturnReasonList',).then(res => {
      // some handling
      return res.data
    })
  },
   // 获取精品推荐列表
  getCommendProdList(params = {}) {
    return Vue.http.get(basePath + '/home/getCommendProdList',{ params }).then(res => {
      // some handling
      return res.data
    })
  },
  // 订单退换货
  exchangeOrder(token, params = {}) {
    // some handling
    return Vue.http({
      method: 'POST',
      url: basePath + '/order/exchangeOrder',
      params: params,
      headers: header('/order/exchangeOrder', token),
      emulateJSON: true
    }).then(res => {
      console.log('-------------')
      return res.data
    })
  },
  // 获取微信支付订单信息
  unifiedorder(params = {}) {
    return Vue.http.get(basePath + '/wxpay/unifiedorder', { params }).then(res => {
      // some handling
      return res.data
    })
  },
  // 获取积分记录
  getPointList(token,params = {}) {
    return Vue.http.get(basePath + '/order/getPointList', {
      params: params,
      headers:header('/order/getPointList', token)
    }).then(res => {
      console.log('-------------')
      return res.data
    })
  },
  // 获取秒杀活动
  getSecKillTimeList() {
    return Vue.http.get(basePath + '/home/getSecKillTimeList').then(res => {
      // some handling
      return res.data
    })
  },
  // 获取秒杀商品
  getSecKillProdList(params = {}) {
    return Vue.http.get(basePath + '/home/getSecKillProdList',{ params }).then(res => {
      // some handling
      return res.data
    })
  },

  // ...
}

function header(url, token) {
  return {
    "token": token,
    "time": timer,
    "sign": md5(url + token + timer).toUpperCase(),
  }
}
