<template>
  <div class='vsn-wrap'>
    <!--<div class="vsn-header">
      <back title="订单详情"></back>
    </div> -->
    <div class="vsn-main">
      <div class="paddingBottom" v-for="(items , key) in orderDetail" key="key">
        <div class="order-state">
          <div style="margin-bottom:2vw;">
            <div class="status font-18" style="margin-bottom:2vw">{{items.status,items.sellType|changeStatus}}</div>
            <div class="font-10" v-if="items.status==1">订单将在
              <count-down :endTime="endTimeNum" :callback="callback" class="font-11 basicColor"></count-down>后被取消</div>
          </div>
          <!-- <div class="font-12" v-if='timeShow'>剩<span class="basicColor">29分20秒</span>自动关闭</div> -->
        </div>
        <div class="order-person" v-if="items.address">
          <div class="order-person-title font-15">
            收货人信息
          </div>
          <div class="order-personText">
            <div class="font-16 color-91">
              <span v-text="items.address.RECEIVER" style="margin-right:5vw"></span>
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
            <div class="orders" v-for="(item,index) in items.prod" key='index'>
              <div class="orders-left" @click="goWhere('',item)">
                <img :src="item.pic">
              </div>
              <div class="orders-mid" @click="goWhere('',item)">
                <div class="font-16 df orders-mid-title" v-text="item.prod_name"></div>
                <div v-for="(attr , n) in item.attribute">
                  <span v-text="attr.key"></span>:
                  <span v-text="attr.value"></span>
                </div>
                <div class=" font-11">数量：x<span v-text="item.basket_count">1</span></div>
                <div class="orders-mid-bottom">
                  <span v-if="items.sellType==0">￥</span>
                  <span class="basicColor font-16" v-text="item.product_total_amout"></span>
                  <span class="font-9" v-if="items.sellType==1">积分</span>
                </div>
              </div>
              <div class="tuihuan-box">
                <div class="tuihuan font-14" v-if="item.isShowReturnButton" @click="goReturn(items,item.sub_item_id,item.isReturnButtonEnable)" :class="{'greyBtn':!item.isReturnButtonEnable}">
                  退换货
                </div>
                <div class="tuihuan font-14" v-if="item.isShowTrackButton" @click="goTrack(items,item.sub_item_id,item.isTrackButtonEnable)" :class="{'greyBtn':!item.isTrackButtonEnable}">
                  查看物流
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
                  <span class="font-18 basicColor" v-text="items.total"></span>
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
        <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm(items)" confirm-text="是" cancel-text="否">
          <div style="height:100%;color:#737373;line-height:1;text-align:center;" class="confirmBox font-18">
            <img src="../../assets/imgs/tanhao.png" class="confirm-tanhao">
            <div class="confirm-text" v-text="conifrmText">确定支付吗？?</div>
          </div>
        </confirm>
      </div>
    </div>
    <div class="vsn-footer" v-for="(items , key) in orderDetail" key="key">
      <div class="bottom-btn" v-if='orderDetail[0].status==1 || orderDetail[0].status==2 || orderDetail[0].status==3 || (orderDetail[0].status==4 && items.isShowInvoiceButton>0) || orderDetail[0].status==5'>
        <!--
          <div class="bottom-btn-right font-16" v-if='orderDetail[0].status==4||orderDetail[0].status==5' @click="buyAgain(items.prod[0].prod_id)">
          {{items.sellType==0?'再次购买':'再次兑换'}}
        </div>
        -->
        <div class="bottom-btn-right font-16" v-if='orderDetail[0].status==1' @click="goPay(items)">
          {{items.sellType==0?'去支付':'去兑换'}}
        </div>
        <div class="bottom-btn-right font-16" v-if='items.isShowInvoiceButton>0' @click="goTicket(items,items.isInvoiceButtonEnable)" :class="{'greyBtn':(!items.isInvoiceButtonEnable||orderDetail[0].invoice_sub_id)}">
          {{orderDetail[0].invoice_sub_id?'已开具发票':'申请发票'}}
        </div>
        <div class="bottom-btn-right font-16" v-if='orderDetail[0].status==2||orderDetail[0].status==3' @click="goCheck(items)">
          确认收货
        </div>
        <div class="bottom-btn-right font-16" v-if="orderDetail[0].status==1" @click="cancleOrder(items)">
          取消订单
        </div>
        <div class="bottom-btn-right font-16" @click="delOrder(items)" v-if="orderDetail[0].status==5 && orderDetail[0].delete_status!=1">
          删除订单
        </div>
      </div>
    </div>
    <div class="toast-mubu" v-if="mubuShow">
      <!-- <div class="toast-mubu" v-if="true"> -->
      <div class="mubu-textBox">
        <div class="mubu-text font-14"><img src="../../assets/imgs/tanhao.png" class="confirm-tanhao">您的订单未在规定时间内支付，已取消，点击查看</div>
        <div @click="goList()" class="mubuSureBtn font-15">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import md5 from 'js-md5';
import Apis from '../../configers/Api'
import countDown from '../../components/time'
const timer = JSON.stringify(new Date().getTime());
import { Confirm, ViewBox } from 'vux'
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
      conifrmText: '确认删除该订单吗?',
      conifrmShowText: '确认删除选中的订单吗？',
      orderDetail: {},
      timeShow: true,
      endTimeNum: '1507721140000',
      order: {
        state: "等待付款"
      },


      show: false,
      cancleShow: false,
      mubuShow: false
    }
  },
  components: {
    back,
    Confirm,
    ViewBox,
    countDown
  },
  methods: {
    goWhere: function(title, item) {
      if (item.prodStatus != 1) {
        this.$vux.toast.text('商品已下架', 'middle')
        return
      }
      this.$router.push({ path: 'detail', query: { 'prod_id': item.prod_id } })

      // this.$router.push({path: 'detail', query: { 'title': title}})
    },
    callback: function() {
      this.mubuShow = true;
    },
    goReturn: function(item, itemIid, isEnable) {
      if (isEnable == 0) {
        return
      } else {
        this.$router.push({ path: '/returnOrder', query: { 'subNumber': item.sub_number, 'itemIid': itemIid } })
      }

    },
    goTrack: function(item, itemIid, isEnable) {
      if (isEnable == 0) {
        return
      } else {
        this.$router.push({ path: '/trackDetail', query: { 'subNumber': item.sub_number, 'itemIid': itemIid } })
      }
    },
    goPay: function(item) {

      this.$router.replace({ path: '/pay', query: { 'subNumber': item.sub_number } })


    },
    goTicket: function(item, isEnable) {
      if (isEnable == 0) {
        return
      } else {
        this.$router.push({ path: '/orderTicket', query: { 'subNumber': item.sub_number } })
      }

    },
    goCheck: function(item) {
      this.conifrmText = "确认收货吗？";
      this.conifrmShowText = "是否确认收货"
      this.show = true;
    },
    buyAgain: function(num) {
      console.log(num)
      this.$router.push({ path: 'detail', query: { prod_id: num } })
    },
    onCancel: function() {

    },
    goList: function() {
      this.$store.dispatch({ type: 'setlistIndex', data: 3 })
      this.$router.replace({ path: 'order' })
    },
    onConfirm: function(items) {
      if (this.conifrmText == "确认收货吗？") {
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
      } else if (this.conifrmText == "确认删除该订单吗？") {
        Apis.deleteOrder(this.$store.state.loginUser.token, { 'subNumber': items.sub_number }).then(data => {
          this.$vux.loading.hide()
          this.$router.go(-1)
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
      this.conifrmText = "确认取消该订单吗？"
      this.show = true

    },
    delOrder: function(item) {
      console.log(item)
      this.conifrmText = "确认删除该订单吗？",
        this.conifrmShowText = "是否确认删除"
      this.show = true;

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
        this.endTimeNum = new Date(response.data.data[0].end_date).getTime()
        this.orderDetail = response.data.data
        this.orderDetail.forEach(function(n) {
          n.totalCount = 0
          n.prod.forEach(function(x) {
            x.attribute = JSON.parse(x.attribute)
            n.totalCount += x.basket_count
          })
        })

      }, (response) => {
        // error callback
      });

    }
  },
  filters: {
    changeStatus: function(n, sellType) {
      if (parseInt(sellType) === 1) {
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

      if (parseInt(sellType) === 0) {
        if (n === 1) {
          return '等待支付'
        } else if (n === 2) {
          return '已支付'
        } else if (n === 3) {
          return '已支付'
        } else if (n === 4) {
          return '交易成功'
        } else if (n === 5) {
          return '交易关闭'
        } else {
          return '退换货'
        }
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
.order-goodsText {
  overflow: hidden;
}

.order-state {
  width: 100vw;
  height: 22.4vw;
  text-align: left;
  padding-left: 5vw;
  display: table-cell;
  vertical-align: middle;
  background: url(../../assets/imgs/time_back.png) no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: #ffffff;
  letter-spacing: 0;
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.50);
  position: relative;
}

.order-person-title {
  background: rgba(41, 41, 41, 0.5);
  ;
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
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
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

.vsn-footer {
  height: 14.9vw;
}

.bottom-btn {
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
  .sendMsgBoxItem:before {
    display: block;
    content: '';
    width: 1.5vw;
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
    &:before {
      width: 2vw;
      height: 2vw;
      border: 2px solid #1dafed;
      .px2vw(left, -25);
      background: #181818;
    }
  }
}

.tuihuan {
  float: right;
  border: 1px solid #1dafed;
  .px2vw(margin-left, 6);
  color: #1dafed;
  padding: 1vw
}

.tuihuan-box {
  position: absolute;
  bottom: 5.06vw;
  right: 0;
}

.greyBtn {
  border: 1px solid grey;
  color: grey!important;
  background: none !important
}

.weui-tab__panel {
  padding-bottom: 0! important
}

.padding-bottom-15 {
  padding-bottom: 14.5vw!important
}

.blueText {
  background: rgba(29, 175, 237, 0.5);
  .px2vw(height, 32);
  .px2vw(padding-left, 21);
  .px2vw(line-height, 32);
  text-align: left;
}

</style>
