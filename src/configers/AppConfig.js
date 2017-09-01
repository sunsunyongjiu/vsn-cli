export default class AppConfig {
  install(Vue, options) {
    let basePath = 'http://123.57.157.212:9090'
    // 1. 添加全局方法或属性
    Vue.appConstant = () => {
      return {
        'appPath': ''
      }
    }
    Vue.myGlobalMethod = (url) => {}
    // 2. 添加全局资源
    Vue.directive('my-directive', {})
    // 3. 添加实例方法
    Vue.prototype.$Api = (url) => {
      // return window.location.origin + '/readapi?uri=' + url
      return basePath + url
    }
    Vue.prototype.$wxUri = (url) => {
      let bb = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      // let bb = appPath + url
      return appPath + '/?code=abc&status=123#!' + url
    };
    // base64转码
    Vue.prototype.$baseEncode = (str) => {
      var c1, c2, c3;
      var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var i = 0,
        len = str.length,
        string = '';

      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          string += base64EncodeChars.charAt(c1 >> 2);
          string += base64EncodeChars.charAt((c1 & 0x3) << 4);
          string += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          string += base64EncodeChars.charAt(c1 >> 2);
          string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          string += base64EncodeChars.charAt((c2 & 0xF) << 2);
          string += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F)
      }
      return string
    };
    // base64解码
    Vue.prototype.$baseDecode = (str) => {
      var c1, c2, c3, c4;
      var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
        58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
      );
      var i = 0,
        len = str.length,
        string = '';

      while (i < len) {
        do {
          c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (
          i < len && c1 == -1
        );

        if (c1 == -1) break;

        do {
          c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (
          i < len && c2 == -1
        );

        if (c2 == -1) break;

        string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
          c3 = str.charCodeAt(i++) & 0xff;
          if (c3 == 61)
            return string;

          c3 = base64DecodeChars[c3]
        } while (
          i < len && c3 == -1
        );

        if (c3 == -1) break;

        string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
          c4 = str.charCodeAt(i++) & 0xff;
          if (c4 == 61) return string;
          c4 = base64DecodeChars[c4]
        } while (
          i < len && c4 == -1
        );

        if (c4 == -1) break;

        string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
      }
      return string;
    }
  }
}
