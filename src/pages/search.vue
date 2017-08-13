<template>
  <div class="index-page">
    <div class="searchBar">
      <div class="back" @click="goback"></div>
      <div class="seachBtn" @click="goSearch">
        <img src="../assets/imgs/search.png">
      </div>
      <input type="text" ref="serachBox" v-model="searchValue" :placeholder="searchValue">
    </div>
    <div class="search-box-ways">
      <div class="font-14 search-titles">兑换方式</div>
      <div class="selecters" :class="{'selecter-selected':selects.isPoint}" @click="changeWay('point')">
        积分
        <img src="../assets/imgs/triangle.png" class="selecters-triangle">
      </div>
      <div class="selecters" :class="{'selecter-selected':selects.isCash}" @click="changeWay('cash')">
        现金
        <img src="../assets/imgs/triangle.png" class="selecters-triangle">
      </div>
    </div>
    <div class="search-box-ways" v-if="searchHistoryShow">
      <div class="font-14 search-titles">历史搜索</div>
      <div>
        <div v-for="(item,index) in searchHistory" key="index" class="historyBox" v-text="item.search_str" @click="doSearchHistory(item.search_str)"></div>
      </div>
    </div>
    <div class="goodsList">
      <div v-for="(item,index) in  goodsList" class="goods" key="index" @click="goWhere(item.name,item)">
        <div class="goods-left">
          <img :src="item.pic">
        </div>
        <div class="goods-right">
          <div v-text="item.name" class="title"></div>
          <div class="right-point-box">
            <div v-if="item.sellType==0">
              <span class="font-10">￥</span>
              <span v-text="item.price" class="font-18 points"></span>
              <span class="font-9">.00</span>
            </div>
            <div v-if="item.sellType==1">
              <span v-text="item.point" class="font-16 points"></span>
              <span class="font-9 color-9b">积分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myNav from '../components/nav'
import { Search } from 'vux'
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  data() {
    return {
      autoFixed: false,
      goodsList: [],
      placeholder: '请搜索',
      searchValue: '',
      searchHistory: '',
      isLogin: this.$store.state.loginUser["ucid"] != undefined,
      value: '',
      selects: {
        isPoint: false,
        isCash: false
      },
      searchHistoryShow: true,
    }
  },
  components: {
    myNav,
    Search
  },
  methods: {
    // 点击历史搜索触发搜索
    doSearchHistory: function(str) {
      // 把历史值赋予搜索条件
      this.searchValue = str
      // 触发搜索事件
      this.goSearch()
    },
    init: function() {
      // 判断是否登录
      if (this.isLogin) {
        // 设定header

        let header = {
          headers: {
            "token": this.$store.state.loginUser.token,
            "time": timer,
            "sign": md5("/home/getProdSearchList" + this.$store.state.loginUser.token + timer).toUpperCase()
          }
        }
        // 获取历史搜索
        this.$http.get(this.$Api('/home/getProdSearchList'), header).then((response) => {
          this.searchHistory = response.data.data

        }, (response) => {
          // error callback
        });
      }
      this.$refs.serachBox.focus()
      this.placeholder = this.$route.query.search

    },
    // 前往详情页
    goWhere: function(title, item) {
      this.$router.push({ path: 'detail', query: { 'title': title, 'prod_id': item.prod_id } })

      // this.$router.push({path: 'detail', query: { 'title': title}})
    },
    // 点击返回跳转路由
    goback: function() {
      this.$router.go(-1)
    },
    // 切换搜索兑换方式
    changeWay: function(n) {
      if (n == "point") {
        this.selects.isPoint = !this.selects.isPoint
      } else {
        this.selects.isCash = !this.selects.isCash
      }
    },
    // 前往查询
    goSearch: function() {
      if (this.isLogin) {

        let header = {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/home/insertProdSearch" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
        // 设置传值
        let cartData = {
          'searchStr': this.searchValue
        }
        // 将搜索结果加入搜索历史
        this.$http({
          method: 'POST',
          url: this.$Api('/home/insertProdSearch'),
          params: cartData,
          headers: header,
          emulateJSON: true
        }).then(function(data) {

        }, function(error) {
          //error
        })
      }
      let isPoint = this.selects.isPoint ? 1 : 0
      let isCash = this.selects.isCash ? 1 : 0
      // 查询
      this.$http.get(this.$Api('/home/searchProdList'), { params: { 'searchStr': this.searchValue, 'isPoint': isPoint, 'isCash': isCash } }).then((response) => {

        this.goodsList = response.data.data
        this.searchHistoryShow = false
      }, (response) => {
        // error callback
      });
    },
  },
  mounted: function() {

    this.init()
  },
  computed: {

  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
input:focus {
  outline: none;
}

.searchBar {
  height: 9.3vw;
  height: 100%;
  background: none;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
  position: relative;
  input {
    background: #4a4a4a !important;
    border: none;
    color: #fff;
    width: 85%;
    float: right;
    border-radius: 2px 0 0 2px;
    height: 6.4vw;
    font-size: 16px;
    padding-left: 2vw;
    box-sizing: border-box;
  }
  .seachBtn {
    float: right;
    line-height: 6.4vw;
    height: 6.4vw;
    background: #4a4a4a;
    border-radius: 0 2px 2px 0;
    color: white;
    padding-right: 5px;
  }
}

.back {
  color: #fff;
  position: absolute;
  left: 2vw;
  top: 3.6vw;
  height: 3vw;
  width: 3vw;
  border-left: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(-45deg);
}

.search-titles {
  line-height: 20px;
  width: 100px;
  text-align: left;
  font-size: 14px;
  color: #1dafed;
  letter-spacing: 0;
}

.index-page {
  padding: 0 5vw;
}

.search-box-ways {
  overflow: hidden;
  margin-top: 5vw;
  .selecters {
    float: left;
    width: 20.8vw;
    height: 5.3vw;
    line-height: 5.3vw;
    border: 1px solid #787878;
    color: #787878;
    font-size: 13px;
    margin-top: 3vw;
    margin-right: 3vw;
    position: relative;
    .selecters-triangle {
      height: 90%;
      display: none;
    }
  }
}

.selecter-selected {
  border: 1px solid #1dafed !important;
  color: #1dafed !important;
  .selecters-triangle {
    display: block !important;
    position: absolute;
    right: -1px;
    top: -1px;
  }
}

.goodsList {
  width: 100%;
  overflow: hidden;
  .goods {
    margin-top: 5vw;
    height: 23vw;
    padding-bottom: 5vw;
    border-bottom: 1px solid rgba(74, 74, 74, 0.3);
    .goods-left {
      float: left;
      height: 100%;
      width: 23vw;
      background: #292929;
      border-radius: 2px;
      box-sizing: border-box;
      padding: 2vw;
      img {
        height: 100%;
        max-width: 100%;
      }
    }
    .goods-right {
      float: left;
      width: 67vw;
      padding-left: 3vw;
      box-sizing: border-box;
      text-align: left;
      position: relative;
      height: 100%;
      .title {
        font-size: 16px;
        color: #dfdfdf;
        letter-spacing: 0;
        line-height: 20px;
      }
      .right-point-box {
        position: absolute;
        bottom: 0
      }
    }
  }
}

.points {
  color: #1dafed;
  letter-spacing: 0;
}

.historyBox {
  height: 5.8vw;
  background: #292929;
  font-size: 14px;
  line-height: 5.8vw;
  color: #787878;
  padding: 0 4vw;
  float: left;
  margin: 5vw 5vw 5vw 0vw
}

</style>
