<template>
  <div class="vsn-wrap">
    <back :title="title"></back>
    <div class="vsn-main" v-for="(item,key) in detail" key='key'>
      <div class="returnDetailTitle">
        <span v-text="item.returnStatusRemark" class="font-18 fff"></span>
      </div>
      <div class="returnDetailText">
        <span v-text="item.returnRemark" class="font-13 color-91"></span>
      </div>
      <div class='titleBox font-15 fff'>
        商品信息
      </div>
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
            <div class="orders-mid-bottom">
              <span v-if="item.sellType==0" class="basicColor">￥</span>
              <span class="basicColor font-16" v-text="item.product_total_amout"></span>
              <span class="font-9" v-if="item.sellType==1">积分</span>
            </div>
          </div>
          <div class="order-line"></div>
        </div>
      </div>
      <div class='titleBox font-15 fff'>
        {{detail[0].returnType == 1 ? '退货' : '换货'}}信息
      </div>
      <div class="returnDetailBox">
        <div class="font-14 color-91">
          订单编号：{{item.sub_number}}
        </div>
        <div class="font-14 color-91">
          {{detail[0].returnType == 1 ? '退货' : '换货'}}编号：{{item.return_number}}
        </div>
        <div class="font-14 color-91" v-if="detail[0].returnType==1">
          退款金额：￥{{item.prod_price}}
        </div>
        <div class="font-14 color-91">
          {{detail[0].returnType == 1 ? '退货' : '换货'}}原因：{{item.return_reason}}
        </div>
        <div class="font-14 color-91">
          申请时间：{{item.create_time}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav';
import Apis from '../../configers/Api'
export default {
  name: '',
  data() {
    return {
      title: '',
      detail: []
    }
  },
  components: {
    back
  },
  methods: {
    init: function() {
      Apis.getProdReturnDetail(this.$store.state.loginUser.token, { 'subItemId': this.$route.query.subItemId }).then(data => {
        console.log(data.data)
        this.title = data.data[0].returnType == 1 ? '退货详情' : '换货详情'
        this.detail = data.data;
        this.detail[0].attribute = JSON.parse(this.detail[0].attribute)
      });
    }
  },
  mounted: function() {
    this.init()

  },
  props: []
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.returnDetailTitle {
  .px2vw(height, 84);
  text-align: left;
  .px2vw(line-height, 84);
  .px2vw(padding-left, 19);
  .px2vw(margin-bottom, 6);
  background-color: #181818;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.50)
}

.returnDetailText {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .px2vw(height, 52);
  .px2vw(line-height, 52);
  .px2vw(padding-left, 19);
  .px2vw(margin-bottom, 7);
  text-align: left;
}

.titleBox {
  background: rgba(41, 41, 41, 0.5);
  border-radius: 2px 2px 0 0;
  .px2vw(height, 32);
  .px2vw(line-height, 32);
  text-align: left;
  .px2vw(padding-left, 19);
}

.orders {
  width: 92.6vw;
  margin: 0 auto;
  height: 33.6vw;
  box-sizing: border-box;
  padding-top: 5.06vw;
  padding-bottom: 5.06vw;
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

.order-goodsText {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  border-radius: 4px 4px 0 0;
  .px2vw(margin-bottom, 10);
}

.returnDetailBox {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .px2vw(height, 197);
  .px2vw(padding-left, 19);
  .px2vw(padding-right, 8);
  div+div {
    .px2vw(padding-top, 5);
    .px2vw(padding-bottom, 9);
  }
  div {
    text-align: left;
    .px2vw(line-height, 20);
    border-bottom: 1px solid rgba(74, 74, 74, 0.3);
  }
  div:first-child {
    .px2vw(padding-top, 20);
    .px2vw(padding-bottom, 9);
  }
  div:last-child {
    border: none
  }
}

</style>
