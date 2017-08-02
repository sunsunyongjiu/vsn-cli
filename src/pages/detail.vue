<template>
  <div>
    <div class="mubu" v-if="show"></div>
    <div class="pageTitle">
      <span>商品详情</span>
      <div class="back" @click="goback"></div>
    </div>
    <swiper :aspect-ratio="300/375" auto dots-position="center" class="detail-swiper" :show-dots="dotShow">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in detailObj.topImg" :key="index" :style="background(item.file_path)"></swiper-item>
    </swiper>
    <div class="detail-title">
      <div class="detail-title-cn" v-text="detailObj.name"></div>
      <!-- <div class="detail-title-en">Merdeces me</div> -->
    </div>
    <flexbox>
      <flexbox-item>
        <div class="detail-pointBtn flex-demo">

          <span v-text="detailObj.point"></span> <span class="detail-pointBtn-point">积分</span>
          
        </div>
      </flexbox-item>
    </flexbox>
    <div class="detail-btn">
      
      <flexbox-item>
        <div class="detail-cartBtn flex-demo" @click="doChange(1)">
          加入购物车
        </div>
      </flexbox-item>
      <flexbox-item >
        

          <div class="flex-demo detail-changeBtn" @click="doChange" >
            立即兑换
          </div>
          
       
      </flexbox-item>
    </div>
    <div>
      <div v-html="detailObj.content"></div>
    </div>
    <div v-transfer-dom>
      <popup v-model="popShow" position="bottom" height="70%" class="detailPop">
        <div class="pop-title">
          <div class="pop-left">
            <img :src="detailObj.pic">
          </div>
          <div class="pop-right">
            <div class="pop-right-title font-18" v-text="detailObj.name"></div>
            <!-- <div class="pop-right-en font-14">Merdeces Me</div> -->

            <div class="pop-right-point font-18"><span class="basicColor" v-text="detailObj.point"></span><span class="font-9">积分</span></div>

          </div>
        </div>
        <div class="pop-size fff">
          <div v-for="(items,n) in chooses" key=n>
            <div class="pop-size-title font-15" v-text="items.title"></div>
            <div class="box">
              <checker v-model="checkedList[n]" default-item-class="demo1-item" selected-item-class="demo1-item-selected" type="radio">
                <checker-item :value="item" v-for="(item, index) in items.checks" :key="index" >{{item.value}}</checker-item>
              </checker>
            </div>
          </div>

          <div  class="pop-num">
            <div  class="pop-num-zi font-15">数量</div>
            <div  class="pop-num-shu">
              <div class="left" @click="plus(-1)">-</div>
              <div v-text="countNum" class="count"></div>
              <div class="right" @click="plus(1)">+</div>
            </div>
          </div>
        </div>
        <div style="padding: 15px;">
          <x-button @click.native="goCart" plain class="pop-Btn"> 确定 </x-button>
        </div>
      </popup>
    </div>
  </div>

  <!-- 选择规格 -->

</template>

<script>
import md5 from 'js-md5';
import { Swiper, SwiperItem,Grid, GridItem, GroupTitle,Flexbox, FlexboxItem, Divider,ViewBox,TransferDom, Popup, Group, Cell, XButton,Checker, CheckerItem} from 'vux'

export default {
  name: '',
  directives: {
    TransferDom
  },
  data () {
    return {
      isCart:false,

      show:true,
      dotShow:false,
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
      page:require('../assets/imgs/page.png'),
      popShow:false,

      countNum:1,
      path:"",
      detailObj:'',

      chooses:[],
      checkedList:[]
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
    TransferDom, 
    Popup, 
    Group, 
    Cell, 
    XButton,
    Checker, 
    CheckerItem
  },
  methods:{
    goback:function(){
      this.$router.go(-1)
    },
    background:function(item){
      return 'background:url('+item+') no-repeat center center;background-size:50% auto'
    },
    doChange:function(n){
      this.popShow=true
      if(n==1){
        this.isCart=true
      }else{
        this.isCart=false
      }
    },
    plus:function(n){
      console.log(n)
      if(n==1){
        this.countNum++
      }else if(this.countNum<=1){
        return
      }else{
        console.log(2)
        this.countNum--
      }

       
    },
    goCart:function(){
      if(this.$store.state.loginUser["ucid"] != undefined){
        // 在登陆条件下跳转购物车
          // 设置header
        let header={
          "token":this.$store.state.loginUser.token,"time":JSON.stringify(new Date().getTime()),
          "sign":md5("/order/insertBasket"+this.$store.state.loginUser.token+JSON.stringify(new Date().getTime())).toUpperCase()
        }
        // 设置传值
        let cartData={
          'prodId':this.detailObj.prod_id,
          'basketCount':this.countNum,
          'attribute':JSON.stringify(this.checkedList)
        }
   
        this.$http({
            method:'POST',
            url:this.$Api('/order/insertBasket'),
            params:cartData,
            headers: header,
            emulateJSON: true
        }).then(function(data){//es5写法
          if(this.isCart){
            this.$router.push({path:'/cart'})
          }else{
            this.$router.push({path:'/sureOrder'})
          }    
        },function(error){
          //error
        })
      }else{
        this.$vux.toast.show({
          text: '请先登陆',
          type: 'warn',
          isShowMask:true,
          position:'middle'
        })
      }

      
    },
    init:function(){
      console.log(this.$store.state.loginUser.token)
      let _this=this
      this.$http.get(this.$Api('/home/getProdDetail'),{params: { 'prodId': this.$route.query.prod_id }}).then((response) => {
         
          this.detailObj=response.data.data
          console.log(this.detailObj.topImg)
          if(this.detailObj.topImg.length>1){
            this.dotShow=true
          }
          let chooses=JSON.parse(this.detailObj.user_parameter)
          chooses.forEach(function(item,index){
            let choseArr=item.value.split("/");
            let arr=[]
            choseArr.forEach(function(i){
              arr.push({"key":item.key,"value":i})
            })
            _this.chooses.push({'title':item.key,'checks':arr})
            _this.checkedList.push(arr[0])
            // this.chooses.push({"key":})
          });
      }, (response) => {
        // error callback
      });
      this.$vux.loading.hide()
      this.show=false
    },
    changedValue:function(value){
      console.log(value)
    }
  },          
  mounted:function(){
    this.$vux.loading.show({
     text: 'loading'
    })
    this.init()
  },

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
  margin: 5vw auto 0;
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
  width: 40.8vw;
  line-height: 14.6vw;
  color: #fff;
  font-size: 20px; 
  text-align: center; 
  box-sizing:border-box;  
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
  color: #fff;
  background:#1dafed;

}
.detailPop{
  background: #171717;
  position: absolute;
  overflow: visible;
}
.pop-left{
  width: 34.2vw;
  height: 31.2vw;
  background: #292929;
  position: absolute;
  top: -5vw;
  left: 5vw;
  img{
    height: 100%;
    display: block;
    margin: 0 auto
  }
}
.pop-title{
  height: 35.2vw;
  width: 100%;
  box-sizing:border-box;
  padding-left: 43.5vw;
  padding-top: 5vw;
  color: #dfdfdf;
  letter-spacing:0;
  text-align:left;
  margin-bottom: 6vw;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
  .pop-right{
    height: 21.2vw;
    position: relative;
    .pop-right-point{
      position: absolute;
      bottom: 0
    }
  }
}
.demo1-item {
  border:1px solid #7f7f7f;
  border-radius:1px;
  width:16vw;
  height:5vw;
  text-align: center;
  font-size: 14px;
  line-height: 5vw;
  color: #7f7f7f;
  margin-right: 7vw;
}
.demo1-item-selected {
  border:1px solid #1ea7ef;
  border-radius:1px;
  color:#1ea7ef;
}
.box{
  margin-bottom: 5.4vw
}
.pop-size{
  padding-left: 5.3vw;
  padding-right: 5.3vw;
  .pop-size-title{
    margin-bottom: 2vw
  }
}
.pop-num{
  width: 100%;
  .pop-num-zi{
    float: left;
  }
  .pop-num-shu{
    float: right;
    width: 26.4vw;
    height: 7.4vw;
    background: rgba(255,255,255,0.05);
    border-radius:100px;
    line-height: 7.4vw;
    text-align: center;
    position: relative;
    .left{
      position: absolute;
      left: 5vw
    }
    .right{
      position: absolute;
      right: 5vw
    }
    .count{
      float: left;
      width: 100%
    }
  }
}
.pop-Btn{
  background:#1dafed;
  border-radius: 0;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
  width:88vw;
  height:14.6vw;
  font-size:24px;
  color:#ffffff;
  letter-spacing:0;
  text-align:center;
  position: absolute;
  bottom: 9vw;
  left: 6vw
}
</style>
