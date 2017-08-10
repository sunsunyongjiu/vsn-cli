<template>
  <div>
    <back title="确认订单"></back>
    <div class="container">
      <div class="orderList">
        <div class="order-title font-15 pd-right2">收货人信息</div>
        <div class="order-location font-15 pd-right2" @click="goLocation">
          <div>
            <span v-text="commonAdd.RECEIVER"></span><span v-text="commonAdd.moble"></span>
            <br>
            <span>
				{{commonAdd.province}}{{commonAdd.CITY}}{{commonAdd.area}}{{commonAdd.town}}{{commonAdd.subAdds}}
			</span>
          </div>
          <div class="right">&gt;</div>
        </div>
        <div class="line"></div>
        <div class="order-title font-15 pd-right2">
          配送方式
          <div class="right font-14 ">快递免邮&gt;</div>
        </div>
        <div class="line"></div>
        <div class="order-title font-15 top-5 pd-right2">商品信息</div>
        <div class="order-goods-box">
          <div class="order-goods" v-for="(item,key) in goods" key=index>
            <div class="goods-left">
              <img :src="item.pic">
            </div>
            <div class="goods-right">
              <div class="font-16 df title" v-text="item.prod_name">专属香氛</div>
              <!-- <div class="font-11 color-92" v-text="">颜色：贵族金，规格：标准</div> -->
              <div class="font-11 color-92">数量×<span v-text="item.basket_count"></span></div>
              <div class=" bottom">
                <span class="basicColor font-16" v-text="item.point">50000</span>
                <span class="font-9 color-9b">积分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="order-bottom">
      <div class="total font-15">
        合计：<span class="font-10  basicColor"></span>
        <span class="font-18 basicColor" v-text="total">100000</span>
        <span class="font-9 basicColor">积分</span>
        <div class="font-9 color-9b">
          积分商品限量兑换，不支持退换货
        </div>
      </div>
      <div class="commit-btn" @click="goPay">提交订单</div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import md5 from 'js-md5';
export default {
  name: '',
  data() {
    return {
      goods: [

      ],
      commonAdd: {}
    }
  },
  components: {
    back
  },
  methods: {
    goPay: function() {

      let header = {
        "token": this.$store.state.loginUser.token,
        "time": JSON.stringify(new Date().getTime()),
        "sign": md5("/order/insertOrderNo" + this.$store.state.loginUser.token + JSON.stringify(new Date().getTime())).toUpperCase()
      }
      // 设置传值
      let cartData = {
        basketIds:this.$route.query.selectIds,
        addrId:this.commonAdd.addrId,
        total:this.total
      }
      
      this.$http({
        method: 'POST',
        url: this.$Api('/order/insertOrderNo'),
        params: cartData,
        headers: header,
        emulateJSON: true
      }).then(function(data) {
        console.log(data)
        
        this.$router.push({ path: '/pay' })
      }, function(error) {
        //error
      })

      
    },
    goLocation: function() {
      this.$router.push({ path: '/choseLocation' })
    },
    init: function() {
      // 根据购物车id取数据
      this.$http.get(this.$Api('/order/getBasketListSelected'), {
        params: { 'basketIds': this.$route.query.selectIds },
        headers: {
          "token": this.$store.state.loginUser.token,
          "time": JSON.stringify(new Date().getTime()),
          "sign": md5("/order/getBasketListSelected" + this.$store.state.loginUser.token + JSON.stringify(new Date().getTime())).toUpperCase()
        }
      }).then((response) => {
        this.goods = response.data.data
        console.log(response.data.data)
      }, (response) => {
        // error callback
      });

      let header = {
        headers: {
          "token": this.$store.state.loginUser.token,
        }
      }
      this.$http.get(this.$Api('/address/getDefaultAddress'), header).then((response) => {
        this.commonAdd = response.data.data
      }, (response) => {
        // error callback
      });

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
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
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
  padding-left: 2vw
  /*box-shadow:0 2px 4px 0 */
}

.order-location {
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  padding-top: 5vw;
  opacity: 0.5;
  line-height: 6.5vw;
  color: #7a7a7a;
  padding-left: 2vw;
  padding-bottom: 5vw;
  position: relative;
  .right {
    position: absolute;
    height: 5vw;
    line-height: 5vw;
    right: 2vw;
    top: 50%;
    margin-top: -2.5vw;
    color: #888888
  }
}

.line {
  opacity: 0.3;
  background: #4a4a4a;
  width: 92.26vw;
  height: 1px;
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
      bottom: 0
    }
    .title {
      line-height: 6vw
    }
  }
}

.order-goods-box {
  padding-bottom: 14.9333vw;
}

</style>
