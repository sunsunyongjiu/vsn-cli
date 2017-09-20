<template>
  <div class="container">
    <div class="pageTitle">
      <span class="font-18">购物车</span>
      <div class="back" @click="goback"></div>
    </div>
    <div class="hotBox">
      <div class='hotBox-title font-14 fff'>秒杀时间</div>
      <div>
        <div class="hotBox-item">
          <div v-text="hotObj.startTimeMonth" class="font-10 TimeMonth fff"></div>
          <div v-text="hotObj.startTimeDay" class="font-18 TimeDay fff"></div>
        </div>
        <div style="width:10.2vw;float:left;height:10.5vw;line-height:10.5vw" class="fff">
          -
        </div>
        <div class="hotBox-item" style="margin-left:0">
          <div v-text="hotObj.endTimeMonth" class="font-10 TimeMonth fff"></div>
          <div v-text="hotObj.endTimeDay" class="font-18 TimeDay fff"></div>
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="tab-bar" :class="{selected:selectePoint}" @click="selectePoint=true">积分精品</div>
      <div class="tab-bar" :class="{selected:!selectePoint}" @click="selectePoint=false">京东商品</div>
    </div>
    <div class="list-box">
      <div v-for="(item,index) in goodsList" key=index class="list-box-item" @click="goWhere(item)">
        <div class="list-box-item-img">
          <img :src="item.pic">
        </div>
        <div class="list-box-item-price">
          <div v-text="item.name" class="font-16 list-box-item-price-title color-33">
          </div>
          <div v-if="item.sellType==1" class="list-box-item-price-price basicColor">
            <span v-text="item.point" class="list-point  font-18"></span>
            <span class=" font-12">积分</span>
          </div>
          <div v-if="item.sellType==0" class="list-box-item-price-price basicColor">
            <span class="df  font-12">￥</span>
            <span v-text="item.cash" class="list-point  font-18"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, Tab, TabItem, Confirm } from 'vux'
import back from '../../components/backNav'
import Apis from '../../configers/Api'
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  data() {
    return {
      goodsList: [

      ],
      show: false,
      selectePoint: true,
      selectedSub: '',
      hotObj: {}
    }
  },
  components: {
    back,
    Tab,
    TabItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Confirm
  },
  methods: {
    init: function() {
      Apis.getSecKillTimeList().then(data => {
        console.log(data.data[0])
        this.hotObj = data.data[0];
        this.getGoods(data.data[0].id)
      })


    },
    getGoods: function(id) {
      Apis.getSecKillProdList({ killTimeId: id, sellType: this.selectePoint ? 1 : 0 }).then(data => {
        console.log(data.data)
        this.goodsList = data.data
      })
    },
    goback: function() {
      console.log(1)
      this.$router.go(-1)
    },
  },
  watch: {
    selectePoint(curVal, oldVal) {
    	this.init()
    },
  },
  mounted: function() {
    this.init()
  },
  computed: {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.tab {
  overflow: hidden;
}

.tab-bar {
  width: 50vw;
  float: left;
  font-size: 14px;
  color: #747474;
  background: #222222;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50), 0 3px 10px 0 rgba(0, 0, 0, 0.50);
  box-sizing: border-box;
  height: 8.5vw;
  line-height: 8.5vw
}


.selected {
  color: #fff;
}

.hotBox {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  .px2vw(height, 111);
  .px2vw(padding-top, 15);
  box-sizing: border-box;
  .hotBox-title {
    .px2vw(height, 14);
    .px2vw(margin-bottom, 16);
  }
  .hotBox-item {
    width: 13.8vw;
    height: 10.5vw;
    float: left;

    border-radius: 4px;
    margin-left: 31.1vw;
    overflow: hidden;
    .TimeMonth {
      .px2vw(height, 13);
      background: #1dafed;
    }
    .TimeDay {
      .px2vw(height, 29);
      .px2vw(line-height, 27);
      background: #333
    }
  }
}

.list-box {
  width: 100%;
  overflow: hidden;
  .px2vw(padding-left,
  20);
  .px2vw(padding-right,
  20);
  .px2vw(top,
  153);
  .px2vw(margin-top,
  11);
  box-sizing: border-box;
  .list-box-item {
    width: 100%;
    border-radius: 2px;
    .px2vw(height,
    138);
    .px2vw(margin-bottom,
    13);
    background: #fff;
    .list-box-item-img {
      float: left;
      .px2vw(width,
      150);
      height: 100%;
      margin: 0 auto;
      img {
        max-width: 50%;
        height: 50%;
        margin-top: 20%;
      }
    }
    .list-box-item-price {
      float: right;
      .px2vw(width,
      175);
      float: left;
      height: 100%;
      box-sizing: border-box;
      color: #333333;
      margin: 0 auto;

      .list-box-item-price-title {
        overflow: hidden;
        margin-top: 20%;
        margin-bottom: 8%;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
      }
      .list-box-item-price-price {
        text-align: left;
        margin-top: 5px;
        color: #1dafed;
        span {
          color: #1dafed;
        }
      }
    }
  }

  .list-box-inner {}
}

</style>
