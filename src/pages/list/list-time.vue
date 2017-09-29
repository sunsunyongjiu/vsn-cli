<template>
  <div class="container">
    <div class="pageTitle">
      <span class="font-18">秒杀商品</span>
      <div class="back" @click="goback"></div>
    </div>
    <scroller lock-x scrollbar-y use-pullup height="100vh" @on-pullup-loading="load1" ref="demo1" :pullup-config="{upContent: '上拉刷新',loadingContent: '加载中...',content: '松开刷新'}">
      <div>
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
        <div class="list-box" :class="{'list-box-point':!selectePoint}">
          <div v-for="(item,index) in goodsList" key=index class="list-box-item" @click="goWhere(item)" :class="{'point-list-box-item':selectePoint}">
            <div class="list-box-item-img" :class="{'list-box-item-img-cash':!selectePoint}">
              <img :src="item.pic">
            </div>
            <div class="list-box-item-price" :class="{'list-box-item-price-cash':!selectePoint,'list-box-item-price-point':selectePoint}">
              <div v-text="item.name" class="font-16 list-box-item-price-title " :class="{'color-33':!selectePoint,'fff':selectePoint}">
              </div>
              <div class="list-box-item-priceBox">
                <div v-if="item.sellType==1" class="list-box-item-price-price color-7f" style="text-decoration:line-through">
                  <span class=" font-11 color-7f">{{item.orig_price}}积分</span>
                </div>
                <div v-if="item.sellType==0" class="list-box-item-price-price color-7f" style="text-decoration:line-through;">
                  <span class="color-7f  font-11">￥{{item.orig_price}}</span>
                </div>
                <div v-if="item.sellType==1" class="list-box-item-price-price basicColor">
                  <span v-text="item.kill_price" class="list-point  font-18"></span>
                  <span class=" font-12 ">积分</span>
                </div>
                <div v-if="item.sellType==0" class="list-box-item-price-price basicColor">
                  <span class="df  font-12">￥</span>
                  <span v-text="item.kill_price" class="list-point  font-18"></span>
                </div>
              </div>
              <div class="buyBtnBox">
                <div class="font-11 color-7f" style="text-align:right">剩<span class="basicColor">{{item.kill_num}}</span>件</div>
                <div class="buyBtn font-15 fff" @click="goDetail(item)">立即秒杀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
   
  </div>
</template>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, Tab, TabItem, Confirm, Scroller } from 'vux'
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
      hotObj: {},
      pageNumber: 1,
      pageSize: 10
    }
  },
  components: {
    back,
    Tab,
    TabItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Confirm,
    Scroller,
    killId: ''
  },
  methods: {
    init: function() {
      Apis.getSecKillTimeList().then(data => {
        console.log(data.data[0])
        this.hotObj = data.data[0];
        this.killId = data.data[0].id
        this.getGoods()
      })


    },
    getGoods: function() {
      this.pageNumber = 1;
      Apis.getSecKillProdList({ killTimeId: this.killId, sellType: this.selectePoint ? 1 : 0, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(data => {
        this.goodsList = data.data
        if (!data.isLast) {
          this.pageNumber++
            this.$refs.demo1.enablePullup()
        } else {
          this.$refs.demo1.disablePullup()
        }
        this.$nextTick(() => {
          this.$refs.demo1.reset({
            top: 0
          })
        })
      })
    },
    goback: function() {
      console.log(1)
      this.$router.go(-1)
    },
    goWhere: function(item) {

      this.$router.push({ path: 'detail', query: { prod_id: item.prod_id } })

      // this.$router.push({path: 'detail'})
    },
    goDetail: function(item) {
      this.$router.push({ path: 'detail', query: { prod_id: item.prod_id } })
    },
    load1: function() {
      setTimeout(() => {
        // 查询
        Apis.getSecKillProdList({ killTimeId: this.killId, sellType: this.selectePoint ? 1 : 0, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(data => {
          this.goodsList = this.goodsList.concat(data.data)
          this.$nextTick(() => {
            this.$refs.demo1.reset()
          })
          if (!data.isLast) {
            this.pageNumber++
          } else {
            this.$refs.demo1.disablePullup()
          }

          this.searchHistoryShow = false
        })
        setTimeout(() => {

          this.$refs.demo1.donePullup()
        }, 100)
      }, 1000)
    }
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
      100);
      .px2vw(height,
      100);
      .px2vw(margin-top,
      20);
      .px2vw(margin-right,
      20);
      background: #292929;
      border-radius: 2px;
      margin: 0 auto;
      img {
        max-width: 100%;
        height: 100%;
      }
    }
    .list-box-item-img-cash {
      .px2vw(margin-left,
      20);
    }
    .list-box-item-price-cash {
      .px2vw(width,
      180);
    }
    .list-box-item-price-point {
      .px2vw(width,
      200);
    }
    .list-box-item-price {
      float: left;
      height: 100%;
      box-sizing: border-box;
      color: #333333;
      margin: 0 auto;
      position: relative;

      .list-box-item-price-title {
        overflow: hidden;
        .px2vw(margin-top,
        21);
        .px2vw(margin-bottom,
        30);
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

.buyBtnBox {
  position: absolute;
  right: 0;
  .px2vw(bottom,
  18);
  .buyBtn {
    background: #1dafed;
    border-radius: 0 1px 1px 1px;
    .px2vw(width,
    72);
    .px2vw(height,
    30);
    .px2vw(line-height,
    30);
    .px2vw(margin-top,
    6);
  }
}

.point-list-box-item {
  background: #181818!important;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50), 0 3px 10px 0 rgba(0, 0, 0, 0.50);
  .px2vw(padding-left,
  20);
  .px2vw(padding-right,
  20);
  .px2vw(margin-bottom,
  4);
  .px2vw(margin-top,
  2);
}

.list-box-item-priceBox {
  position: absolute;
  left: 0;
  .px2vw(bottom,
  18);
}

.list-box-point {
  .px2vw(padding-left,
  20);
  .px2vw(padding-right,
  20);
}

</style>
