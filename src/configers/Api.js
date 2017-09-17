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
      console.log('-------------')
      return res.data
    })
  },
  // 获取订单详情
  getOrderDetail(token,params = {}) {
    return Vue.http.get(basePath + '/order/getOrderDetail', {
      params: params,
      headers:header('/order/getOrderDetail', token)
    }).then(res => {
      console.log('-------------')
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
    return Vue.http.get(basePath + '/unifiedorder', { params }).then(res => {
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


  // ...
}

function header(url, token) {
  return {
    "token": token,
    "time": timer,
    "sign": md5(url + token + timer).toUpperCase(),
  }
}
