import Vue from 'vue'
const basePath = 'http://123.57.157.212:9090'
export default {
    get (params = {}) {
      return Vue.http.get(basePath+'/home/getCommendProdList', { params }).then(res => {
        // some handling
        return res.data
      })
    },

    login (params = {}){
    	console.log(params)
    	return Vue.http.post(basePath+'/login', params, { emulateJSON: true }).then(res => {
        // some handling
        return res.data
      })
    }
    
    // ...
}