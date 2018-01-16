<template>
  <div class="vsn-main">
    <div v-for="(item ,key) in orderDetail">
    	<div class="color-91 order-person-title">
    		<span>商品信息</span>
    		<span v-text="item.jdOrderId"></span>
    	</div>
      <div class="trackDrtail-title-box">
        <div class="order-goodsText">
          <div class="orders">
            <div class="orders-left">
              <img :src="item.pic">
            </div>
            <div class="orders-mid">
              <div class="font-16 df orders-mid-title" v-text="item.prod_name"></div>
              <div v-for="(attr , n) in item.attribute" v-if="item.attribute.length>0">
                <span v-text="attr.key"></span>:
                <span v-text="attr.value"></span>
              </div>
              <div class=" font-11">数量：x<span v-text="item.basket_count">1</span></div>
              <!--
              	<div class="orders-mid-bottom">
                <span class="font-14 basicColor">{{item.orderTrackReceived?'已签收':'未签收'}}</span>
              </div>
              --> 
            </div>
            <div class="order-line"></div>
          </div>
        </div>
      </div>
      <div class="order-person-title">
        	物流信息
      </div>
      <div class="order-infoText padding-bottom-15">
        <div v-for="ite in item.orderTrack" class="sendMsgBox" v-if="item.orderTrack!=null">
          <div class="sendMsgBoxItem">
            <div v-text="ite.content" class="font-13"></div>
            <div v-text="ite.msgTime" class="font-11"></div>
          </div>
        </div>
         <div class="font-12 basicColor" v-if="item.orderTrack==null">
          	物流信息正在升级中......
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Apis from '../../configers/Api'
export default {
  name: '',
  data() {
    return {
      orderDetail: []
    }
  },
  components: {

  },
  methods: {
    init: function() {
      Apis.getProdTrackDetail(this.$store.state.loginUser.token, { 'subItemId': this.$route.query.itemIid }).then(data => {
        console.log(data.data)
        this.orderDetail = data.data;
        console.log(this.orderDetail[0])
        this.orderDetail[0].attribute = JSON.parse(this.orderDetail[0].attribute)
      });
    }
  },
  mounted: function() {
    this.init()

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.trackDrtail-title-box {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0;
  .px2vw(height, 136);
  width: 100%;
}

.order-goodsText {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0;
  .px2vw(margin-bottom, 10);
}

.orders {
  width: 92.6vw;
  margin: 0 auto;
  height: 33.6vw;
  box-sizing: border-box;
  /*.px2vw(padding-top, 9);*/
  padding-top: 5.5vw;
  padding-bottom: 5.5vw;
  position: relative;
  background: #181818;

  .orders-left {
    width: 22.6vw;
    height: 22.6vw;
    float: left;
    background: #292929;
    border-radius: 2px;
    margin-left: 2.6vw;
    img {
      height: 100%;
      max-width: 100%;
    }
  }
  .orders-mid {
    width: 60.6vw;
    float: left;
    text-align: left;
    box-sizing: border-box;
    padding-left: 2.4vw;
    font-size: 11px;
    color: #929292;
    letter-spacing: 0;
    text-align: left;
    position: relative;
    height: 100%;
    .orders-mid-title {
      overflow: hidden;
      /*超出部分隐藏*/
      white-space: nowrap;
      /*不换行*/
      text-overflow: ellipsis;
      /*超出部分文字以...显示*/
      margin-bottom: 2vw;
    }
    .orders-mid-bottom {
      position: absolute;
      bottom: 0
    }
  }
  .orders-right {
    width: 20.8vw;
    float: left;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: right;
  }
}

.order-person-title {
  background: rgba(41, 41, 41, 0.5);
  ;
  border-radius: 2px 2px 0 0;
  height: 8.5vw;
  font-size: 15px;
  padding-left: 5vw;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 15px;
  text-align: left;
  line-height: 8.5vw;
}

.order-infoText {
  padding-top: 5vw;
  padding-bottom: 5vw;
  text-align: left;
  padding-left: 5vw;
  .px2vw(line-height, 20);
}

.sendMsgBox {
  .px2vw(padding-left, 18);
  .px2vw(padding-right, 18);
  border-left: 2px solid #292929;
  .sendMsgBoxItem {
    box-sizing: border-box;
    .px2vw(padding-top, 12);
    .px2vw(padding-bottom, 12);
    position: relative;
    border-top: 1px solid #4a4a4a;
    border-bottom: 1px solid #4a4a4a;
    color: #919191;
  }
  .sendMsgBoxItem:before {
    display: block;
    content: '';
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 100%;
    background: #919191;
    position: absolute;
    .px2vw(left, -21);
  }
}

.sendMsgBox:nth-child(1) {
  .sendMsgBoxItem {
    border-top: 0px;
    color: #1dafed;
    &:before {
      width: 2vw;
      height: 2vw;
      border: 2px solid #1dafed;
      .px2vw(left, -25);
      background: #181818;
    }
  }
}
.trackDrtail-title-jd{
	text-align: left;
	width: 92.6vw;
	margin: 0 auto;
	.px2vw(margin-top, 17);
}
</style>
