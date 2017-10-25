<template>
  <div>
    <!-- <back title="确认订单"></back> -->
    <div class='blueText font-11 fff' v-if="isCash">
      温馨提醒：您可在签收商品7天内，申请开具发票／换货／退货。
    </div>
    <div class="order-title font-15 pd-right2">收货人信息</div>
    <div class="container">
      <div class="orderList">
        <div class="order-location font-14">
          <div class="order-location-text"  @click="goLocation">
            <span v-text="commonAdd.RECEIVER"></span><span v-text="commonAdd.moble"></span>
            <br>
            <span>
              {{commonAdd.province}}{{commonAdd.CITY}}{{commonAdd.area}}{{commonAdd.town}}{{commonAdd.subAdds}}
            </span>
            <div class="right">&gt;</div>
          </div>
          <div class="line"></div>
          <div class="order-titles font-14">
            运费
            <div class="right-show font-14 ">{{trackFee>0?trackFee:'免邮'}}</div>
          </div>
        </div>
        <div class="order-title font-15 top-5 pd-right2">商品信息</div>
        <div class="order-goods-box">
          <div class="order-goods" v-for="(item,key) in goods" key=index>
            <div class="goods-left">
              <img :src="item.pic">
            </div>
            <div class="goods-right">
              <div class="font-16 df title" v-text="item.prod_name"></div>
              <!-- <div class="font-11 color-92" v-text="">颜色：贵族金，规格：标准</div> -->
              <!-- <div class="font-13 color-92 margin-top-5">数量×<span v-text="item.basket_count"></span></div> -->
              <div>
                <span v-for="(size,index) in item.attribute" class="font-11 color-92">
                  {{size.key}}:{{size.value}}
                </span>
              </div>
              <div v-if="item.sellType==1" class='margin-top-5' style="position:relative">
                <span class="basicColor font-16" v-text="item.point"></span>
                <span class="font-9 color-9b">积分</span>
                <span class="font-12 color-92 count" style="float:right;vertical-align:bottom">×{{item.basket_count}}</span>
              </div>
              <div v-if="item.sellType==0" class="margin-top-5">
                <span class="font-9 color-9b">￥</span>
                <span class="basicColor font-16" v-text="item.cash"></span>
              </div>
              <div class=" bottom font-10 ba" v-if="item.is7return==1">
                <img src="../../assets/imgs/sevenY.png"> 支持7天无理由退货
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="order-bottom">
      <div class="total font-15">
        合计：<span class="font-10  basicColor" v-if="isCash">￥</span>
        <span class="font-18 basicColor" v-text="total" v-if="!isCash"></span>
        <span class="font-18 basicColor" v-text="totalCash" v-if="isCash"></span>
        <span class="font-9 basicColor" v-if="!isCash">积分</span>
        <div class="font-9 color-9b" v-if="!isCash">
          积分商品不支持退换货和开发票
        </div>
      </div>
      <div class="commit-btn font-18" @click="goPay">提交订单</div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import md5 from 'js-md5';
import Apis from '../../configers/Api';
import { mapGetters } from 'vuex'
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  data() {
    return {
      goods: [

      ],
      isCash: false,
      commonAdd: {
        RECEIVER: '暂无地址，请添加收货地址',
        moble: '',
        province: '',
        CITY: '',
        area: '',
        town: '',
        subAdds: ''
      },
      trackFee: '0'
    }
  },
  components: {
    back
  },
  methods: {
    goPay: function() {
      if(this.commonAdd.province==''){
        this.$vux.toast.text('收件地址不能为空', 'middle');
        return
      }
      this.$vux.loading.show({
        text: 'loading'
      })
      let header = {
        "token": this.loginUser.token,
        "time": timer,
        "sign": md5("/order/insertOrderNoNew" + this.loginUser.token + timer).toUpperCase()
      }
      // 设置传值
      let cartData = {
        basketIds: this.$route.query.selectIds,
        addrId: this.commonAdd.addrId,
        token: this.loginUser.token,
        freightAmount:this.trackFee
      }

      if (this.isCash || this.total <= parseInt(this.loginUser.score)) {
        this.$http({
          method: 'POST',
          url: this.$Api('/order/insertOrderNoNew'),
          params: cartData,
          headers: header,
          emulateJSON: true
        }).then(function(data) {
          console.log(data)
          if (data.data.code == 1) {
            this.$vux.loading.hide()
            this.$router.push({ path: '/pay', query: { 'subNumber': data.data.data } })
          } else {
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.data.msg,
              type: 'warn',
              isShowMask: true,
              position: 'middle'
            })
          }
        }, function(error) {
          //error
        })
      } else {
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: '您当前的积分不足',
          type: 'warn',
          isShowMask: true,
          position: 'middle'
        })
      }



    },
    goLocation: function() {
      this.$router.push({ path: '/choseLocation' })
    },
    getFee: function() {
      Apis.getBasketListTrackFee(this.$store.state.loginUser.token, { 'basketIds': this.$route.query.selectIds, 'addrId': this.commonAdd.addrId }).then(data => {
        console.log(data.data)
        this.trackFee=data.data.trackFee
      });
    },
    init: function() {
      // 根据购物车id取数据
      this.$http.get(this.$Api('/order/getBasketListSelected'), {
        params: { 'basketIds': this.$route.query.selectIds },
        headers: {
          "token": this.loginUser.token,
          "time": timer,
          "sign": md5("/order/getBasketListSelected" + this.loginUser.token + timer).toUpperCase()
        }
      }).then((response) => {
        this.goods = response.data.data;
        this.goods.forEach(function(item,index){
          item.attribute=JSON.parse(item.attribute)
        })
        console.log(this.goods[0].sellType)
        if (this.goods[0].sellType == 0) {
          this.isCash = true
        }
      }, (response) => {
        // error callback
      });

      let header = {
        headers: {
          "token": this.loginUser.token,
          "time": timer,
          "sign": md5("/address/getDefaultAddress" + this.loginUser.token + timer).toUpperCase()
        }
      }
      if (this.addr.CITY) {
        this.commonAdd = this.addr;
        this.getFee()
      } else {
        this.$http.get(this.$Api('/address/getDefaultAddress'), header).then((response) => {

          if (response.data.data != null) {
            this.commonAdd = response.data.data
            this.getFee()
          } else {

          }

        }, (response) => {
          // error callback
        });
      }


    }
  },
  mounted: function() {
    this.init()

  },
  computed: {
    total: function() {
      let num = 0
      this.goods.forEach(function(n) {
        num += (n.basket_count * n.point)
      })
      return num
    },
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      addr: 'getAddr',
      loginUser: 'getLogin'

    }),
    totalCash: function() {
      let num = 0
      this.goods.forEach(function(n) {
        num += (n.basket_count * n.cash)
      })
      num=num+parseInt(this.trackFee)
      return num
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.order-bottom {
  background: #292929;
  box-shadow: 7px 12px 8px 11px rgba(0, 0, 0, 0.58);
  width: 100vw;
  height: 14.933vw;
  position: absolute;
  bottom: 0;
  .commit-btn {
    background: #1dafed;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
    border-radius: 0 1px 1px 1px;
    width: 27vw;
    height: 100%;
    float: right;
    text-align: center;
    line-height: 14.933vw;
    font-size: 18px;
    color: #fff;
  }
  .total {
    padding-top: 4vw;
    float: left;
    width: 73vw;
    text-align: left;
    box-sizing: border-box;
    padding-left: 5vw;
    color: #ffffff;
  }
}


.order-title {
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  height: 8.5vw;
  background: rgba(49,49,49,0.5);
  border-radius: 2px 2px 0 0;
  line-height: 8.5vw;
  color: #fff;
  padding-left: 2vw;
  padding-left: 5.3vw;
  position: relative;
  font-size: 15px;
  /*box-shadow:0 2px 4px 0 */
}

.order-location {
  margin-top: 2vw;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  line-height: 6.5vw;
  color: #7a7a7a;
  padding-left: 5vw;
  padding-right: 3vw;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
}

.line {
  opacity: 0.3;
  background: #4a4a4a;
  width: 92.26vw;
  height: 1px;
  margin-top: 2.3vw;
}

.right-show {
  float: right;
  color: #888888
}

.order-goods {
  width: 100%;
  height: 22.9vw;
  margin-top: 5vw;
  .goods-left {
    width: 22.9vw;
    height: 100%;
    float: left;
    border-radius: 2px;
    img {
      height: 100%;
      max-width: 22.9vw
    }
  }
  .goods-right {
    float: left;
    text-align: left;
    width: 63vw;
    padding-left: 5vw;
    position: relative;
    height: 100%;
    .bottom {
      position: absolute;
      bottom: 0;
      img {
        .px2vw(height, 13);
        .px2vw(width, 13);
        vertical-align: middle;
      }
    }
    .title {
      line-height: 7vw;
      /*.px2vw(margin-bottom, 10);*/
    }
  }
}

.order-goods-box {
  padding-bottom: 14.9333vw;
  padding-left: 5vw;
}

.order-location-text {
  position: relative;
  padding: 5vw 0vw;
  .right {
    position: absolute;
    height: 5vw;
    line-height: 5vw;
    right: 0vw;
    top: 50%;
    margin-top: -2.5vw;
    color: #888888
  }
}

.order-ticket {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  height: 12vw;
  line-height: 12vw;
  font-size: 14px;
  padding-left: 2vw;
  opacity: 0.5;
  box-sizing: border-box;

  color: #fff;
  position: relative;
  margin-top: 2.3vw;

  .order-ticket-left {
    float: left;
  }
  .order-ticket-right {
    float: right;
  }
}

.order-titles {
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  height: 8.5vw;
  border-radius: 2px 2px 0 0;
  line-height: 8.5vw;
  color: #fff;
  position: relative
}

.pd-left-2 {
  padding-left: 2vw;
}

.title {
  width: 60vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.blueText {
  background: rgba(29, 175, 237, 0.5);
  .px2vw(height, 32);
  .px2vw(padding-left, 21);
  .px2vw(line-height, 32);
  text-align: left;
}

.margin-top-5 {
  .px2vw(margin-top, 5);
}
.count{
  .px2vw(line-height, 21);
}
</style>
