<template>
  <div>
    <div class="pageTitle">
      <span>商品详情</span>
      <div class="back" @click="goback"></div>
    </div>
    <swiper :aspect-ratio="160/375" auto>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo05_list" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="bootomNav">
    	<flexbox :gutter="0">
    		<flexbox-item><div class="flex-demo points">10000<span>积分</span></div></flexbox-item>
			<flexbox-item :span="3.5"><div class="flex-demo car">加入购物车</div></flexbox-item>
			<flexbox-item :span="3.5"><div class="flex-demo now">立即兑换</div></flexbox-item>
	    </flexbox>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem,Grid, GridItem, GroupTitle,Flexbox, FlexboxItem, Divider,ViewBox} from 'vux'
const imgList = [
  'http://www.wallcoo.com/engine/Mercedes-Benz_SLK-Class/wallpapers/1920x1200/SLK-Class_05_02-2011.jpg',
  'http://a0.att.hudong.com/86/56/19300001355547133325564075948.jpg',
  'http://desk.fd.zol-img.com.cn/g5/M00/03/04/ChMkJlbLGGyIXsdXAAHRIxkr3ccAALL-QCc6DMAAdE7705.jpg'
]
export default {
  name: '',
  data () {
    return {
    	demo05_list: imgList,
    	pageTitle:this.$route.query.title,
    }
  },
  components:{
    Swiper,
    SwiperItem,
    Grid, 
    GridItem, 
    GroupTitle,
    Flexbox, 
    FlexboxItem, 
    Divider,
    ViewBox
  },
  methods:{
    goback:function(){
      this.$router.go(-1)
    }
  },          
  mounted:function(){
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.bootomNav{
	position: absolute;
	bottom: 0;
	color: #fff;
	width: 100%;
	height:13.33vw;
	line-height: 13.33vw;
	.flex-demo{
		text-align: center;
		font-family:AppleSystemUIFont;
		font-size:16px;
		color:#ffffff;
		letter-spacing:0;
	}
	.points{
		background:#292929;
		font-family:PingFangSC-Regular;
		font-size:18px;
		color:#ffffff;
		letter-spacing:0;
		span{
			font-size: 12px;
			display: inline-block;
			padding-left: 10px;
			color: #888
		}
	}
	.car{
		background:#4a4a4a;
	}
	.now{
		background:#1dafed;
		box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
		border-radius:0 1px 1px 1px;

	}
}
</style>
