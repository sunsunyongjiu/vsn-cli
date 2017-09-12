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

  login(params = {}) {
    console.log(params)
    return Vue.http.post(basePath + '/login', params, { emulateJSON: true }).then(res => {
      // some handling
      return res.data
    })
  },

  deleteOrder(token, params = {}) {
    // some handling
    return Vue.http({
      method: 'POST',
      url: basePath + '/order/deleteOrder',
      params: params,
      headers: header('/order/deleteOrder',token),
      emulateJSON: true
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
