<template>
  <div class="index-page">
    <swiper :aspect-ratio="160/375" auto class="index-swiper">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <flexbox class="index-page-mypoints">
      <flexbox-item>
        <div class="flex-demo">
          <img :src="myCardSrc" class="myCard">
        </div>
        <div class="my-club">
      Mercedes 车主俱乐部钻卡
    </div>
      </flexbox-item>
      <flexbox-item><div class="flex-demo myPoints" >
        <div>您当前的个人积分是</div>
        <div >
          <span>5000</span>
          <span>分</span>
        </div>
        <div>
          <button class="soonBtn">立即兑换</button>
        </div>
      </div></flexbox-item>
    </flexbox>
    <flexbox class="index-page-mypoints2">
      <flexbox-item>
        <div class="flex-demo">
          <i class="iconfont icon-gouwuche"></i>
          <div>购物车</div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <i class="iconfont icon-gerenzhongxindingdan"></i>
          <div>个人订单</div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <i class="iconfont icon-gerenziliao"></i>
          <div>个人信息</div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <i class="iconfont icon-call-center"></i>
          <div>联系客服</div>
        </div>
      </flexbox-item>
    </flexbox>
    <div class="index-middle-tittle">
      分类推荐
    </div>
    <flexbox :gutter="0" wrap="wrap" class="index-page-classification" >
      <flexbox-item :span="1/3" v-for="item in myPics">
        <div class="flex-demo">
          <div>
            <img :src="item.src" class="index-page-classification-img">
            <div v-text="item.title"></div>
            <div v-text="item.titleEn"></div>
            
          </div>
        </div>
      </flexbox-item>
      
    </flexbox>
    <div class="index-middle-tittle">
      主编推荐
    </div>
    <swiper :aspect-ratio="160/375" auto>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="index-middle-tittle">
      主编推荐
    </div>
    <div class="index-Boutique">
      <div class="index-Boutique-div" v-for="item in myBoutique">
        <div class="index-Boutique-div-left">
          <img :src="item.src">
        </div>
        <div class="index-Boutique-div-right">
          <div v-text="item.title">
            上门取车保养
          </div>
          <div v-text="item.text">
            全店维护，更换机油，定制服务
          </div>
          <div>
            市场价：￥<span v-text="item.money"></span>
          </div>
          <div>
            兑换：<span v-text="item.change"></span>积分
          </div>
          <button>
            立即兑换
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myNav from '../components/nav'
import {state} from 'vuex'
import { Swiper, SwiperItem,Grid, GridItem, GroupTitle,Flexbox, FlexboxItem, Divider} from 'vux'

const imgList = [
  'http://www.wallcoo.com/engine/Mercedes-Benz_SLK-Class/wallpapers/1920x1200/SLK-Class_05_02-2011.jpg',
  'http://a0.att.hudong.com/86/56/19300001355547133325564075948.jpg',
  'http://desk.fd.zol-img.com.cn/g5/M00/03/04/ChMkJlbLGGyIXsdXAAHRIxkr3ccAALL-QCc6DMAAdE7705.jpg'
]

export default {
  name: 'hello',
  data () {
    return {
      msg: '这是起始页',
      yes:false,
      demo04_list: imgList,
      myCardSrc: require('../assets/imgs/bccard.png'),
      myPics:[
        {
          src:require('../assets/imgs/benz.png'),
          title:'品牌生活',
          titleEn:'Mercedes me'
        },
        {
          src:require('../assets/imgs/box.png'),
          title:'品牌生活',
          titleEn:'Mercedes me'
        },
        {
          src:require('../assets/imgs/work.png'),
          title:'品牌生活',
          titleEn:'Mercedes me'
        },
        {
          src:require('../assets/imgs/fue.png'),
          title:'品牌生活',
          titleEn:'Mercedes me'
        },
        {
          src:require('../assets/imgs/car.png'),
          title:'品牌生活',
          titleEn:'Mercedes me'
        },
        {
          src:require('../assets/imgs/bag.png'),
          title:'品牌生活',
          titleEn:'Mercedes me'
        },
      ],
      myBoutique:[
        {
          src:require('../assets/imgs/women.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        {
          src:require('../assets/imgs/radio.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        {
          src:require('../assets/imgs/box.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        {
          src:require('../assets/imgs/door.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        
      ]
    }
  },
  components:{
    myNav,
    Swiper,
    SwiperItem,
    Grid, 
    GridItem, 
    GroupTitle,
    Flexbox, 
    FlexboxItem, 
    Divider
    
  },
  mounted:function(){
    console.log(this.$store)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/hello.less';
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}


a {
  color: #42b983;
}
.none{
  height: 100%;
  width: 0;
  vertical-align: middle;
}

</style>
