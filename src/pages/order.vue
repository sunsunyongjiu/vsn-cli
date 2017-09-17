<template>
  <div>
    <back title="我的订单"></back>
    <div>
      <tab :line-width="1" custom-bar-width="16vw" defaultColor="#787878" active-color="white" style="background:#181818">
        <tab-item :selected="listIndex==0" @on-item-click="changeItem" class=" font-14">未支付</tab-item>
        <tab-item :selected="listIndex==1" @on-item-click="changeItem" class=" font-14">已支付</tab-item>
        <tab-item :selected="listIndex==2" @on-item-click="changeItem" class=" font-14">已完成</tab-item>
        <tab-item :selected="listIndex==3" @on-item-click="changeItem" class=" font-14">已取消</tab-item>
        <tab-item :selected="listIndex==4" @on-item-click="changeItem" class=" font-14">退换货</tab-item>
      </tab>
    </div>
    <div>
      <div class="orderList" v-for="(items,key ) in orderLists" key="key">
        <div class="orders" v-for="(item,index) in items.prod" key='index' @click="goDetail(items)">
          <div class="orders-left">
            <img :src="item.pic">
          </div>
          <div class="orders-mid">
            <div class="font-16 df orders-mid-title" v-text="item.prod_name"></div>
            <div v-for="(attr,x) in item.attribute">
              <span v-text="attr.key"></span>:
              <span v-text="attr.value"></span>
            </div>
            <div class="font-11">数量：x<span v-text="item.basket_count"></span></div>
            <div class="orders-mid-bottom">
              <span v-if="items.sellType==0" class="font-11">￥</span>
              <span class="basicColor font-16" v-text="item.product_total_amout"></span>
              <span class="font-9" v-if="items.sellType==1">积分</span>
            </div>
          </div>
          <div class="orders-right font-12">
            {{items.status|changeStatus}}
          </div>
          <div class="order-line"></div>
        </div>
        <div>
          <div class="order-btns">
            <div class="left font-12">
              共<span v-text="items.totalCount"></span>件商品 小计:
              <span v-if="items.sellType==0" class="font-11">￥</span>
              <span class="font-14 basicColor" v-text="items.actual_total"></span>
              <span class="font-9 color-9b" v-if="items.sellType==1">积分</span>
            </div>
            <div v-if="btnsShow">
              <div class="order-btns-goChange" v-if="items.status==1||items.status==3||items.status==2">
                <span v-if="items.status==1||items.status==4" @click="goPay(items)" class="font-12">{{items.sellType==0?'去支付':'去兑换'}}</span>
                <span v-if="items.status==3||items.status==2" @click="goGet(items.sub_number)" class="font-12">确认收货</span>
                <confirm v-model="confirmShow" @on-cancel="onCancel" @on-confirm="onConfirm()">
                  <p style="text-align:center;margin-bottom:10px;color:#737373" class="font-12">确认收货吗？</p>
                  <p style="text-align:left;color:#737373" class="font-12">是否确认收货</p>
                </confirm>
              </div>
              <!-- <div class="order-btns-cancle1" v-if="items.status==3">已自动确认收货</div> -->
              <!-- <div class="order-btns-goChange" v-text="returnText" v-if="items.status==2||items.status==3">退换货</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../components/backNav'
import { Tab, TabItem, Confirm } from 'vux'
import md5 from 'js-md5';
import { mapGetters } from 'vuex'
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  data() {
    return {
      orderLists: {},
      changeText: '去兑换',
      returnText: '退换货',
      returnShow: false,
      btnsShow: true,
      status: 1,
      confirmShow: false,
      deleteNm: ''
    }
  },
  components: {
    back,
    Tab,
    TabItem,
    Confirm
  },
  methods: {
    goPay: function(item) {
      this.$router.push({ path: '/pay', query: { 'subNumber': item.sub_number } })
    },
    goGet: function(num) {
      this.deleteNm = num
      this.confirmShow = true
    },
    onConfirm: function() {

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
        subNumber: this.deleteNm,
      }

      this.$http({
        method: 'POST',
        url: this.$Api('/order/finishOrder'),
        params: cartData,
        headers: header,
        emulateJSON: true
      }).then(function(data) {
        console.log(data)
        this.init()
        this.$vux.loading.hide()
      }, function(error) {
        //error
      })
    },
    onCancel: function() {

    },
    changeItem: function(index) {
      this.$store.dispatch({ type: 'setlistIndex', data: index })
      let _this = this
      _this.btnsShow = true
      if (index < 2) {
        this.status = index + 1
      } else {
        this.status = index + 2
      }

      console.log(this.status)
      this.init()
    },
    goDetail: function(n) {
      console.log(n)
      this.$router.push({ path: '/orderDetail', query: { 'sub_number': n.sub_number } })
    },
    init: function() {
      let _this = this
      if (_this.listIndex) {
        
        _this.btnsShow = true
        if (_this.listIndex < 2) {
          this.status = _this.listIndex + 1
        } else {
          this.status = _this.listIndex + 2
        }
      }
      this.$http.get(this.$Api('/order/getOrderList'), {
        params: { 'status': this.status },
        headers: {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/order/getOrderList" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
      }).then((response) => {
        console.log(response)
        this.orderLists = response.data.data
        this.orderLists.forEach(function(n) {
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
  mounted: function() {
    this.init()

  },
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      listIndex: 'getlistIndex'

    })
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
  background: #4a4a4a;
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
  .order-btns-cancle1 {
    float: right;

    width: 25vw;
    margin-left: 2.6vw;
    line-height: 5.8vw;
    box-sizing: border-box;
    text-align: center;
    border: #737373 1px solid;
    color: #737373;
  }
}

</style>
