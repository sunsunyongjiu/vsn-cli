<template>
  <div>
    <back title="确认订单"></back>
    <div class='blueText font-11 fff' v-if="isCash">
      温馨提醒：发票需要在签收商品后才能开具。
    </div>
    <div class="order-title font-15 pd-right2">收货人信息</div>
    <div class="container">
      <div class="orderList">
        <div class="order-location font-14" @click="goLocation">
          <div class="order-location-text">
            <span v-text="commonAdd.RECEIVER"></span><span v-text="commonAdd.moble"></span>
            <br>
            <span>
              {{commonAdd.province}}{{commonAdd.CITY}}{{commonAdd.area}}{{commonAdd.town}}{{commonAdd.subAdds}}
            </span>
            <div class="right">&gt;</div>
          </div>
          <div class="line"></div>
          <div class="order-titles font-14">
            配送方式
            <div class="right font-14 ">快递免邮&gt;</div>
          </div>
        </div>
        <div class="order-title font-15 top-5 pd-right2 pd-left-2">商品信息</div>
        <div class="order-goods-box">
          <div class="order-goods" v-for="(item,key) in goods" key=index>
            <div class="goods-left">
              <img :src="item.pic">
            </div>
            <div class="goods-right">
              <div class="font-16 df title" v-text="item.prod_name"></div>
              <!-- <div class="font-11 color-92" v-text="">颜色：贵族金，规格：标准</div> -->
              <div class="font-11 color-92 margin-top-5">数量×<span v-text="item.basket_count"></span></div>
              <div  v-if="item.sellType==1" class='margin-top-5'>
                <span class="basicColor font-16" v-text="item.point"></span>
                <span class="font-9 color-9b">积分</span>
              </div>
              <div  v-if="item.sellType==0" class="margin-top-5">
                <span class="font-9 color-9b">￥</span>
                <span class="basicColor font-16" v-text="item.cash"></span>
              </div>
              <div class=" bottom font-10 ba" v-if="item.sellType==0">
                <img src="../../assets/imgs/sevenY.png"> 支持7天无理由退换货
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
        <div class="font-9 color-9b">
          积分商品限量兑换，不支持退换货
        </div>
      </div>
      <div class="commit-btn font-18" @click="goPay">提交订单</div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import md5 from 'js-md5';
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
      }
    }
  },
  components: {
    back
  },
  methods: {
    goPay: function() {
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
        token: this.loginUser.token
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
        this.goods = response.data.data
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
        this.commonAdd = this.addr
      } else {
        this.$http.get(this.$Api('/address/getDefaultAddress'), header).then((response) => {

          if (response.data.data != null) {
            this.commonAdd = response.data.data
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

.container {
  padding-left: 3vw;
  padding-right: 3vw;
}

.order-title {
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  height: 8.5vw;
  opacity: 0.5;
  background: #292929;
  border-radius: 2px 2px 0 0;
  line-height: 8.5vw;
  color: #fff;
  padding-left: 2vw;
  padding-left: 5.3vw;
  position: relative;
  margin-top: 2.3vw;
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
  padding-left: 2vw;
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

.right {
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
    background: #292929;
    border-radius: 2px;
    img {
      height: 100%;
      max-width: 22.9vw
    }
  }
  .goods-right {
    float: left;
    text-align: left;
    width: 50vw;
    padding-left: 5vw;
    position: relative;
    height: 100%;
    .bottom {
      position: absolute;
      bottom: 0;
      img{
        .px2vw(height, 13);
        .px2vw(width, 13);
        vertical-align: middle;
      }
    }
    .title {
      line-height: 6vw
    }
  }
}

.order-goods-box {
  padding-bottom: 14.9333vw;
}

.order-location-text {
  position: relative;
  padding: 5vw 0;
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
  opacity: 0.5;
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
  background: rgba(29,175,237,0.5);
  .px2vw(height, 32);
  .px2vw(padding-left, 21);
  .px2vw(line-height, 32);
  text-align: left;

}
.margin-top-5{
  .px2vw(margin-top, 5);
}

</style>
