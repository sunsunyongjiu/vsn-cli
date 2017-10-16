<template>
  <div>
   <!--   <back title="支付成功"></back> -->
    <div class="payBtn font-24" @click="goBack">返回</div>
    <div class="success">
      <div class="success-logo">
        <img src="../../assets/imgs/success.png">
      </div>
      <div class="font-18 fff pay-suc">
        {{success?'支付成功':'支付失败'}}
      </div>
      <div class="font-14 color-7f">{{success?'我们将尽快为您发货':'很遗憾，您的支付未能成功，请尝试重新支付'}}</div>
    </div>
    <div class="orderInfo" v-if="success">
      <div class="order font-15 color-7f">
        <div class="order-left">订单号：</div>
        <div class="order-right" v-text="order.sub_number">1</div>
      </div>
      <div class="order font-15 color-7f">
        <div class="order-left">支付方式：</div>
        <div class="order-right">{{order.sellType==0?'微信支付':'积分支付'}}</div>
      </div>
      <!--       <div class="order font-15 color-7f">
        <div class="order-left">支付账号：</div>
        <div class="order-right">sweetie_love</div>
      </div> -->
      <!--       <div class="order font-15 color-7f">
        <div class="order-left">收件人：</div>
        <div class="order-right">Lucy</div>
      </div> -->
      <div class="order font-15 color-7f">
        <div class="order-left">订单总额：</div>
        <div class="order-right">
          <span v-if="order.sellType==0">￥</span>
          <span class="" v-text="order.total"></span>
          <span v-if="order.sellType==1">积分</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import Apis from '../../configers/Api'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      order: {

      },
      success:0
    }
  },
  components: {
    back
  },
  methods: {
    goBack: function() {
      this.$router.replace({ path: '/index' })
    },
    init: function() {
      let _this=this
      this.data.success=this.$route.query.success
      Apis.getOrderDetail(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber }).then(data => {
        console.log(data.data[0])
        this.order = data.data[0]

      })
      if (this.$route.query.success) {
        Apis.login({ token: _this.loginUser.token, 'user': _this.loginUser.user,isLogin:'N' }).then(data => {
          console.log(data.code)
          if (data.code === 1) {
            this.$store.dispatch({ type: 'setUserScore', data: data.data.score })
          }
        })
      }
    }
  },
  mounted: function() {
    this.init()

  },
  computed: {

    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      loginUser: 'getLogin'

    })
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.payBtn {
  position: absolute;
  left: 6vw;
  bottom: 6vw;
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 88vw;
  height: 14.6vw;
  line-height: 14.6vw;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
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

.orderList {
  padding-left: 3vw;
  padding-right: 5vw;
}

.orderInfo {
  text-align: left;
  color: #dfdfdf;
  font-size: 14px;
  padding-left: 2vw;
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0;
  line-height: 8vw;
  margin-bottom: 5vw;
}

.selected {
  background: #1dafed;
  width: 4vw;
  height: 4vw;
  border-radius: 100%;
  color: #fff
}

.payMent {
  padding-left: 2vw;
  margin-top: 2vw;
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .payMent-left {
    width: 6.4vw;
    height: 6.4vw;
    float: left;
  }
  .payMent-right {
    float: right;
    margin-top: 1.2vw
  }
  .middle {
    width: 40vw;
    float: left;
    text-align: left;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 15px;
    padding-left: 2vw;
    line-height: 6.4vw
  }
}

.success {
  .success-logo {
    height: 27.4vw;
    width: 27.4vw;
    margin: 12.2vw auto 0;
    img {
      height: 27.4vw
    }
  }
  .pay-suc {
    line-height: 10vw
  }
}

.orderInfo {

  padding-top: 6vw;
  padding-bottom: 12vw;
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  overflow: hidden;
  width: 89.3vw;
  margin: 9.3vw auto 0
}

.order {
  width: 100%;
  box-sizing: border-box;
  padding-left: 2vw;
  .px2vw(line-height, 22);



  div {
    float: left;
  }
  .order-left {
    width: 35%;
    text-align: right;
  }
  .order-right {
    width: 60%;
    text-align: left;
    padding-left: 5%
  }
}

</style>
