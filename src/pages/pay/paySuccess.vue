<template>
  <div>
  	<back title="支付成功"></back>
  	<div class="payBtn" @click="goBack">返回</div>
  	<div class="success">
  		<div class="success-logo">
  			<img src="../../assets/imgs/success.png">
  		</div>
  		<div class="font-18 fff pay-suc">
  			支付成功
  		</div>
  		<div class="font-14 color-7f">我们将尽快为您发货</div>
  	</div>
  	<div class="orderInfo">
  		<div class="order font-15 color-7f">
  			<div class="order-left">订单号：</div>
  			<div class="order-right">389898945223784344442</div>
  		</div>
  		<div class="order font-15 color-7f">
  			<div class="order-left">支付方式：</div>
  			<div class="order-right">积分支付</div>
  		</div>
  		<div class="order font-15 color-7f">
  			<div class="order-left">支付账号：</div>
  			<div class="order-right">sweetie_love</div>
  		</div>
  		<div class="order font-15 color-7f">
  			<div class="order-left">收件人：</div>
  			<div class="order-right">Lucy</div>
  		</div>
  		<div class="order font-15 color-7f">
  			<div class="order-left">订单总额：</div>
  			<div class="order-right">900积分</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import back from '../../components/backNav'
export default {
  name: '',
  data () {
    return {
    }
  },
  components:{
    back
  },
  methods:{
    goBack:function(){
      this.$router.replace({path:'/index'})
    },
  },          
  mounted:function(){
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.payBtn{
	position: absolute;
	left: 6vw;
	bottom: 6vw;
	background:#1dafed;
	box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
	width:88vw;
	height:14.6vw;
	line-height: 14.6vw;
	font-size:24px;
	color:#ffffff;
	letter-spacing:0;
	text-align:center;
}
.order-title{
	text-align: left;
	box-sizing:border-box;
	width: 100%;
	height: 8.5vw;
	opacity:0.5;
	background:#292929;
	border-radius:2px 2px 0 0;
	line-height: 8.5vw;
	color: #fff;
	padding-left: 2vw
	/*box-shadow:0 2px 4px 0 */
}
.orderList{
	padding-left: 3vw;
	padding-right: 5vw;
}
.orderInfo{
	text-align: left;
	color:#dfdfdf;
	font-size: 14px;
	padding-left: 2vw;
	background:#181818;
	box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
	border-radius:4px 4px 0 0;
	line-height: 8vw;
	margin-bottom: 5vw;
	
}
.selected{
	background:#1dafed;
	width:4vw;
	height:4vw;
	border-radius:100%;
	color: #fff
}
.payMent{
	padding-left: 2vw;
	margin-top: 2vw;
	background:#181818;
	box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
	.payMent-left{
		width: 6.4vw;
		height: 6.4vw;
		float: left;
	}
	.payMent-right{
		float: right;
		margin-top: 1.2vw
	}
	.middle{
		width: 40vw;
		float: left;
		text-align: left;
		font-size:14px;
		color:#ffffff;
		letter-spacing:0;
		line-height:15px;
		padding-left:2vw; 
		line-height: 6.4vw
	}
}
.success{
	.success-logo{
		height: 27.4vw;
		width: 27.4vw;
		margin:12.2vw auto 0;
		img{
			height: 27.4vw
		}
	}
	.pay-suc{
		line-height: 10vw
	}
}
.orderInfo{
	
	padding-top: 12vw;
	padding-bottom: 12vw;
	background:#181818;
	box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
	overflow: hidden;
	width: 89.3vw;
	margin: 9.3vw auto 0
}
.order{
	width: 100%;
	box-sizing:border-box;
	padding-left: 2vw;
	line-height: 22px;
	
	
	div{
		float: left;
	}
	.order-left{
		width: 35%;
		text-align: right;
	}
	.order-right{
		width: 60%;
		text-align: left;
		padding-left: 5%
	}
}
</style>
