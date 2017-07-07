export default class AppConfig {
  install (Vue, options) {
    let basePath = 'http://123.57.157.212:9090'

    // 1. 添加全局方法或属性
    Vue.appConstant = () => {
      return {
        'appPath': ''
      }
    }
    Vue.myGlobalMethod = (url) => {
    }
    // 2. 添加全局资源
    Vue.directive('my-directive', {})
    // 3. 添加实例方法
    Vue.prototype.$Api = (url) => {
      // return window.location.origin + '/readapi?uri=' + url
      return basePath + url
    }
    Vue.prototype.$wxUri = (url) => {
      let bb = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+
        encodeURIComponent(url)+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      // let bb = appPath + url
      return appPath + '/?code=abc&status=123#!'+url
    }
  }
}