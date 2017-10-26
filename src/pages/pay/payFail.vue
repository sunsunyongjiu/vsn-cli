<template>
  <div class="vsn-wrap">
    <!--   <back title="支付成功"></back> -->
    <div class="vsn-main">
      <div class="success">
        <div class="success-logo">
          <img src="../../assets/imgs/fail.png">
        </div>
        <div class="font-18 fff pay-suc">
          {{'支付失败'}}
        </div>
        <div class="font-14 color-7f">{{'请重新支付'}}</div>
      </div>
      <div class="fail-mid">
        请您于订单提交的30分钟内完成支付，超时订单将被自动取消。如需帮助，请点击首页-联系客服。
      </div>
    </div>
    <div class="payBtn font-18" @click="goBack">返回首页</div>
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
      success: 0
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
      let _this = this
      this.success = parseInt(this.$route.query.success)
      Apis.getOrderDetail(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber }).then(data => {
        console.log(data.data[0])
        this.order = data.data[0]

      })
      if (this.$route.query.success) {
        Apis.login({ token: _this.loginUser.token, 'user': _this.loginUser.user, isLogin: 'N' }).then(data => {
          console.log(data.code)
          if (data.code === 1) {
            this.$store.dispatch({ type: 'setUserScore', data: data.data.points })
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
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100vw;
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

.fail-mid {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .px2vw(height, 200);
  .px2vw(width, 350);
  .px2vw(margin-top, 40);
  .px2vw(padding-left, 44);
  .px2vw(padding-right, 41);
  .px2vw(padding-top, 46);
  .px2vw(font-size, 14);
  .px2vw(line-height, 25);
  box-sizing: border-box;
  color: #919191;

  margin: 0 auto;
  text-align: left;
}

</style>
