<template>
  <div>
    <div class="mubu" v-if="show"></div>
    <div class="pageTitle">
      <span>商品详情</span>
      <div class="back" @click="goback"></div>
    </div>
    <swiper :aspect-ratio="160/375" auto>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo05_list" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="myPro">
    	<div class="myPro-left">
    		<img :src="myPro.img">
    	</div>
    	<div class="myPro-right">
    		<div v-text="myPro.title" class="myPro-right-title"></div>
    		<button>{{myPro.points}}积分</button>
    		<div class="myPro-right-detail">
    			<div v-text="myPro.xilie"></div>
	    		<div v-text="myPro.color"></div>
	    		<div v-text="myPro.size"></div>
    		</div>
    		
    	</div>
    	
    </div>
    <my-slider></my-slider>
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
import mySlider from '../components/slider'
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
      show:true,
    	pageTitle:this.$route.query.title,
    	myPro:{
    		img:require('../assets/imgs/detailPic1.png'),
    		title:'梅赛德斯 车载固定小型香氛喷雾香水运动激情系列',
    		points:10000,
    		xilie:'香氛系列：绿植类，花香类，柑橘',
    		color:'颜色：淡琥珀色',
    		size:'规格：15ml'
    	}
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
    ViewBox,
    mySlider
  },
  methods:{
    goback:function(){
      this.$router.go(-1)
    }
  },          
  mounted:function(){
    this.$vux.loading.show({
     text: 'loading'
    })
    setTimeout(() => {
      this.$vux.loading.hide()
      this.show=false
    }, 2000)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/detail.less';


</style>
