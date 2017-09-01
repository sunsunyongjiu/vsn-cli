<template>
  <div>
  	<back title="支付订单"></back>
  	<div class="payBtn font-24" @click="goPay">确认支付</div>
  	<div class="orderList">
  		<div class="order-title font-15">订单信息</div>
  		<div  class="orderInfo font-14">
  			<div>订单名称： 范思哲（VERSACE）男士香水 50ml…</div>
			<div>
				<span>订单金额：</span>
				<span class="fff">900</span><span>积分</span>
			</div>
  		</div>
		<div class="order-title font-15">支付方式</div>
		<div class="payMent">
			<div class="payMent-left">
				<img src="../../assets/imgs/point.png">
			</div>
			<div class="middle font-14">积分支付</div>
			<div class="choose-btn selected payMent-right" ></div>
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
    goPay:function(){
    	this.$router.push({path:'/success'})
    }
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
		img{
			height: 100%
		}
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
</style>
