<template>
  <div>
    <div class="mubu" v-if="show"></div>
    <div class="pageTitle">
      <span>商品详情</span>
      <div class="back" @click="goback"></div>
    </div>
    <swiper :aspect-ratio="160/375" auto dots-position="center" height="86.6vw" class="detail-swiper">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo05_list" :key="index" :style="background(item)"></swiper-item>
    </swiper>
    <div class="detail-title">
      <div class="detail-title-cn">罗马系列腕表</div>
      <div class="detail-title-en">Merdeces me</div>
    </div>
    <div class="detail-btn">
      <flexbox-item>
        <div class="detail-pointBtn flex-demo">
          10000 <span class="detail-pointBtn-point">积分</span>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="detail-cartBtn flex-demo">
          加入购物车
        </div>
      </flexbox-item>
    </div>
    <flexbox class="detail-changeBtn">
      <flexbox-item>
        <div class="flex-demo " >
          立即兑换
        </div>
      </flexbox-item>
    </flexbox>
    <div>
      <img :src="page" style="width:100%">
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem,Grid, GridItem, GroupTitle,Flexbox, FlexboxItem, Divider,ViewBox} from 'vux'
const imgList = [
  require('../assets/imgs/detail1.png'),
  require('../assets/imgs/detail2.png'),
  require('../assets/imgs/detail3.png'),
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
    		size:'规格：15ml',
        
    	},
      cartBtn:require('../assets/imgs/cart1.png'),
      changeBtn:require('../assets/imgs/change.png'),
      page:require('../assets/imgs/page.png')
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
  },
  methods:{
    goback:function(){
      this.$router.go(-1)
    },
    background:function(item){
      return 'background:url('+item+') no-repeat center center;background-size:50% auto'
    }
  },          
  mounted:function(){
    this.$vux.loading.show({
     text: 'loading'
    })
    setTimeout(() => {
      this.$vux.loading.hide()
      this.show=false
    }, 1000)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/detail.less';
.detail-title{
  color: #fff;
  .detail-title-cn{
    margin: 8px auto;
    font-size: 20px;
  }
  .detail-title-en{
    font-size: 18px;

  }
}
.detail-cartBtn{
  height: 14.6vw;
  width: 40.8vw;
  background:#4a4a4a;
  line-height: 14.6vw;
  color: #fff;
  font-size: 20px;
}
.detail-pointBtn{
  height: 14.6vw;
  line-height: 14.6vw;
  border: 1px solid #1dafed;
  width: 40.8vw;
  text-align: center;
  color: #1dafed;
  box-sizing:border-box;
  font-size: 24px;
  .detail-pointBtn-point{
    font-size: 13px
  }
}
.detail-btn{
  width: 100%;
  padding: 8vw 6.4vw 8vw;
  box-sizing:border-box;
  overflow: hidden;
  div:nth-child(1){
    float: left
  }
  div:nth-child(2){
    float: right
  }
}
.detail-changeBtn{
  height: 14.6vw;
  text-align: center;
  line-height: 14.6vw;
  box-sizing:border-box;
  padding: 5vw 6.4vw 5vw;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
  color: #fff;
  font-size: 24px;
  margin-bottom: 5vw;
  div{
    background:#1dafed;
  }  
}
</style>
