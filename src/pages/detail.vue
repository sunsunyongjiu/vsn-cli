<template>
  <div class="vsn-wrap">
    <!--
    <div class="pageTitle">
      <span class="font-18">商品详情</span>
       <div class="back" @click="goback"></div> 
    </div> 
    -->
    <div class="vsn-main">
      <div class="detail-padding-bottom-50">
        <swiper :aspect-ratio="300/375" auto dots-position="center" class="detail-swiper" :show-dots="dotShow">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in detailObj.topImg" :key="index" :style="background(item.file_path)"></swiper-item>
        </swiper>
        <div class="detail-title">
          <div class="detail-title-cn font-20" v-text="detailObj.name"></div>
          <div v-text="detailObj.brief" class="font-11 color-91"></div>
          <!-- <div class="detail-title-en">Merdeces me</div> -->
        </div>
        <div class="detail-pointBtn" v-if="detailObj.sellType==0">
          <span class="font-10">￥ </span><span v-text="detailObj.cash" class="font-22"></span>
        </div>
        <div class="detail-pointBtn font-20" v-if="detailObj.sellType==1">
          <span v-text="detailObj.point" class="font-22"></span> <span class="detail-pointBtn-point">积分</span>
        </div>
        <div style="text-align:left" class="sevenBox" v-if="detailObj.is7return==1">
          <img src="../assets/imgs/seven.png">
          <span class="ba seven font-10">支持七天无理由退货</span>
        </div>
        <div>
          <div v-html="detailObj.content" class="innerDetail font-12"></div>
        </div>
        <div v-transfer-dom>
          <popup v-model="popShow" position="bottom" height="100vw" class="detailPop">
            <div class="pop-title">
              <img src="../assets/imgs/cha.png" class="cha" @click="changePopShow()">
              <div class="pop-left">
                <img :src="detailObj.pic">
              </div>
              <div class="pop-right">
                <div class="pop-right-title font-18" v-text="detailObj.name"></div>
                <!-- <div class="pop-right-en font-14">Merdeces Me</div> -->
                <div class="pop-right-point font-18" v-if="detailObj.sellType==1"><span class="basicColor" v-text="detailObj.point"></span><span class="font-9">积分</span></div>
                <div class="pop-right-point font-18" v-if="detailObj.sellType==0"><span class="font-9">￥</span><span class="basicColor" v-text="detailObj.cash"></span></div>
              </div>
            </div>
            <div class="pop-size fff">
              <div v-for="(items,n) in chooses" key=n>
                <div class="pop-size-title font-15" v-text="items.title"></div>
                <div class="box">
                  <checker v-model="checkedList[n]" default-item-class="demo1-item" selected-item-class="demo1-item-selected" type="radio" radio-required>
                    <checker-item :value="item" v-for="(item, index) in items.checks" :key="index" radio-required>{{item.value}}</checker-item>
                  </checker>
                </div>
              </div>
              <div class="pop-num">
                <div class="pop-num-zi font-15">数量</div>
                <div class="pop-num-shu">
                  <div class="pop-num-left" @click="plus(-1)">-</div>
                  <div v-text="countNum" class="count"></div>
                  <div class="pop-num-right" @click="plus(1)">+</div>
                </div>
              </div>
            </div>
            <div>
              <x-button @click.native="goCart" plain class="pop-Btn font-16"> 确定 </x-button>
            </div>
          </popup>
        </div>
      </div>
    </div>
    <div class="detail-btn">
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="detail-cartBtn flex-demo font-16" @click="doChange(1)">
            加入购物车
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo detail-changeBtn font-16" @click="doChange">
            {{detailObj.sellType==0?'立即购买':'立即兑换'}}
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
  <!-- 选择规格 -->
</template>
<script>
import md5 from 'js-md5';
import Apis from '../configers/Api'
import { Swiper, SwiperItem, Grid, GridItem, GroupTitle, Flexbox, FlexboxItem, Divider, ViewBox, TransferDom, Popup, Group, Cell, XButton, Checker, CheckerItem } from 'vux'
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  directives: {
    TransferDom
  },
  data() {
    return {
      isCart: false,

      show: true,
      dotShow: false,
      pageTitle: this.$route.query.title,
      myPro: {
        img: require('../assets/imgs/detailPic1.png'),
        title: '梅赛德斯 车载固定小型香氛喷雾香水运动激情系列',
        points: 10000,
        xilie: '香氛系列：绿植类，花香类，柑橘',
        color: '颜色：淡琥珀色',
        size: '规格：15ml',

      },
      cartBtn: require('../assets/imgs/cart1.png'),
      changeBtn: require('../assets/imgs/change.png'),
      page: require('../assets/imgs/page.png'),
      popShow: false,

      countNum: 1,
      path: "",
      detailObj: '',

      chooses: [],
      checkedList: [],
      bottomShow: false
    }
  },
  components: {
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    Divider,
    ViewBox,
    TransferDom,
    Popup,
    Group,
    Cell,
    XButton,
    Checker,
    CheckerItem
  },
  methods: {
    goback: function() {
      this.$router.go(-1)
    },
    background: function(item) {
      return 'background:url(' + item + ') no-repeat center center;background-size:50% auto'
    },
    doChange: function(n) {
      // 如果没登录
      if (this.$store.state.loginUser.name == undefined) {
        window.location.href = 'https://meclub-cn-test.mercedes-benz.com/wechat/index/gotoLogin?pointsmall_url=' + this.$baseEncode(window.location.href);
        return
      }
      this.popShow = true
      if (n == 1) {
        this.isCart = true
      } else {
        this.isCart = false
      }
    },
    plus: function(n) {
      if (this.detailObj.isSecKill) {
        this.$vux.toast.text('同一商品只能秒杀一件', 'middle')
        return
      }
      if (n == 1) {
        this.countNum++
      } else if (this.countNum <= 1) {
        return
      } else {
        this.countNum--
      }


    },
    changePopShow:function(){
      console.log(1)
      this.popShow=false
    },
    goCart: function() {
      if (this.$store.state.loginUser["ucid"] != undefined) {
        // 在登陆条件下跳转购物车
        // 设置传值
        let cartData = {
          'prodId': this.detailObj.prod_id,
          'basketCount': this.countNum,
          'attribute': JSON.stringify(this.checkedList),
          'isCart': this.isCart
        }

        if (this.detailObj.isSecKill) {

          Apis.getSecKillTimeList().then(data => {

            //秒杀没开始不允许添加
            if (data.data[0] && data.data[0].status == 1) {
              this.$vux.toast.text('秒杀活动未开始', 'middle')
              return
            } else if (data.data[0] && data.data[0].status == 2) {

            } else if (data.data[0] && data.data[0].status == 3) {
              this.$vux.toast.text('秒杀活动已结束', 'middle')
              return
            } else {
              this.$vux.toast.text('秒杀活动已结束', 'middle')
              return
            }

            //秒杀商品要判断是否已经购买过
            if (this.isCart) {
              Apis.getisByProd(this.$store.state.loginUser.token, { 'prodId': this.detailObj.prod_id }).then(data => {
                console.log(data)
                if (data == 0) {
                  //添加到购物车
                  Apis.insertBasket(this.$store.state.loginUser.token, cartData).then(data => {
                    console.log(data)
                    if (this.isCart) {
                      this.$router.push({ path: '/cart', query: { 'isCash': this.detailObj.sellType } })
                    } else {
                      this.$router.push({ path: '/sureOrder', query: { 'selectIds': data } })
                    }
                  });
                } else {
                  this.$vux.toast.text('同一商品只能秒杀一件', 'middle')
                  return
                }
              })
            } else {
              Apis.getisByProdInOrder(this.$store.state.loginUser.token, { 'prodId': this.detailObj.prod_id }).then(data => {
                console.log(data)
                if (data == 0) {
                  //添加到购物车
                  Apis.insertBasket(this.$store.state.loginUser.token, cartData).then(data => {
                    console.log(data)
                    if (this.isCart) {
                      this.$router.push({ path: '/cart', query: { 'isCash': this.detailObj.sellType } })
                    } else {
                      this.$router.push({ path: '/sureOrder', query: { 'selectIds': data } })
                    }
                  });
                } else {
                  this.$vux.toast.text('同一商品只能秒杀一件', 'middle')
                  return
                }
              })
            }

          })

        } else {
          //添加到购物车
          Apis.insertBasket(this.$store.state.loginUser.token, cartData).then(data => {
            console.log(data)
            if (this.isCart) {
              this.$router.push({ path: '/cart', query: { 'isCash': this.detailObj.sellType } })
            } else {
              this.$router.push({ path: '/sureOrder', query: { 'selectIds': data } })
            }
          });
        }
      } else {
        this.$vux.toast.show({
          text: '请先登录',
          type: 'warn',
          isShowMask: true,
          position: 'middle'
        })
      }


    },
    init: function() {
      let _this = this
      this.$http.get(this.$Api('/home/getProdDetail'), { params: { 'prodId': this.$route.query.prod_id } }).then((response) => {

        this.detailObj = response.data.data
        if (this.detailObj.topImg.length > 1) {
          this.dotShow = true
        }
        let chooses = JSON.parse(this.detailObj.user_parameter)
        chooses.forEach(function(item, index) {
          let choseArr = item.value.split("/");
          let arr = []
          choseArr.forEach(function(i) {
            arr.push({ "key": item.key, "value": i })
          })
          _this.chooses.push({ 'title': item.key, 'checks': arr })
          _this.checkedList.push(arr[0])
          // this.chooses.push({"key":})
        });
      }, (response) => {
        // error callback
      });
      this.$vux.loading.hide()
      this.show = false
    },
    changedValue: function(value) {}
  },
  created: function() {
    this.$vux.loading.show({
      text: 'loading'
    })
    this.init()
  },
  updated: function() {
    this.bottomShow = true
  },

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/detail.less';
@import '../assets/css/global.less';




/*@import '../assets/css/jd.css';*/

.innerDetail {}

.detail-title {
  .px2vw(padding-left, 16);
  .px2vw(padding-right, 16);
  box-sizing: border-box;
  color: #fff;
  text-align: left;
  .detail-title-cn {
    margin: 8px auto;
  }
  .detail-title-en {
    font-size: 18px;
  }
}

.detail-cartBtn {
  .px2vw(height, 50);
  background: #4a4a4a;
  line-height: 14.6vw;
  color: #fff;
  text-align: center;
}

.detail-pointBtn {
  .px2vw(margin-top, 12);
  text-align: center;
  color: #1dafed;
  box-sizing: border-box;
  font-size: 24px;
  text-align: left;
  .px2vw(padding-left, 16);
  .detail-pointBtn-point {
    font-size: 13px
  }
}

.detail-btn {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}


.detail-changeBtn {
  .px2vw(height, 50);
  height: 14.6vw;
  line-height: 14.6vw;
  color: #fff;

  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  color: #fff;
  background: #1dafed;
}

.detailPop {
  background: #171717;
  position: absolute;
  overflow: visible;
}

.pop-left {
  width: 34.2vw;
  height: 31.2vw;
  background: #292929;
  position: absolute;
  top: -5vw;
  left: 5vw;
  img {
    height: 100%;
    max-width: 100%;
    display: block;
    margin: 0 auto
  }
}

.pop-title {
  height: 35.2vw;
  width: 100%;
  box-sizing: border-box;
  padding-left: 43.5vw;
  padding-top: 5vw;
  color: #dfdfdf;
  letter-spacing: 0;
  text-align: left;
  margin-bottom: 6vw;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .pop-right {
    height: 21.2vw;
    position: relative;
    .pop-right-point {
      position: absolute;
      bottom: 0
    }
  }
}

.demo1-item {
  border: 1px solid #7f7f7f;
  padding: 2px 5vw;
  border-radius: 1px;
  text-align: center;
  font-size: 14px;
  line-height: 5vw;
  color: #7f7f7f;
  margin-right: 7vw;
}

.demo1-item-selected {
  border: 1px solid #1ea7ef;
  border-radius: 1px;
  color: #1ea7ef;
}

.box {
  margin-bottom: 5.4vw
}

.pop-size {
  padding-left: 5.3vw;
  padding-right: 5.3vw;
  height: 55vw;
  overflow: scroll;
  .pop-size-title {
    margin-bottom: 2vw
  }
}

.pop-num {
  width: 100%;
  .pop-num-zi {
    float: left;
  }
  .pop-num-shu {
    float: right;
    width: 26.4vw;
    height: 7.4vw;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 100px;
    line-height: 7.4vw;
    text-align: center;
    position: relative;
    .pop-num-left {
      position: absolute;
      left: 5vw
    }
    .pop-num-right {
      position: absolute;
      right: 5vw
    }
    .count {
      float: left;
      width: 100%
    }
  }
}

.pop-Btn {
  background: #1dafed;
  border-radius: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100vw;
  .px2vw(height, 50);
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  position: absolute;
  bottom: 0;
}

.pop-right-title {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.innerDetail {
  color: #fff;
  div {
    width: 100%;
    img {
      width: 100%
    }
  }
}

.seven {
  text-align: left;
  vertical-align: middle
}

.sevenBox {
  .px2vw(padding-left, 16);
  .px2vw(margin-bottom, 5);
  img {
    .px2vw(height, 13);
    .px2vw(width, 13);
    vertical-align: middle
  }
}

.cha {
  position: absolute;
  right: 3vw;
  top: 2vw;
  height: 2vw;
  z-index: 500
}

</style>
