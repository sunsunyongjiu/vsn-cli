<template>
  <div class="container">
      <back title="购物车"></back>
      <div class="tab">
        <div class="tab-bar selected">积分</div>
        <div class="tab-bar">现金</div>
      </div>
      <div class="goods-list">
        <swipeout class="vux-1px-tb" v-for="(item,index) in goodsList" key=index>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick(item)" type="warn" :width="70"><span class="font-30">×</span></swipeout-button>
            </div>
            <div slot="content" style="padding:12px;" class="goods">
              <div class="choose-btn" :class="{selected:item.selected}" @click="doSelect(item)"></div>
                <div class="goods-left">
                  <img :src="item.pic">
                </div>
                <div class="goods-right">
                  <div v-text="item.title" class="font-18 df goods-title"></div>
                  <!-- <div class="font-14 df">Merdeces Me</div> -->
                  <div class="font-10 color-92" v-for="i in item.size">
                    <span v-text="i.key"></span>: <span v-text="i.value"></span>
                  </div>
                  <div class="point">
                    <span v-text="item.point" class="font-18 df"></span><span class="font-9 color-9b">积分</span>
                  </div>
                  <div class="plus">
                    <div class="jia" @click="goPlus(item,1)">+</div>
                    <div v-text="item.count"></div>
                    <div class="jian" @click="goPlus(item,-1)">-</div>
                  </div>
                </div>


            </div>
          </swipeout-item>
        </swipeout>

        <!--  -->
      </div>
      <div class="bottom">
        <div @click="selecteAll()">
          <div class="choose-btn" :class="{selectedAll:selectedAll}"></div>
          <div class="bottom-left">全选</div>
        </div>
        
       <span class="font-14 fff">合计:</span> <span class="color-1dafed font-18" v-text="totalPoint"></span> <span class="font-9 color-9b">积分</span>
        <div class="bottom-right" @click="goSure">兑换</div>
      </div>
  </div>

</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import back from '../components/backNav'
import { Tab, TabItem } from 'vux'
import md5 from 'js-md5';
export default {
  name: '',
  data () {
    return {
      goodsList:[
       
      ]
    }
  },
  components:{
    back,
    Tab, 
    TabItem,
    Swipeout, 
    SwipeoutItem, 
    SwipeoutButton
  },
  methods:{
    onButtonClick (item) {
      // 设置header
      let header={
        "token":this.$store.state.loginUser.token,
        "time":JSON.stringify(new Date().getTime()),
        "sign":md5("/order/deleteBasket"+this.$store.state.loginUser.token+JSON.stringify(new Date().getTime())).toUpperCase()
      }
      // 设置传值
      let cartData={
        'basketId':item.basketId
      }
      console.log(item)
      this.$http({
          method:'POST',
          url:this.$Api('/order/deleteBasket'),
          params:cartData,
          headers: header,
          emulateJSON: true
      }).then(function(data){
        this.$vux.loading.show({
         text: 'loading'
        })
        this.init()
      },function(error){
        //error
      })
    },
    goPlus:function(item,n){
      if(n>0){
        item.count++
      }else if(item.count<=1){
        return
      }else{
        item.count--
      }

      let header={
        "token":this.$store.state.loginUser.token,"time":JSON.stringify(new Date().getTime()),
        "sign":md5("/order/updateBasketCount"+this.$store.state.loginUser.token+JSON.stringify(new Date().getTime())).toUpperCase()
      }
      // 设置传值
      let cartData={
        'basketId':item.basketId,
        'basketCount':item.count
      }
      
      this.$http({
          method:'POST',
          url:this.$Api('/order/updateBasketCount'),
          params:cartData,
          headers: header,
          emulateJSON: true
      }).then(function(data){
        console.log(data)
      },function(error){
        //error
      })

    },
    doSelect(item){
      item.selected=!item.selected
    },
    selecteAll:function(){
      this.goodsList.forEach(function(item){
        item.selected=!item.selected
      })
    },
    goSure:function(){
      console.log(1)
      this.$router.push({path:'/sureOrder'})
    },

    init:function(){
      // 设置header
      let header={
        headers:{
          "token":this.$store.state.loginUser.token,
          "time":JSON.stringify(new Date().getTime()),
          "sign":md5("/order/getBasketList"+this.$store.state.loginUser.token+JSON.stringify(new Date().getTime())).toUpperCase()
        }
      }
      this.$http.get(this.$Api('/order/getBasketList'),header).then((response) => {
         
          let arr=[]
          console.log(response.data.data)
          response.data.data.forEach(function(item){

            let obj={
              pic:item.pic,
              title:item.prod_name,
              size:JSON.parse(item.attribute),
              point:item.point,
              count:item.basket_count,
              selected:true,
              basketId:item.basket_id
            }
            arr.push(obj)
          })
          this.goodsList=arr
          this.$vux.loading.hide()
      }, (response) => {
          // error callback
      });

    }
  },          
  mounted:function(){
    this.init()
    this.$vux.loading.show({
     text: 'loading'
    })
  },
  computed:{
    totalPoint:function(){
      let total=0
      this.goodsList.forEach(function(item){
        if(item.selected){
          total+=(item.point*item.count)
        }
        
      })
      return total
    },
    selectedAll:function(){
      let arr=[]
      this.goodsList.forEach(function(item){
        arr.push(item.selected) 
      })
      if(arr.indexOf(false)>=0){
        return false
      }else{
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.tab{
  overflow: hidden;
}
.tab-bar{
  width: 50vw;
  float: left;
  font-size:14px;
  color:#747474;
  background:#222222;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.50), 0 3px 10px 0 rgba(0,0,0,0.50);
  box-sizing:border-box;
  height: 8.5vw;
  line-height: 8.5vw
}
.selected{
  color: #fff;

}
.goods{
  position: relative;
  height: 37.3vw;
  width: 100%;
  background:#181818;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
  padding-top: 5.3vw;
  box-sizing:border-box;
  .selected{
    background:#1dafed;
    width:4vw;
    height:4vw;
    border-radius:100%;
    color: #fff
  }
  .goods-left{
    float: left;
    background:#292929;
    border-radius:2px;
    width: 26.6vw;
    height: 26.6vw;
    margin-left: 9.6vw;
    img{
      height: 26.6vw;
      max-width: 26.6vw;

    }
  }
  .goods-right{
    float: left;
    text-align: left;
    margin-left: 3.4vw;
    width: 53.4vw;
    position: relative;
    height: 26.4vw;
    .plus{
      position: absolute;
      right: 0;
      top: 0;
      height: 26.4vw;
      width: 5.3vw;
      background: #292929;
      color:#1ea7ef;
      border-radius: 10px;
      text-align: center;
      line-height: 26.4vw;
      right: 4.8vw;
      .jia{
        position: absolute;
        top: 2vw;
        width: 5.3vw;
        text-align: center;
        line-height: 1
      }
      .jian{
        position: absolute;
        bottom: 2vw;
        width: 5.3vw;
        text-align: center;
        line-height: 1


      }
    }
    .point{
      position: absolute;
      bottom: 0
    }
    .goods-title{
      line-height: 8vw;
    }
  }
}
.bottom{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14.9vw;
  background:#292929;
  box-shadow:0 12px 4px 0 rgba(154,154,154,0.50);
  line-height: 14.9vw;
  text-align: center;
  .bottom-left{
    float: left;
    width: 27.4vw;
    font-size:14px;
    color:#ffffff;
  }
  .bottom-right{
    float: right;
    width: 27.4vw;
    background:#1dafed;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
    border-radius:0 1px 1px 1px;
    font-size:18px;
    color:#ffffff;
    
  }
}
.choose-btn{
  background:#292929;
  border:1px solid #3d3d3d;
  width:4vw;
  height:4vw;
  border-radius:100%;
  position: absolute; 
  top: 50%;
  margin-top: -3vw;
  left: 2vw;
}
.selectedAll{
  background:#1dafed;
  width:4vw;
  height:4vw;
  border-radius:100%;
  color: #fff 
}
</style>
