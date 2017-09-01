<template>
  <div>
    <back title="订单详情"></back>
    <div class="paddingBottom" v-for="(items , key) in orderDetail" key="key">
      <div class="order-state">
        <div style="margin-bottom:2vw;">
          {{items.status|changeStatus}}
        </div>
        <div class="font-12" v-if='timeShow'>剩<span class="basicColor">29分20秒</span>自动关闭</div>
      </div>
      <!--       <div class="order-info" v-if="items.sellType==1">
        {{items.sellType}}
        <div class="order-person-title">
          订单信息
        </div>
        <div class="order-infoText">
          <div class="font-14 color-91">
            下单时间：<span v-text="items.sub_date"></span>
          </div>
          <div class="font-14 color-91">
            订单编号：<span v-text="items.sub_number"></span>
          </div>
        </div>
      </div> -->
      <div class="order-person">
        <div class="order-person-title font-15">
          收货人信息
        </div>
        <div class="order-personText">
          <div class="font-16 color-91">
            <span v-text="items.address.RECEIVER"></span>
            <span v-text="items.address.moble"></span>
          </div>
          <div class="font-14 color-91">
            <span>
              {{items.address.province}}
              {{items.address.CITY}}
              {{items.address.area}}
              {{items.address.town}}
              {{items.address.subAdds}}
            </span>
          </div>
        </div>
      </div>
      <div class="order-goods">
        <div class="order-person-title font-15">
          商品信息
        </div>
        <div class="order-goodsText">
          <div class="orders" v-for="(item,index) in items.prod" key='index' @click="goDetail(item.text)">
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
                <span v-if="items.sellType==0">￥</span>
                <span class="basicColor font-16" v-text="item.product_total_amout" v-if="items.sellType==1"></span>
                <span class="font-9" v-if="items.sellType==1">积分</span>
              </div>
            </div>
            <div class="order-line"></div>
          </div>
          <div class="order-fee">
            <div class="order-fee-first font-11">
              <div class="order-fee-first-left">运费</div>
              <div class="order-fee-first-right">￥<span v-text="items.freight_amount"></span></div>
            </div>
            <div class="order-fee-second font-11">
              <div class="order-fee-first-left">实付款（含运费）</div>
              <div class="order-fee-first-right">
                <span v-if="items.sellType==0">￥</span>
                <span class="font-18 basicColor" v-text="items.actual_total"></span>
                <span v-if="items.sellType==1">积分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-info">
        <div class="order-person-title font-15">
          订单信息
        </div>
        <div class="order-infoText">
          <div class="font-14 color-91">
            下单时间：<span v-text="items.sub_date"></span>
          </div>
          <div class="font-14 color-91">
            订单编号：<span v-text="items.sub_number"></span>
          </div>
        </div>
      </div>
      <div class="order-info" v-if="(items.status==3||items.status==2)&&(items.orderTrack!=null)">
        <div class="order-person-title">
          物流信息
        </div>
        <div class="order-infoText">
          <div v-for="item in items.orderTrack" class="sendMsgBox">
            <div class="sendMsgBoxItem">
              <div v-text="item.content" class="font-13"></div>
              <div v-text="item.msgTime" class="font-11"></div>
            </div>
          </div>
        </div>
      </div>
      <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm(items)">
        <p style="text-align:center;margin-bottom:10px;color:#737373" v-text="conifrmText"></p>
        <p style="text-align:left;color:#737373" v-text="conifrmShowText"></p>
      </confirm>
      <div class="bottom-btn">
        <div class="bottom-btn-right font-16" v-if='buyBtShow' @click="buyAgain(items.prod[0].prod_id)">
          再次购买
        </div>
        <div class="bottom-btn-right font-16" v-if='blueShow' v-text="blueText" @click="goPay(items)">
          立即支付
        </div>
        <div class="bottom-btn-left font-16" v-text="btnCancle" v-if="greyShow" @click="cancleOrder(items)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime());
import { Confirm } from 'vux'
export default {
  name: '',
  data() {
    return {
      orders: [{
        img: require('../../assets/imgs/goods.png'),
        title: '罗马手表111111111111111111111',
        size: "颜色:贵族金",
        point: 6000,
        text: '等待兑换',
        count: 1,

      }],
      conifrmText: '确认删除订单',
      conifrmShowText: '确认删除选中的订单吗？',
      orderDetail: {},
      timeShow: true,
      order: {
        state: "等待付款"
      },
      btnCancle: '取消订单',
      blueText: '立即兑换',
      blueShow: true,
      greyShow: true,
      show: false,
      buyBtShow:false
    }
  },
  components: {
    back,
    Confirm
  },
  methods: {
    goPay: function(item) {
      if (this.blueText == "立即兑换") {
        this.$router.push({ path: '/pay' })
      } else if (this.blueText == "申请发票") {
        this.$router.push({ path: '/orderTicket', query: { 'subNumber': item.sub_number } })
      } else if (this.blueText == "确认收货") {
        this.conifrmText = "确认收货么？",
          this.conifrmShowText = "是否确认收货"
        this.show = true;
      }

    },
    buyAgain: function(num) {
      console.log(num)
      this.$router.push({ path: 'detail', query: { prod_id: num } })
    },
    onCancel: function() {

    },
    onConfirm: function(items) {
      if (this.blueText == "确认收货") {
        this.$vux.loading.show({
          text: 'loading'
        })
        let header = {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/order/finishOrder" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
        // 设置传值
        let cartData = {
          subNumber: items.sub_number,
        }

        this.$http({
          method: 'POST',
          url: this.$Api('/order/finishOrder'),
          params: cartData,
          headers: header,
          emulateJSON: true
        }).then(function(data) {
          this.$vux.loading.hide()
          this.$router.go(-1)
        }, function(error) {
          //error
        })
      } else if (this.btnCancle == "申请退换货") {
        this.$vux.loading.show({
          text: 'loading'
        })
        let header = {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/order/exchangeOrder" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
        // 设置传值
        let cartData = {
          subNumber: items.sub_number,
        }

        this.$http({
          method: 'POST',
          url: this.$Api('/order/exchangeOrder'),
          params: cartData,
          headers: header,
          emulateJSON: true
        }).then(function(data) {
          this.$vux.loading.hide()
          this.$router.go(-1)
        }, function(error) {
          //error
        })
      } else {
        this.$vux.loading.show({
          text: 'loading'
        })

        let header = {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/order/cancelOrder" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
        // 设置传值
        let cartData = {
          subNumber: items.sub_number,
        }

        this.$http({
          method: 'POST',
          url: this.$Api('/order/cancelOrder'),
          params: cartData,
          headers: header,
          emulateJSON: true
        }).then(function(data) {
          this.$vux.loading.hide()
          this.$router.go(-1)
        }, function(error) {
          //error
        })
      }


    },
    cancleOrder: function(item) {
      if (this.btnCancle == "取消订单") {
        this.show = true
      } else if (this.btnCancle == "申请退换货") {
        this.conifrmText = "确认退换么？",
          this.conifrmShowText = "是否确认退换"
        this.show = true;

      }

    },
    init: function() {
      this.$http.get(this.$Api('/order/getOrderDetail'), {
        params: { 'subNumber': this.$route.query.sub_number },
        headers: {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/order/getOrderDetail" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
      }).then((response) => {
        console.log(response.data.data[0])
        console.log(response.data.data[0].orderTrack)
        this.orderDetail = response.data.data
        this.orderDetail.forEach(function(n) {
          n.totalCount = 0
          n.prod.forEach(function(x) {
            x.attribute = JSON.parse(x.attribute)
            n.totalCount += x.basket_count
          })
        })

        if (response.data.data[0].status == 1) {

        } else if (response.data.data[0].status == 2 || response.data.data[0].status == 3) {

          this.blueShow = true;
          this.blueText = "确认收货"
          this.greyShow = false
        } else if (response.data.data[0].status == 4) {
          if (this.orderDetail[0].invoice_sub_id) {
            this.greyShow = false
          } else {
            this.greyShow = true
          }
          this.blueShow = true
          this.timeShow = false
          this.buyBtShow = true
          this.btnCancle = '申请退换货'
          this.blueText = "申请发票"
        } else if (response.data.data[0].status == 5) {
          this.blueShow = false
          this.timeShow = false
          this.greyShow = false
        } else {
          this.blueShow = true;
          this.greyShow = false;
          this.blueText = "申请发票"
        }
      }, (response) => {
        // error callback
      });


    }
  },
  filters: {
    changeStatus: function(n) {
      if (n === 1) {
        return '等待兑换'
      } else if (n === 2) {
        return '已兑换'
      } else if (n === 3) {
        return '已兑换'
      } else if (n === 4) {
        return '交易成功'
      } else if (n === 5) {
        return '交易关闭'
      } else {
        return '退换货'
      }
    }
  },
  mounted: function() {
    this.init()


  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.order-state {
  width: 100%;
  height: 22.4vw;
  text-align: left;
  padding-left: 5vw;
  padding-top: 5.06vw;
  box-sizing: border-box;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0;
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.50);
}

.order-person-title {
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

.order-personText {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  height: 24vw;
  padding-left: 5vw;
  text-align: left;
  .px2vw(line-height, 20)
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

.order-line {
  opacity: 0.3;
  width: 100%;
  height: 1px;
  /*background:#4a4a4a;*/
  background: #4a4a4a;
  clear: both;
  position: absolute;
  bottom: 0
}

.order-fee {
  width: 100%;
  clear: both;
  padding-top: 4.5vw;
  padding-bottom: 5vw;
  height: 17.6vw;

  padding-left: 5vw;
  padding-right: 3vw;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0;
  .order-fee-first {
    text-align: left;
    overflow: hidden;
    font-size: 11px;
    color: #dfdfdf;
    margin-bottom: 1.5vw;
  }
  .order-fee-second {
    font-size: 12px;
    color: #dfdfdf;
  }
  .order-fee-first-left {
    float: left;
  }
  .order-fee-first-right {
    float: right;
  }
}

.order-person,
.order-goods {
  margin-bottom: 5vw;
}

.order-info {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 5vw;
  .order-infoText {
    padding-top: 5vw;
    padding-bottom: 5vw;
    text-align: left;
    padding-left: 5vw;
    .px2vw(line-height, 20);
  }
}

.bottom-btn {
  position: absolute;
  bottom: 0;
  background: #292929;
  box-shadow: 7px 12px 8px 11px rgba(0, 0, 0, 0.58);
  width: 100%;
  height: 14.9vw;
  div {
    border-radius: 0 1px 1px 1px;
    width: 26.1vw;
    height: 9vw;
    box-sizing: border-box;
    line-height: 9vw;
    margin-top: 2.85vw;
  }
  .bottom-btn-left {
    float: right;
    border: 1px solid #919191;
    border-radius: 0 1px 1px 1px;

    margin-right: 5vw;
    font-size: 16px;
    color: #919191;
  }
  .bottom-btn-right {
    float: right;
    background: #1dafed;
    margin-right: 5vw;
    border-radius: 0 1px 1px 1px;
    font-size: 16px;
    color: #ffffff;
  }
}

.sendMsgBox {
  .px2vw(padding-left, 18);
  .px2vw(padding-right, 18);
  border-left: 2px solid #292929;
  .sendMsgBoxItem {
    box-sizing: border-box;
    .px2vw(padding-top, 12);
    .px2vw(padding-bottom, 12);
    position: relative;
    border-top: 1px solid #4a4a4a;
    border-bottom: 1px solid #4a4a4a;
    color: #919191;
  }
  .sendMsgBoxItem:before{
    display: block;
    content: '';
    width:1.5vw;
    height: 1.5vw;
    border-radius: 100%;
    background: #919191;
    position: absolute;
    .px2vw(left, -21);
  }
}

.sendMsgBox:nth-child(1) {
  .sendMsgBoxItem {
    border-top: 0px;
    color: #1dafed;
    &:before{
      width:2vw;
      height: 2vw;
      border: 2px solid #1dafed;
      .px2vw(left, -25);
      background:#181818;

    }
  }
}

</style>
