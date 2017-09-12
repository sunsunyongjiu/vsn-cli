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
  }


  // ...
}

function header(url, token) {
  return {
    "token": token,
    "time": timer,
    "sign": md5(url + token + timer).toUpperCase(),
  }
}
