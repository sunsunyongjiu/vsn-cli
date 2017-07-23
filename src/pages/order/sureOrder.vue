<template>
	<div>
		<back title="确认订单"></back>
		<div class="container">
			<div class="orderList">
		
				<div class="order-title font-15 pd-right2">收货人信息</div>
				<div class="order-location font-15 pd-right2">
					<div>
						Lucy  13776641789<br>
						上海市浦东新区金桥大厦湖南路54号万科小区3栋4单元1201
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
				<div class="order-goods">
					<div class="goods-left">
						<img src="../../assets/imgs/goods.png">
					</div>
					<div class="goods-right">
						<div class="font-16 df title">罗马系列腕表</div>
						<div class="font-11 color-92">颜色：贵族金，规格：标准</div>
						<div class="font-11 color-92">数量×2</div>
						<div class=" bottom">
							<span class="basicColor font-16">6000</span>
							<span class="font-9 color-9b">积分</span>
						</div>
					</div>
				</div>
				<div class="order-goods">
					<div class="goods-left">
						<img src="../../assets/imgs/box.png">
					</div>
					<div class="goods-right">
						<div class="font-16 df title">专属香氛</div>
						<div class="font-11 color-92">颜色：贵族金，规格：标准</div>
						<div class="font-11 color-92">数量×2</div>
						<div class=" bottom">
							<span class="basicColor font-16">6000</span>
							<span class="font-9 color-9b">积分</span>
						</div>
					</div>
				</div>
				
			</div>	
		</div>

		<!-- 底部按钮 -->
		<div class="order-bottom">
			<div class="total font-15">合计：<span class="font-10  basicColor"></span><span class="font-18 basicColor">1000</span><span class="font-9 basicColor">积分</span></div>
			<div class="commit-btn" @click="goPay">提交订单</div>
		
			
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
    	this.$router.push({path:'/pay'})
    }
  },          
  mounted:function(){
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.order-bottom{
	background:#292929;
	box-shadow:7px 12px 8px 11px rgba(0,0,0,0.58);
	width:100vw;
	height:14.933vw;
	position: absolute;
	bottom: 0;
	.commit-btn{
		background:#1dafed;
		box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
		border-radius:0 1px 1px 1px;
		width:27vw;
		height:100%;
		float: right;
		text-align: center;line-height: 14.933vw;
		font-size: 18px;
		color:#fff;
	}
	.total{
		line-height: 14.933vw;
		float: left;
		width: 73vw;
		text-align: left;
		box-sizing:border-box;
		padding-left: 5vw;
		color:#ffffff;
	}
}
.container{
	padding-left: 3vw;
	padding-right: 3vw;
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
.order-location{
	text-align: left;
	box-sizing:border-box;
	width: 100%;
	padding-top: 5vw;
	opacity:0.5;
	line-height: 6.5vw;
	color: #7a7a7a;
	padding-left: 2vw;
	padding-bottom: 5vw;
	position: relative;
	.right{
		position: absolute;
		height: 5vw;
		line-height: 5vw;
		right: 2vw;
		top: 50%;
		margin-top: -2.5vw;
		color:#888888
	}
}
.line{
	opacity:0.3;
	background:  #4a4a4a;
	width:92.26vw;
	height:1px;
}
.right{
	float: right;
	color:#888888
}
.order-goods{
	width: 100%;
	height: 22.9vw;
	margin-top: 5vw;
	.goods-left{
		width: 22.9vw;
		height: 100%;
		float: left;
		background:#292929;
		border-radius:2px;
		img{
			height: 100%;
			max-width: 22.9vw
		}
	}
	.goods-right{
		float: left;
		text-align: left;
		padding-left: 5vw;
		position: relative;
		height: 100%;
		.bottom{
			position: absolute;
			bottom: 0
		}
		.title{
			line-height: 6vw
		}
	}
}

</style>