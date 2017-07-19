<template>
  <div class="index-page">
    <search
    v-model="searchValue"
    position="absolute"
    :auto-fixed="autoFixed"
    @on-cancel="submit"
    auto-scroll-to-top
    cancel-text="搜索"
    ref="search"></search>
    <swiper :aspect-ratio="160/375" auto class="index-swiper" dots-position="center">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in imgList" :key="index"><img :src="item.img" :alt='item.title' @click="goWWW(item.link)"></swiper-item>
    </swiper>
    <div class="index-middle-tittle">
      会员信息
    </div>
    <flexbox class="index-page-mypoints flex1">
      <flexbox-item>
        <div class="flex-demo">
          <img :src="myCardSrc" class="myCard">
        </div>
          <div class="my-club">
          <span v-if="login">Mercedes 车主俱乐部钻卡</span>
      </div>
      </flexbox-item>
      <flexbox-item v-show="login">
        <div class="flex-demo myPoints" >
          <div>您当前的个人积分是</div>
          <div >
            <span v-text="loginUser.score"></span>
            <span>分</span>
          </div>
          <div>
            <button class="soonBtn">立即兑换</button>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item v-show="!login">
        <div class="flex-demo myPoints" >
          <div class="font-11">您好，欢迎来到</div>
            <div >
              <span class="font-13">积分商城</span>
              
            </div>
            <div>
              <button class="soonBtn" @click="goWWW('https://meclub-cn-test.mercedes-benz.com/wechat/index/gotoLogin?pointsmall_url=http://123.57.157.212:8080/pmall/index.html#/path')">登录/注册</button>
            </div>
          </div>
      </flexbox-item>
    </flexbox>
    <flexbox class="index-page-mypoints2">
      <flexbox-item v-for="(item,index) in indexBtns" :key="index">
        <div class="flex-demo" @click="goNext(item.path)">
          <div :class="item.class" class="index-icon"></div>
          <div v-text="item.title"></div>
        </div>
      </flexbox-item>
      
    </flexbox>
    <div class="index-middle-tittle">
      分类推荐
    </div>
    <flexbox :gutter="0" wrap="wrap" class="index-page-classification" >
      <flexbox-item :span="1/3" v-for="(item,index) in myPics" :key="index" >
        <div class="flex-demo fenleiBox" @click="goList(item.title,item.id)">
          <div>
            <img :src="item.src" :class="item.class">
            <div class="index-bottom">
              <div v-text="item.title"></div>
              <div v-text="item.titleEn"></div>
            </div>
            
            
          </div>
        </div>
      </flexbox-item>
      
    </flexbox>
    <div class="index-middle-tittle" v-if=false>
      主编推荐
    </div>
    <swiper :aspect-ratio="160/375" auto v-if=false>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo05_list" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <div class="index-middle-tittle">
      精品推荐
    </div>
    <my-nav :items="myBoutique"></my-nav>
  </div>
</template>

<script>
import myNav from '../components/nav'
import {state} from 'vuex'
import { Swiper, SwiperItem,Grid, GridItem, GroupTitle,Flexbox, FlexboxItem, Divider,Search} from 'vux'
import { mapGetters } from 'vuex'

const imgList = [
  'http://www.wallcoo.com/engine/Mercedes-Benz_SLK-Class/wallpapers/1920x1200/SLK-Class_05_02-2011.jpg',
  'http://a0.att.hudong.com/86/56/19300001355547133325564075948.jpg',
  'http://desk.fd.zol-img.com.cn/g5/M00/03/04/ChMkJlbLGGyIXsdXAAHRIxkr3ccAALL-QCc6DMAAdE7705.jpg'
]

export default {
  name: 'hello',
  data () {
    return {
      autoFixed:false,
      login:false,
      show:true,
      msg: '这是起始页',
      yes:false,
      searchValue:'',
      demo05_list: imgList,
      myCardSrc: require('../assets/imgs/bccard.png'),
      imgList:[],
      indexBtns:[
        {
          title:'购物车',
          path:'/cart',
          class:'index-cart'
        },
        {
          title:'个人订单',
          path:'/order',
          class:'index-order'
        },
        {
          title:'个人信息',
          path:'/personal',
          class:'index-personal'
        },
        {
          title:'联系客服',
          path:'/contact',
          class:'index-contact'
        },
      ],
      myPics:[
        {
          src:require('../assets/imgs/benz.png'),
          title:'品牌生活',
          titleEn:'Mercedes me',
          class:'index-page-classification-img',
          id:'767'
        },
        {
          src:require('../assets/imgs/box.png'),
          title:'超值礼品',
          titleEn:'Mercedes me',
          class:'index-page-classification-img1',
          id:'776'
        },
        {
          src:require('../assets/imgs/work.png'),
          title:'精英课选',
          titleEn:'Mercedes me',
          class:'index-page-classification-img2',
          id:'778'
        },
        {
          src:require('../assets/imgs/fue.png'),
          title:'尊享礼券',
          titleEn:'Mercedes me',
          class:'index-page-classification-img3',
          id:'779'
        },
        {
          src:require('../assets/imgs/car.png'),
          title:'无忧出行',
          titleEn:'Mercedes me',
          class:'index-page-classification-img4',
          id:'780'
        },
        {
          src:require('../assets/imgs/bag.png'),
          title:'缤纷旅途',
          titleEn:'Mercedes me',
          class:'index-page-classification-img5',
          id:'781'
        },
      ],
      myBoutique:[
        
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
    Divider,
    Search
    
  },
  methods:{
    //跳转分类列表页
    goList:function(title,id){
      this.$router.push({path: 'lists', query: { 'title': title,'id':id}})
    },
    goWWW:function(url){
      window.location.href=url
    },
    goNext:function(pathUrl){
      this.$router.push({path:pathUrl})
    },
    submit:function(){
      this.$router.push({path:'/search',query: { 'search': this.searchValue}})
    },
    init:function(){
      //判断当前用户是否登录
      let userToken=this.$route.query.token
      if(userToken){
        this.$http.post(this.$Api('/login'),{token:userToken},{emulateJSON: true}).then((response)=>{
          if(response.data.code===1){
            this.login=true
            let userDetail=JSON.parse(response.bodyText).data 
            this.$store.dispatch({type: 'setLogin',data: userDetail})
          }else{
            return
          }
          
        },(error)=>{
                console.log(error);
          }
        );
      }
      //初始化时候调取imgurl
      this.$http.get(this.$Api('/home/getIndexPicList')).then((response) => {
          let imgList=JSON.parse(response.bodyText).data
          this.imgList=imgList
          
      }, (response) => {
          // error callback
      });

      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getCommendProdList')).then((response) => {
          this.myBoutique=JSON.parse(response.bodyText).data
          
      }, (response) => {
          // error callback
      });
    }
  },          
  mounted:function(){
    this.init()
  },
  computed: {
  // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      loginUser:'getLogin'
      
    })
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>
