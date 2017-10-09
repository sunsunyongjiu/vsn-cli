<template>
  <div class="vsn-wrap">
    <back title="退换货申请"></back>
    <div class="vsn-main">
      <div class="order-goods">
        <div class="order-person-title font-15">
          商品信息
        </div>
        <div class="order-goodsText">
          <div class="orders" v-for="(item,index) in order.prod" key='index'>
            <div class="orders-left">
              <img :src="item.pic">
            </div>
            <div class="orders-mid">
              <div class="font-16 df orders-mid-title" v-text="item.prod_name"></div>
              <div v-for="(attr , n) in item.attribute">
                <span v-text="attr.key"></span>:
                <span v-text="attr.value"></span>
              </div>
              <div class=" font-11">数量：x<span v-text="item.basket_count">1</span></div>
              <div class="orders-mid-bottom">
                <span v-if="order.sellType==0">￥</span>
                <span class="basicColor font-16" v-text="item.product_total_amout"></span>
                <span class="font-9" v-if="order.sellType==1">积分</span>
              </div>
            </div>
            <div class="order-line"></div>
          </div>
        </div>
      </div>
      <div class="order-goods">
        <div class="order-person-title font-15">
          服务类型
        </div>
        <div class="order-selectBox">
          <div class="order-selectBox-item font-13" :class="{'selecter-selected':returnOrder}" @click="returnOrder=true">我要退货<img src="../../assets/imgs/triangle.png" class="selecters-triangle"></div>
          <div class="order-selectBox-item font-13" :class="{'selecter-selected':!returnOrder}" @click="returnOrder=false">我要换货<img src="../../assets/imgs/triangle.png" class="selecters-triangle"></div>
        </div>
      </div>
      <div class="order-goods">
        <div class="order-person-title font-15">
          商品退回方式
        </div>
        <div class="order-selectBox">
          <div class="order-selectBox-item way-select font-13">上门自提</div>
          <div class="order-location">
            <div class="order-location-title">
              我的收件地址
            </div>
            <div class="order-location-text ">
              <div class="order-location-text-left" v-if="order.address">
                <div class="font-16 color-91 locationDetail">
                  <span v-text="order.address.RECEIVER"></span>
                  <span v-text="order.address.moble"></span>
                </div>
                <div class="font-14 color-91 locationDetail">
                  <span>
                {{order.address.province}}
                {{order.address.CITY}}
                {{order.address.area}}
                {{order.address.town}}
                {{order.address.subAdds}}
              </span>
                </div>
              </div>
              <div class="order-location-text-right" @click="goLocation">
                <img src="../../assets/imgs/edit.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submitBtn font-18 fff" @click="goChange()">
      保存
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav';
import Apis from '../../configers/Api'
export default {
  name: '',
  data() {
    return {
      order: {
        address: {
          RECEIVER: '',
          moble: ''
        }
      },
      returnOrder: false
    }
  },
  components: {
    back
  },
  methods: {
    init: function() {
      this.returnOrder=  this.$store.state.chosenReturnType
      Apis.getOrderDetail(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber, 'subItemId': this.$route.query.itemIid }).then(data => {
        console.log(data.data[0])
        this.order = data.data[0];
        this.order.prod.forEach(function(x) {
          x.attribute = JSON.parse(x.attribute)
        })
        if (this.$store.state.sessionAddr.CITY) {
          this.order.address = this.$store.state.sessionAddr;
          this.$store.dispatch({ type: 'setSessionAddr', data: {} });
        }
      })
    },
    goLocation: function() {
      this.$router.push({ path: '/choseLocation', query: { 'from': 'return', 'returnType': this.returnOrder ? 1 : 2 } })
    },
    goChange: function() {
      if (this.order.address!=null) {
        this.$router.push({ path: '/changeOrder', query: { 'subNumber': this.$route.query.subNumber, 'returnType': this.returnOrder ? 1 : 2, 'postType': 1, 'addrId': this.order.address.addrId, 'itemIid': this.$route.query.itemIid } })
      } else {
        this.$vux.toast.text('收件地址不能为空', 'middle')
      }

    }
  },
  mounted: function() {
    this.init()

  },
  watch: {
    returnOrder() {
      this.$store.dispatch({ type: 'setReturnType', data: this.returnOrder });
    }
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.order-person-title {
  .px2vw(margin-top, 10);
  opacity: 0.5;
  background: #292929;
  border-radius: 2px 2px 0 0;
  height: 8.5vw;
  font-size: 15px;
  padding-left: 5vw;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 15px;
  text-align: left;
  line-height: 8.5vw;
}

.order-goodsText {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
}

.order-selectBox {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  overflow: hidden;
  .px2vw(padding-bottom, 21);
  .order-selectBox-item {
    position: relative;
    .px2vw(width, 78);
    .px2vw(height, 20);
    .px2vw(line-height, 20);
    .px2vw(margin-left, 25);
    .px2vw(margin-top, 20);
    border: 1px solid #787878;
    color: #787878;
    float: left;
    .selecters-triangle {
      height: 70%;
      display: none;
    }
  }
  .way-select {
    border: 1px solid #1dafed;
    color: #1dafed
  }
  .order-location {
    .px2vw(width, 346);
    .px2vw(margin-left, 14.5);
    .px2vw(margin-top, 28);
    float: left;
    overflow: hidden;
    .order-location-title {
      width: 100%;
      border-bottom: 1px solid #4a4a4a;
      text-align: left;
      .px2vw(font-size, 13);
      .px2vw(padding-bottom, 7);
      color: #7a7a7a;
    }
    .order-location-text {
      .px2vw(height, 86);
      .px2vw(padding-top, 18);
      text-align: left;
      .order-location-text-left {
        float: left;
        .px2vw(width, 287);
        .locationDetail {
          .px2vw(line-height, 20);
          .px2vw(margin-top, 10);
        }
      }

      .order-location-text-right {
        float: left;
        .px2vw(width, 59);
        .px2vw(height, 17);
        box-sizing: border-box;
        .px2vw(margin-top, 34.5);
        .px2vw(padding-left, 17);
        height: 100%;
        img {
          .px2vw(width, 17);
          .px2vw(height, 17);
        }
      }
    }
  }
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
      max-width: 100%;
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
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: right;
  }
}

.submitBtn {
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  .px2vw(height, 55);
  .px2vw(line-height, 55);
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

</style>
