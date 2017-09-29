<template>
  <scroller lock-x scrollbar-y use-pullup height="100vh" @on-pullup-loading="load1" ref="demo1" :pullup-config="{upContent: '上拉刷新',loadingContent: '加载中...',content: '松开刷新'}">
    <div class="life">
      <div class="mubu" v-if="show"></div>
      <back :title="pageTitle"></back>
      <!-- <tab :line-width="1" custom-bar-width="60px" active-color='#ffffff' class="life-bar" bar-active-color="#1dafed">
      <tab-item selected @click.native="showMe(1)">男士精品</tab-item>
      <tab-item @click.native="showMe(2)">女士精品</tab-item>
    </tab> -->
      <div v-if="manShow">
        <div class="life-img">
          <img :src="lifeTopImg">
        </div>
        <div class="list-box">
          <div v-for="(item,index) in myBoutique" key=index class="list-box-inner">
            <div class="list-box-inner-inner">
              <div class="left">
                <img :src="item.pic">
              </div>
              <div class="right">
                <div class="list-name">
                  <div v-text="item.name" class="list-title  font-18"></div>
                  <!-- <div class="list-title-en">Merdeces me</div> -->
                </div>
                <div v-text="item.brief" class="list-brief"></div>
                <div v-if="item.sellType==1">
                  <span v-text="item.point" class="list-point  font-18"></span>
                  <span class=" font-12">积分</span>
                </div>
                <div v-if="item.sellType==0">
                  <span class="df  font-12">￥</span>
                  <span v-text="item.cash" class="list-point  font-18"></span>
                </div>
                <div class="changeBtn  font-14" @click="goWhere(item)">立即兑换</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroller>
</template>
<script>
import myNav from '../../components/nav'
import back from '../../components/backNav'
import { Tab, TabItem, Scroller } from 'vux'
import Apis from '../../configers/Api'
export default {

  components: {
    myNav,
    back,
    Tab,
    TabItem,
    Scroller
  },
  data() {
    return {
      pageTitle: this.$route.query.title,
      id: this.$route.query.id,
      myBoutique: [],
      show: true,
      lifeTopImg: require('../../assets/imgs/life-top.png'),
      manShow: true,
      pageSize: 2,
      pageNumber: 10
    }
  },
  methods: {
    init: function() {
      this.$vux.loading.show({
        text: 'loading'
      })

      //获取精品推荐列表
      Apis.getProdListByCategory({ 'id': this.id, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(data => {
        this.myBoutique = data.data;
        this.show = false
        this.$nextTick(() => {
          this.$refs.demo1.reset()
        })
        if (!data.isLast) {
          this.pageNumber++
        } else {
          this.$refs.demo1.disablePullup()
        }
        this.$vux.loading.hide()
        this.show = false
      })
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
    },
    load1: function() {
      setTimeout(() => {
        // 查询
        Apis.getProdListByCategory({ 'id': this.id, pageNumber: this.pageNumber, pageSize: this.pageSize }).then(data => {
          this.myBoutique = this.myBoutique.concat(data.data)
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
  mounted: function() {
    this.init()
  }
}

</script>
<style lang='less' scoped>
@import '../../assets/css/global.less';
.life-img {
  width: 100%;
  img {
    width: 100%
  }
}

.life {
  width: 100vw;
  overflow: hidden;
  .vux-tab {
    background: @bgcolor !important;
    margin-bottom: 1px
  }
  .vux-tab .vux-tab-item {
    background: none !important
  }
  .life-bar {
    height: 10vw
  }
}

.list-box {
  padding: 0 8vw 0;

  .left {
    width: 50%;
  }
  .right {
    width: 50%
  }
  .list-title {
    color: #dfdfdf;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-title-en {
    color: #dfdfdf;
    font-size: 18px;
    line-height: 26px;
  }
  .list-brief {
    margin: 2vw 0;
    font-size: 9px;
    color: #ffffff;
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-point {
    font-size: 18px;
    color: #dfdfdf;
  }
  .list-point+span {
    font-size: 9px;
    color: #dfdfdf;
  }
  .changeBtn {
    width: 24.8vw;
    height: 6.133vw;

    text-align: center;
    border: 1px solid #1dafed;
    box-sizing: border-box;
    line-height: 6.133vw;
    color: #1dafed;
    margin-top: 2vw
  }
}

.list-box-inner {
  height: 44.8vw;
  padding-bottom: 12.2vw;
  position: relative;

  .left {
    height: 100%;
  }
}

.list-box-inner:nth-child(odd) {
  .left {
    float: left;
    img {
      /*margin-top: 5vw;*/
      max-width: 100%
    }
  }
  .right {
    text-align: right;
    float: right
  }
  .changeBtn {
    float: right;
  }
}

.list-box-inner:nth-child(even) {
  .left {
    float: right;
    img {
      height: 56.3vw;
      max-width: 100%;
    }
  }
  .right {
    text-align: left;
    float: left
  }
}

.list-box-inner:nth-child(1) {
  .list-name {
    position: absolute;
    top: -6vw;
    right: 0;
    width: inherit;
  }
  .left {
    padding-top: 0
  }
  img {
    margin-top: 0!important
  }
  .right {
    padding-top: 2vw;
  }
}

.list-box-inner:nth-child(odd):after {
  content: '';
  height: 6.366vw;
  width: 130%;
  display: block;
  position: absolute;
  bottom: 7.5vw;
  transform: rotate(7deg);
  left: -10vw;
  img {
    max-height: 100%;
    margin-top: 5vw
  }
}

.list-box-inner:nth-child(even):after {
  content: '';
  height: 6.366vw;
  width: 130%;

  display: block;
  position: absolute;
  bottom: 7.5vw;
  transform: rotate(353deg);
  left: -10vw
}

.list-box-inner:after {
  background: url(../../assets/imgs/line.png) repeat center center;
  background-size: auto 100%;
}

.list-box-inner-inner {
  overflow: hidden;
  height: 100%;
  img {
    max-height: 38vw
  }
}

</style>
