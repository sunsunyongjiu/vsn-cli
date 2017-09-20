<template>
  <div class="life">
    <div class="mubu" v-if="show"></div>
    <back :title="pageTitle"></back>
    <div v-if="manShow">
      <div class="life-img">
        <img :src="lifeTopImg">
      </div>
      <div class="list-box">
        <div v-for="(item,index) in myBoutique" key=index class="list-box-item" @click="goWhere(item)">
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
  </div>
</template>
<script>
import myNav from '../../components/nav'
import back from '../../components/backNav'
import { Tab, TabItem } from 'vux'
export default {

  components: {
    myNav,
    back,
    Tab,
    TabItem
  },
  data() {
    return {
      pageTitle: this.$route.query.title,
      id: this.$route.query.id,
      myBoutique: [],
      show: true,
      lifeTopImg: require('../../assets/imgs/presentBanner.png'),
      manShow: true
    }
  },
  methods: {
    init: function() {
      this.$vux.loading.show({
        text: 'loading'
      })
      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getProdListByCategory'), { params: { 'id': this.id } }).then((response) => {
        this.myBoutique = JSON.parse(response.bodyText).data
        console.log(this.myBoutique)
        this.$vux.loading.hide()
        this.show = false
      }, (response) => {
        // error callback
      });
    },
    showMe: function(n) {
      if (n == 1) {
        this.manShow = true;
      } else {
        this.manShow = false
      }
    },
    goWhere: function(item) {

      this.$router.push({ path: 'detail', query: { prod_id: item.prod_id } })

      // this.$router.push({path: 'detail'})
    }
  },
  mounted: function() {
    this.init()
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/global.less';
.life-img {
  width: 100%;
  .px2vw(height,
  160);
  img {
    width: 100%;
    height: 100%;
  }
}

.life {
  width: 100vw;
  position: relative;
  .vux-tab {
    background: @bgcolor !important;
    margin-bottom: 1px
  }
  .vux-tab .vux-tab-item {
    background: none !important;
  }
  .life-bar {
    height: 10vw
  }
}

.list-box {
  width: 100%;
  overflow: hidden;
  .px2vw(padding-left,
  20);
  .px2vw(padding-right,
  20);
  position: absolute;
  .px2vw(top,
  153);
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
