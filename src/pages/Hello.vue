<template>
  <div>
    <div class="contactBox" v-if="showContact">
      <div class="phoneBox">
        <img src="../assets/imgs/cha.png" class="cha" @click="showContact=false">
        <div v-if="showBox=='phone'">
          <div class="font-12 color-91 phone-title">客服热线</div>
          <div class="font-14 fff phone">4008-332-711</div>
          <a href="tel:4008-332-711">
            <div class="phoneImg">
            </div>
          </a>
        </div>
        <div v-if="showBox=='zun'">
          <div class="zunxiangImg">
          </div>
          <div class="font-12 color-88">敬请期待...</div>
        </div>
        <div v-if="showBox=='bin'">
          <div class="binfenImg">
          </div>
          <div class="font-14 fff margin-bottom-9">缤纷旅途</div>
          <div class="font-12 color-88">敬请期待...</div>
        </div>
        <div v-if="showBox=='expire'">
          <div class="expireImg">
          </div>
          <div class="font-14 fff margin-bottom-9">秒杀活动已过期</div>
          <div class="font-12 color-88">敬请期待下一期…</div>
        </div>
      </div>
    </div>
    <scroller lock-x scrollbar-y use-pullup height="-10.66vh" @on-pullup-loading="load1" ref="demo1" :pullup-config="{content: '上拉刷新',
  downContent: '',
  upContent: '',
  loadingContent: '加载中...',
  }">
      <div class="index-page">
        <search v-model="searchValue" position="absolute" :auto-fixed="autoFixed" @on-focus="submit" placeholder="搜索" auto-scroll-to-top ref="search"></search>
        <swiper :aspect-ratio="160/375" auto class="index-swiper" dots-position="center">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in imgList" :key="index"><img :src="item.img" :alt='item.title' @click="goWWW(item.link)"></swiper-item>
        </swiper>
        <div class="index-middle-tittle font-10">
          {{"会员信息"|tr}}
        </div>
        <flexbox class="index-page-mypoints flex1">
          <flexbox-item>
            <div class="flex-demo">
              <img :src="myCardSrc" class="myCard">
            </div>
            <!--
            <div class="my-club">
              <span v-if="login" class="font-9">{{"Mercedes me 车主俱乐部"|tr}}</span>
            </div>
            -->
          </flexbox-item>
          <flexbox-item v-show="login">
            <div class="flex-demo myPoints">
              <div class="font-11 pointTitle">{{"当前积分"|tr}}</div>
              <div>
                <!-- <span v-text="loginUser.score"></span> -->
                <span class="font-20">{{loginUser.points}}</span>
              </div>
              <!-- <div>
            <button class="soonBtn">{{"为您甄选"|tr}}</button>
          </div> -->
            </div>
          </flexbox-item>
          <flexbox-item v-show="!login">
            <div class="flex-demo myPoints">
              <div class="font-11">您好，欢迎来到</div>
              <div>
                <span class="font-13">积分商城</span>
              </div>
              <div>
                <!-- <button class="soonBtn" @click="goLogin()">{{"登录/注册"|tr}}</button> -->
                <a :href='loginUrl' class="soonBtn" @click="goLogin()">{{"登录/注册"|tr}}</a>
              </div>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="index-page-mypoints2" :gutter="0">
          <flexbox-item v-for="(item,index) in indexBtns" :key="index">
            <div class="flex-demo" @click="goNext(item.path)">
              <div :class="item.class" class="index-icon"></div>
              <div v-text="" class="font-12">
                {{item.title|tr}}
              </div>
            </div>
            <!--         <a href="tel:4008-332-711" v-if="item.title=='联系客服'">
          <div class="flex-demo english" @click="goNext(item.path)">
            <div :class="item.class" class="index-icon"></div>
            <div v-text="" class="font-12">
              {{item.title|tr}}
            </div>
          </div>
        </a> -->
          </flexbox-item>
        </flexbox>
        <div class="index-middle-tittle font-10">
          {{"分类推荐"|tr}}
        </div>
        <flexbox :gutter="0" wrap="wrap" class="index-page-classification">
          <flexbox-item :span="1/3" v-for="(item,index) in myPics" :key="index">
            <div class="flex-demo fenleiBox" @click="goList(item.title,item.id,item.path)">
              <div>
                <img :src="item.src" class="index-page-classification-img">
                <div class="index-bottom">
                  <div>
                    {{item.title|tr}}
                  </div>
                  <!-- <div v-text="item.titleEn"></div> -->
                </div>
              </div>
            </div>
          </flexbox-item>
        </flexbox>
        <div class="index-middle-tittle font-10" v-if=false>
          {{"主编推荐"|tr}}
        </div>
        <swiper :aspect-ratio="160/375" auto v-if=false>
          <swiper-item class="swiper-demo-img" v-for="(item, index) in demo05_list" :key="index"><img :src="item"></swiper-item>
        </swiper>
        <div class="index-middle-tittle font-10">
          {{"精品推荐"|tr}}
        </div>
        <my-nav :items="myBoutique"></my-nav>
      </div>
    </scroller>
    <confirm v-model="confirmShow" @on-cancel="onCancel" @on-confirm="onConfirm()" confirm-text="是" cancel-text="否">
      <div style="height:100%;color:#737373;line-height:1;text-align:center;" class="confirmBox font-18">
        <img src="../assets/imgs/tanhao.png" class="confirm-tanhao">
        <div class="confirm-text">请先登录</div>
      </div>
    </confirm>
  </div>
</template>
<script>
import myNav from '../components/nav'
import { state } from 'vuex'
import { Swiper, SwiperItem, Grid, GridItem, GroupTitle, Flexbox, FlexboxItem, Divider, Search, Scroller, Confirm } from 'vux'
import { mapGetters } from 'vuex'
import Apis from '../configers/Api'
import EnJson from "../configers/En"

const imgList = [
  'http://www.wallcoo.com/engine/Mercedes-Benz_SLK-Class/wallpapers/1920x1200/SLK-Class_05_02-2011.jpg',
  'http://a0.att.hudong.com/86/56/19300001355547133325564075948.jpg',
  'http://desk.fd.zol-img.com.cn/g5/M00/03/04/ChMkJlbLGGyIXsdXAAHRIxkr3ccAALL-QCc6DMAAdE7705.jpg'
]

export default {
  name: 'hello',
  data() {
    return {
      autoFixed: false,
      login: false,
      show: true,
      msg: '这是起始页',
      yes: false,
      searchValue: '',
      demo05_list: imgList,
      myCardSrc: require('../assets/imgs/bccard.png'),
      imgList: [],
      showContact: false,
      confirmShow: false,
      indexBtns: [{
          title: '购物车',
          path: '/cart',
          class: 'index-cart'
        },
        {
          title: '个人订单',
          path: '/order',
          class: 'index-order'
        },
        {
          title: '个人信息',
          path: '/personal',
          class: 'index-personal'
        },
        {
          title: '联系客服',
          path: '/contact',
          class: 'index-contact'
        },
      ],
      myPics: [{
          src: require('../assets/imgs/brand.png'),
          title: '品牌生活',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img',
          id: '767',
          path: '/life'
        },
        /*
        {
          src: require('../assets/imgs/gift.png'),
          title: '超值礼品',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img1',
          id: '776',
          path: '/present'
        },
        */
        {
          src: require('../assets/imgs/kill.png'),
          title: '限时秒杀',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img1',
          id: '776'
        },
        {
          src: require('../assets/imgs/class.png'),
          title: '精英课选',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img2',
          id: '778'
        },
        {
          src: require('../assets/imgs/voucher.png'),
          title: '尊享礼券',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img3',
          id: '779'
        },
        {
          src: require('../assets/imgs/car.png'),
          title: '无忧出行',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img4',
          id: '780'
        },
        {
          src: require('../assets/imgs/travel.png'),
          title: '缤纷旅途',
          titleEn: 'Mercedes me',
          class: 'index-page-classification-img5',
          id: '781'
        },
      ],
      myBoutique: [

      ],
      pageNumber: 1,
      pageSize: 10,
      showBox: '',      
      loginUrl:this.$BasePayUrl(this.$baseEncode(this.$BaseUrl()))
    }
  },
  components: {
    myNav,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    Divider,
    Search,
    Scroller,
    Confirm

  },
  methods: {
    onConfirm: function() {
      this.goLogin()
    },
    onCancel: function() {

    },
    //跳转分类列表页
    goList: function(title, id, path) {
      let p = path == undefined ? 'lists' : path
      if (path == undefined) {
        if (title == '无忧出行') {
          window.location.href =this.$BenzUrl('/wechat/main/rights')
        } else if (title == '精英课选') {
          window.location.href =this.$BenzUrl('/wechat/main/activityDetail?id=31')
        } else if (title == '限时秒杀') {
        	if( this.$store.state.showCash && this.$store.state.jdTel.indexOf(this.loginUser.mobile)>=0){
						this.$router.push({ path: p, query: { 'title': title, 'id': id } })
					}else{
						Apis.getSecKillTimeList().then(data => {
	            console.log(data.data[0])
	            if (data.data[0] && data.data[0].status != 3) {
	              this.$router.push({ path: '/hot' })
	            } else {
	              this.showBox = 'expire';
	              this.showContact = true
	            }
	          })
					}

        } else if (title == '尊享礼券') {
          this.showContact = true;
          this.showBox = 'zun'
        } else {
          this.showContact = true;
          this.showBox = 'bin'
        }
        return
      }

      this.$router.push({ path: p, query: { 'title': title, 'id': id } })
    },
    goWWW: function(url) {
      if (url.indexOf('hot') > 0) {
        Apis.getSecKillTimeList().then(data => {
          console.log(data.data[0])
          if (data.data[0] && data.data[0].status != 3) {
            this.$router.push({ path: '/hot' })
          } else {
            this.showBox = 'expire';
            this.showContact = true
          }
        })

      } else {
        window.location.href = url
      }

      // if(url.indexOf('/hot')>0){
      //   this.$router.push({ path: '/hot'})
      // }else{
      //   window.location.href = url
      // }

    },
    goLogin: function() {
    	localStorage.setItem("prod_id", "");  //先把用于区分首页还是商品详情登陆的id清空，否则会跳到商品详情页面
      // window.location.href = 'https://meclub-cn-test.mercedes-benz.com/wechat/index/gotoLogin?pointsmall_url=' + this.$baseEncode("http://mall-test.mercedesmeclub.yuyuanhz.com/index.html")

    },
    goNext: function(pathUrl) {
      if (this.login || pathUrl == "/contact") {
        if (pathUrl == "/contact") {
          this.showContact = true;
          this.showBox = 'phone'
        } else {
          this.$router.push({ path: pathUrl })
        }

      } else {
        // this.confirmShow=true;
        this.$toast.show({
          text: '请先登录',
          position: 'middle',
          value: true
        })
        return
        // this.$vux.toast.show({
        //   text: '请先登陆',
        //   type: 'warn',
        //   isShowMask: true,
        //   position: 'middle'
        // })
      }
    },
    submit: function() {
      this.$router.push({ path: '/search', query: { 'search': this.searchValue } })
    },
    init: function() {
      //判断当前用户是否登录
      // this.$toast.show({
      //   text: '测试',
      //   position: 'middle',
      //   value:true
      // })
      let userToken = this.$route.query.token
      let user = this.$route.query.user
      
      let subNumber = "";
      let success = 0;
      if (this.$route.query.subNumber) {
        subNumber = this.$route.query.subNumber
        success = this.$route.query.success
      }
      
      let prod_id = "";
      if (localStorage.getItem("prod_id")) {
      	prod_id = localStorage.getItem("prod_id");
      }
      
      let pandunLogin = this.$store.state.loginUser.name == undefined
      console.log(pandunLogin)
      if (userToken && user ) {
        Apis.login({ token: userToken, 'user': user }).then(data => {
          if (data.code === 1) {
            this.login = true
            let userDetail = data.data
            userDetail.token = this.$route.query.token
            userDetail.user = this.$route.query.user
            console.log(data.data.carImg)
            this.myCardSrc = require("../assets/imgs/" + data.data.carImg + ".png");
            sessionStorage.setItem("setLogin", JSON.stringify(userDetail))
            this.$store.dispatch({ type: 'setLogin', data: userDetail })
            window.location=location.href.substring(0,location.href.indexOf('?'));
            this.$router.push({ path: '/path' })
            
            if (subNumber != "") {
              if (success == 1) {
                this.$router.push({ path: '/success', query: { 'subNumber': subNumber, "success": success } })
              } else {
                this.$router.push({ path: '/fail', query: { 'subNumber': subNumber, "success": success } })
              }
            }
	
						if (prod_id != "") {
							localStorage.setItem("prod_id", "");  //把用于区分首页还是商品详情登陆的id清空
              this.$router.push({ path: '/detail', query: { 'prod_id': prod_id} })
            }
          }
        })
      } else if (!pandunLogin) {
        this.myCardSrc = require("../assets/imgs/" + this.$store.state.loginUser.carImg + ".png"),
          this.login = true
        
      } else {
        this.login = false
      }


      //初始化时候调取imgurl
      this.$http.get(this.$Api('/home/getIndexPicList')).then((response) => {
        let imgList = response.data.data
        this.imgList = imgList

      }, (response) => {
        // error callback
      });

      //获取精品推荐列表
      Apis.getCommendProdList({ pageNumber: this.pageNumber, pageSize: this.pageSize }).then(data => {
        this.myBoutique = data.data;
        this.$nextTick(() => {
          this.$refs.demo1.reset()
        })
        if (!data.isLast) {
          this.pageNumber++
        } else {
          this.$refs.demo1.disablePullup()
        }

      })
    },
    load1: function() {
      setTimeout(() => {
        // 查询
        Apis.getCommendProdList({ pageNumber: this.pageNumber, pageSize: this.pageSize }).then(data => {
          this.myBoutique = this.myBoutique.concat(data.data);
          this.$nextTick(() => {
            this.$refs.demo1.reset()
          })
          if (!data.isLast) {
            this.pageNumber++
          } else {
            this.$refs.demo1.disablePullup()
          }
        })
        setTimeout(() => {

          this.$refs.demo1.donePullup()
        }, 100)
      }, 1000)
    }
  },

  mounted: function() {
    if (this.$route.query.fromPay !== undefined) {
      this.$router.push({ path: '/path' })
      this.$router.push({ path: '/order' })
    }
    this.init()
  },
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      loginUser: 'getLogin'

    })
  },
  filters: {
    tr: function(v) {
      // return EnJson[v]
      return v
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/hello.less';
@import '../assets/css/global.less';
h1,
h2 {
  font-weight: normal;
}

.pointTitle {
  line-height: 10vw
}

ul {
  list-style-type: none;
  padding: 0;
}


a {
  color: #42b983;
}

.none {
  height: 100%;
  width: 0;
  vertical-align: middle;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}

a {
  text-decoration: none;
}

.contactBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  .phoneBox {
    position: absolute;
    background: rgba(65, 65, 65, 0.8);
    border-radius: 4px;
    .px2vw(width, 250);
    .px2vw(height, 192);
    top: 50vh;
    left: 50%;
    .px2vw(margin-left, -125);
    .px2vw(margin-top, -96);
  }
  .phone-title {
    .px2vw(margin-top, 34);
    .px2vw(margin-bottom, 14);
  }
  .cha {
    position: absolute;
    .px2vw(height, 13);
    .px2vw(width, 13);
    .px2vw(right, 13);
    .px2vw(top, 13);
  }
  .phoneImg {
    background-color: #1dafed !important;
    .px2vw(width, 50);
    .px2vw(height, 50);
    border-radius: 100%;
    .px2vw(margin-top, 28);
    .px2vw(margin-left, 100);
    background: url(../assets/imgs/contactPhone.png) center center no-repeat;
    background-size: 50%;
  }
  .binfenImg {
    .px2vw(width, 80);
    .px2vw(height, 110);
    border-radius: 100%;
    .px2vw(margin-top, 28);
    .px2vw(margin-left, 89);
    background: url(../assets/imgs/binfen.png) center center no-repeat;
    background-size: 87%;
  }
  .zunxiangImg {
    .px2vw(width, 163);
    .px2vw(height, 110);
    border-radius: 100%;
    .px2vw(margin-top, 28);
    .px2vw(margin-left, 37);
    background: url(../assets/imgs/zunxiang.png) center center no-repeat;
    background-size: 87%;
  }
  .expireImg {
    .px2vw(width, 94);
    .px2vw(height, 94);
    border-radius: 100%;
    .px2vw(margin-top, 28);
    .px2vw(margin-left, 78);
    background: url(../assets/imgs/expire.png) center center no-repeat;
    background-size: 87%;
  }
}

</style>
