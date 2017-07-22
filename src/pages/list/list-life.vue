<template>
  <div class="life">
    <div class="mubu" v-if="show"></div>
    <back :title="pageTitle"></back>
    <tab :line-width="1" custom-bar-width="60px" active-color='#ffffff' class="life-bar" bar-active-color="#1dafed">
      <tab-item selected @click.native="showMe(1)">男士精品</tab-item>
      <tab-item @click.native="showMe(2)">女士精品</tab-item>
    </tab>
    <div v-if="manShow">
	    <div class="life-img">
	  		<img :src="lifeTopImg">
	  	</div>
	  	<div class="list-box">
	  		<div v-for="(item,index) in myBoutique" key=index class="list-box-inner">
	  			<div class="list-box-inner-inner">
	  				<div class="left">
	  					<img :src="item.pic">
	  				</div>
	  				<div class="right">
	  					<div class="list-name">
	  						<div v-text="item.name" class="list-title"></div>
	  						<div class="list-title-en">Merdeces me</div>
	  					</div>
	  					<div v-text="item.brief" class="list-brief"></div>
	  					<div>
	  						<span v-text="item.point" class="list-point"></span>
	  						<span>积分</span>
	  					</div>
	  					<div class="changeBtn">立即兑换</div>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
    </div>
	
    
  </div>
</template>



<script>
import myNav from '../../components/nav'
import back from '../../components/backNav'
import { Tab, TabItem } from 'vux'
export default {
  
  components: {
    myNav,
    back,
    Tab, 
    TabItem
  },
  data () {
    return {
      pageTitle:this.$route.query.title,
      id:this.$route.query.id,
      myBoutique:[],
      show:true,
      lifeTopImg:require('../../assets/imgs/life-top.png'),
      manShow:true
    }
  },
  methods: {
    init:function(){
      this.$vux.loading.show({
       text: 'loading'
      })
      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getProdListByCategory'),{params: { 'id': this.id }}).then((response) => {
          this.myBoutique=JSON.parse(response.bodyText).data
          console.log(this.myBoutique)
          this.$vux.loading.hide()
          this.show=false
      }, (response) => {
          // error callback
      });
    },
    showMe:function(n){
      if(n==1){
      	this.manShow=true;
      }else{
      	this.manShow=false
      }
    },
  },
  mounted:function(){
    this.init()
  }
}
</script>
<style lang='less' scoped>
@import '../../assets/css/global.less';
.life-img{
	width: 100%;
	img{
		width: 100%
	}
}
.life{
	width: 100vw;
	overflow: hidden;
	.vux-tab{
		background: @bgcolor !important;
		margin-bottom: 1px
	}
	.vux-tab .vux-tab-item{
		background: none !important
	}
	.life-bar{
		height: 10vw
	}
}
.list-box{
	padding: 0 8vw 0;
	
	.left{
		width: 50%;
		
	} 
	.right{
		width: 50%
	}
	.list-title{
		color: #dfdfdf;
		font-size: 20px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.list-title-en{
		color: #dfdfdf;
		font-size: 18px;
		line-height: 26px;
	}
	.list-brief{
		margin: 2vw 0;
		font-size: 9px;
		color: #ffffff;
		overflow: hidden;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.list-point{
		font-size: 18px;
		color: #dfdfdf;
	}
	.list-point+span{
		font-size: 9px;
		color: #dfdfdf;
	}
	.changeBtn{
		width: 24.8vw;
		height: 6.133vw;
		
		text-align: center;
		border: 1px solid #1dafed;
		box-sizing:border-box;
		line-height: 6.133vw;
		color: #1dafed;
		margin-top: 2vw
	}
}
.list-box-inner{
	height: 44.8vw;
	padding-bottom:12.2vw;
	position: relative;
	
	.left{
		height: 100%;
	}
}
.list-box-inner:nth-child(odd){
	.left{
		float: left;
		img{
			margin-top: 5vw;
			width: 32.2vw
		}
	}
	.right{
		text-align: right;
		float: right
	}
	.changeBtn{
		float: right;
	}
}
.list-box-inner:nth-child(even){
	.left{
		float: right;
		img{
			height: 56.3vw
		}
	}
	.right{
		text-align: left;
		float: left
	}
}
.list-box-inner:nth-child(1){
	.list-name{
		position: absolute;
		top: -12vw;
		right: 0;
		width: inherit;
	}
	.left{
		padding-top: 5vw
	}
	img{
		margin-top: 0!important
	}
}
.list-box-inner:nth-child(odd):after{
	content: '';
	height: 6.366vw;
	width: 130%;
	display: block;
	position: absolute;
	bottom: 7.5vw;
	transform:rotate(7deg);
	left: -10vw;
	img{
		max-height: 100%;
		margin-top: 5vw
	}
}
.list-box-inner:nth-child(even):after{
	content: '';
	height: 6.366vw;
	width: 130%;

	display: block;
	position: absolute;
	bottom: 7.5vw;
	transform:rotate(353deg);
	left: -10vw
}
.list-box-inner:after{
	background: url(../../assets/imgs/line.png) repeat center center;
	background-size:auto 100%; 
}
.list-box-inner-inner{
	overflow: hidden;
	height: 100%;
	img{
		max-height: 38vw
	}
}
</style>