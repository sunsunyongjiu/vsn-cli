<template>
  <div>
    <back title="我的订单"></back>
    <div>
      <tab :line-width="1" custom-bar-width="60px" defaultColor="#787878" active-color="white" style="background:#181818">
        <tab-item selected @on-item-click="changeItem">未支付</tab-item>
        <tab-item @on-item-click="changeItem">已支付</tab-item>
        <tab-item @on-item-click="changeItem">已完成</tab-item>
        <tab-item @on-item-click="changeItem">已取消</tab-item>
        <tab-item @on-item-click="changeItem">退换货</tab-item>
      </tab>
    </div>
    <div>
      <div class="orderList">
        <div class="orders" v-for="(item,index) in orders" key='index' @click="goDetail(item.text)">
          <div class="orders-left">
            <img :src="item.img">
          </div>
          <div class="orders-mid">
            <div class="font-16 df orders-mid-title" v-text="item.title"></div>
            <div v-text="item.size"></div>
            <div>数量：x<span v-text="item.count">1</span></div>
            <div class="orders-mid-bottom">
              <span class="basicColor font-16" v-text="item.point"></span>
              <span class="font-9">积分</span>
            </div>
          </div>
          <div class="orders-right" v-text="item.text">
          </div>
          <div class="order-line"></div>
        </div>
        <div>
          <div class="order-btns">
            <div class="left">
              共2件商品 小计:
              <span class="font-14 basicColor">12000</span>
              <span class="font-9 color-9b">积分</span>
            </div>
            <div v-if="btnsShow">
              <div class="order-btns-goChange" v-text="changeText">去兑换</div>
              <div class="order-btns-goChange" v-text="returnText" v-if="returnShow">退换货</div>
              <div class="order-btns-cancle" v-text="cancleText" v-else="returnShow">取消订单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../components/backNav'
import { Tab, TabItem } from 'vux'
export default {
  name: '',
  data() {
    return {
      orders: [{
          img: require('../assets/imgs/goods.png'),
          title: '罗马手表111111111111111111111',
          size: "颜色:贵族金",
          point: 6000,
          text: '等待兑换',
          count: 1
        },
        {
          img: require('../assets/imgs/goods.png'),
          title: '罗马手表111111111111111111111',
          size: "颜色:贵族金",
          point: 6000,
          text: '等待兑换',
          count: 1
        }
      ],
      cancleText: '取消订单',
      changeText: '去兑换',
      returnText: '退换货',
      returnShow: false,
      btnsShow: true
    }
  },
  components: {
    back,
    Tab,
    TabItem
  },
  methods: {
    changeItem: function(index) {
      let _this = this
      _this.btnsShow = true
      this.orders.forEach(function(n, m) {
        if (index == 0) {
          n.text = "等待兑换"
          _this.returnShow = false

        } else if (index == 1) {
          n.text = "已兑换"
          _this.returnShow = true
          _this.changeText = '确认收货'
        } else if (index == 2) {
          n.text = "交易成功"
          _this.btnsShow = false
        } else if (index == 3) {

          n.text = "交易关闭"
          _this.btnsShow = false
        } else {
          n.text = ""
        }
      })
    },
    goDetail:function(n){
        this.$router.push({ path: '/orderDetail', query: { 'title': n } })
    }
  },
  mounted: function() {


  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.vux-tab .vux-tab-item {
  background: none
}

.orders {
  width: 92.6vw;
  margin: 0 auto;
  height: 33.6vw;
  box-sizing: border-box;
  padding-top: 5.06vw;
  padding-bottom: 5.06vw;
  position: relative;
  background: #181818;
  .orders-left {
    width: 22.6vw;
    height: 22.6vw;
    float: left;
    background: #292929;
    border-radius: 2px;
    margin-left: 2.6vw;
    img {
      height: 100%;
    }
  }
  .orders-mid {
    width: 46.6vw;
    float: left;
    text-align: left;
    box-sizing: border-box;
    padding-left: 2.4vw;
    font-size: 11px;
    color: #929292;
    letter-spacing: 0;
    text-align: left;
    position: relative;
    height: 100%;
    .orders-mid-title {
      overflow: hidden;
      /*超出部分隐藏*/
      white-space: nowrap;
      /*不换行*/
      text-overflow: ellipsis;
      /*超出部分文字以...显示*/
      margin-bottom: 2vw;
    }
    .orders-mid-bottom {
      position: absolute;
      bottom: 0
    }
  }
  .orders-right {
    width: 20.8vw;
    float: left;
    font-family: HYa3gj;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: right;
  }
}

.order-line {
  opacity: 0.3;
  width: 100%;
  height: 1px;
  background:#4a4a4a;
  /*background: green;*/
  clear: both;
  position: absolute;
  bottom: 0
}

.orderList {
  width: 92.6vw;
  margin: 0 auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0 0;
}

.order-btns {
  height: 5.8vw;
  padding: 2.4vw 0 3.7vw;
  line-height: 5.8vw;
  div {
    font-family: HYa3gj;
    font-size: 12px;
    color: #dfdfdf;
    letter-spacing: 0;
    text-align: right;
  }
  .left {
    float: left;
  }
  .order-btns-goChange,
  .order-btns-cancle {
    float: right;

    width: 15.4vw;
    margin-left: 2.6vw;
    line-height: 5.8vw;
    box-sizing: border-box;
    text-align: center;
  }
  .order-btns-cancle {
    border: #737373 1px solid;
    color: #737373;
  }
  .order-btns-goChange {
    border: 1px solid #1dafed;
    color: #1dafed
  }
}

</style>
