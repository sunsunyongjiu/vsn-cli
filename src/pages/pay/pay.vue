<template>
  <div class="vsn-wrap">
    <div class="vsn-main">
      <div class="orderList ">
        <div class="order-title font-15">订单信息</div>
        <div class="orderInfo font-14">
          <div>商品名称： <span v-text="order.prod_name"></span></div>
          <div>
            <span>订单金额：</span><span v-if="order.sellType==0">￥</span>
            <span class="fff" v-text="order.total"></span><span v-if="order.sellType==1">积分</span>
          </div>
        </div>
        <div class="order-title font-15">支付方式</div>
        <div class="payMent" v-if="order.sellType==1">
          <div class="payMent-left">
            <img src="../../assets/imgs/pointBox.png">
          </div>
          <div class="middle font-14">积分兑换</div>
          <div class="choose-btn selected payMent-right"></div>
        </div>
        <div class="payMent" v-if="order.sellType==0">
          <div class="payMent-left">
            <img src="../../assets/imgs/point.png">
          </div>
          <div class="middle font-14">微信支付</div>
          <div class="choose-btn selected payMent-right"></div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="payBtn font-18" @click="cancelPay">取消支付</div>
      <div class="payBtn font-18" @click="goPay">确认支付</div>
    </div>
    
    <confirm v-model="confirmShow" @on-cancel="onCancel" @on-confirm="onConfirm()" confirm-text="是" cancel-text="否">
      <div style="height:100%;color:#737373;line-height:1;text-align:center;" class="confirmBox font-18">
        <img src="../../assets/imgs/tanhao.png" class="confirm-tanhao">
        <div class="confirm-text">确认取消支付吗?</div>
      </div>
    </confirm>
    <confirm v-model="confirmShow2" @on-cancel="onPayCancel" @on-confirm="onPayConfirm()" confirm-text="是" cancel-text="否">
      <div style="height:100%;color:#737373;line-height:1;text-align:center;" class="confirmBox font-18">
        <img src="../../assets/imgs/tanhao.png" class="confirm-tanhao">
        <div class="confirm-text">确认支付吗?</div>
      </div>
    </confirm>
  </div>
</template>
<script>
import back from '../../components/backNav'
import Apis from '../../configers/Api'
import { Confirm } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      order: {
        prod_name: '',
        total: '',
        sellType: ''
      },
      confirmShow2: false,
      confirmShow:false,
			isClicking: false
    }
  },
  components: {
    back,
    Confirm
  },
  methods: {
    onPayConfirm: function() {
    	
    	if(this.isClicking){
				return
			}
    	
    	Apis.getOrderDetail(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber }).then(data => {
          
          if (data.data[0].status != 1) {
		      	this.$toast.show({
		          text: '订单已支付，请勿重复支付',
		          position: 'middle',
		          value: true
		        })
		      	
		      	return
		      }
		      
		      this.isClicking = true
		      
		      if (this.order.sellType == 0) {
		
		        Apis.unifiedorder(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber }).then(data => {
		          
		          this.isClicking = false
		          
		          this.callpay(data.data.jsApiParams)
		        })
		
		      } else {

		        Apis.scorePay(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber, 'score': this.order.total, token: this.$store.state.loginUser.token }).then(data => {
							
							this.isClicking = false
							
		          if (data.code == 1) {
		          	
		          	Apis.login({ token: this.$store.state.loginUser.token, 'user': this.$store.state.loginUser.user, "isLogin": "N" }).then(data => {
				          if (data.code === 1) {
				            let userDetail = data.data
				            userDetail.token = this.$store.state.loginUser.token
				            userDetail.user = this.$store.state.loginUser.user
				            sessionStorage.setItem("setLogin", JSON.stringify(userDetail))
				            this.$store.dispatch({ type: 'setLogin', data: userDetail })	
				          }
				          
				          this.$router.push({ path: '/success', query: { 'subNumber': this.$route.query.subNumber, success: 1 } })
			       		})	          	
		            
		          } else {
		            this.$router.push({ path: '/fail', query: { 'subNumber': this.$route.query.subNumber, success: 0 } })
		          }
		          
		        })
		
		      }
       })
        
      
    },
    onPayCancel: function() {

    },
    goPay: function() {
      this.confirmShow2 = true

    },
    init: function() {
      Apis.getOrderDetail(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber }).then(data => {
          console.log(data.data[0])
          this.order = data.data[0]
        }),

        localStorage.setItem("token", this.$store.state.loginUser.token);
      localStorage.setItem("user", this.$store.state.loginUser.user);
      localStorage.setItem("subNumber", this.$route.query.subNumber);
    },
    cancelPay:function(){
      this.confirmShow = true
    },
    onConfirm: function() {
      
      this.$router.replace({ path: '/path',query: { 'fromPay': true } })
    },
    onCancel: function() {
      
    },
    jsApiCall: function(data) {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        data,
        function(res) {
          WeixinJSBridge.log(res.errMsg);

          var token = localStorage.getItem("token");
          var user = localStorage.getItem("user");
          var subNumber = localStorage.getItem("subNumber");

          if (res.err_msg == "get_brand_wcpay_request:ok") {

            window.location.href =this.$BaseUrl('?token=' + token + '&user=' + user + '&subNumber=' + subNumber + '&success=1');

          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            window.location.href =this.$BaseUrl('?token=' + token + '&user=' + user + '&subNumber=' + subNumber + '&success=0');
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            window.location.href =this.BaseUrl('?token=' + token + '&user=' + user + '&subNumber=' + subNumber + '&success=0');
          }

          //alert(res.err_msg);
          //alert(this.$store.state.loginUser.token);
          //alert(this.$store.state.loginUser.user);

          //alert(res.err_msg);


        }
      );
    },

    callpay: function(data) {

      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(data), false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.jsApiCall(data));
          document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall(data));
        }
      } else {
        this.jsApiCall(data);
      }
    }
  },
  mounted: function() {
    this.init()

  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.payBtn {
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 50vw;
  height: 14.6vw;
  line-height: 14.6vw;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}
.bottom-btn{
  width: 100vw;
  height: 14.6vw;
  overflow: hidden;
  div{
    float: left;
  }
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
  padding-left: 5vw;
  padding-right: 5vw;
  /*box-shadow:0 2px 4px 0 */
}

.orderList {
  /*padding-left: 3vw;
  padding-right: 5vw;*/
}

.orderInfo {
  text-align: left;
  color: #dfdfdf;
  font-size: 14px;
  padding-left: 5vw;
  padding-right: 5vw;
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0;
  line-height: 8vw;
  margin-bottom: 5vw;
}

/*.selected {
  background: #1dafed;
  width: 4vw;
  height: 4vw;
  border-radius: 100%;
  color: #fff
}*/
.selected {
    background: url(../../assets/imgs/choose.png) center center;
    background-color: #1dafed!important;
    background-size: 150% 150%;
    width: 4vw;
    height: 4vw;
    border-radius: 100%;
    color: #fff
  }
.payMent {
  overflow: hidden;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-top: 2vw;
  background: #181818;
  /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);*/
  .payMent-left {
    width: 5.4vw;
    height: 5.4vw;
    float: left;
    img {
      height: 100%
    }
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

</style>
