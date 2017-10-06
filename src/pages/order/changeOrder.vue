<template>
  <div class="vsn-wrap">
    <back :title="title"></back>
    <div class="vsn-main">
      <div class="order-goods">
        <div class="order-person-title font-15">
          商品信息
        </div>
        <div class="order-goodsText">
          <div class="orders" v-for="(item,index) in order.prod" key='index'>
            <div class="orders-left">
              <img :src="item.pic">
            </div>
            <div class="orders-mid">
              <div class="font-16 df orders-mid-title" v-text="item.prod_name"></div>
              <div v-for="(attr , n) in item.attribute">
                <span v-text="attr.key"></span>:
                <span v-text="attr.value"></span>
              </div>
              <div class=" font-11">数量：x<span v-text="item.basket_count">1</span></div>
              <div class="orders-mid-bottom">
                <span v-if="order.sellType==0">￥</span>
                <span class="basicColor font-16" v-text="item.product_total_amout"></span>
                <span class="font-9" v-if="order.sellType==1">积分</span>
              </div>
            </div>
            <div class="order-line"></div>
          </div>
        </div>
      </div>
      <div class="change-reason" v-for="(item,index) in order.prod" key='index' v-if="$route.query.returnType=='1'">
        <span class="font-14">退款金额：</span>
        <span v-if="order.sellType==0" class="font-10 basicColor">￥</span>
        <span class="font-18 basicColor" v-text="item.product_total_amout"></span>
        <span class="font-9 basicColor" v-if="order.sellType==1">积分</span>
      </div>
      <div class="change-reason" @click="showPop=true">
        <span class="font-14" style="float:left">{{$route.query.returnType=='2'?'换货原因':'退货原因'}}</span>
        <span style="float:right" v-text="resonText" class="font-14"></span>
      </div>
      <div class='change-reason-input' v-if="resonText=='其他'">
        <div>
          <span class="fff font-14">{{$route.query.returnType=='2'?'换货理由：':'退货理由：'}}</span><span class="color-9b font-14">（选填，100字以内）</span>
        </div>
        <div class="inputBox">
          <textarea maxlength="200" v-model="textareaText"></textarea>
        </div>
      </div>
      <div class="change-picBox">
        <div class="change-picBox-title font-14 fff">上传凭证</div>
        <div class="change-picBox-imgs">
          <imgUploader v-model="target" v-on:imgUrl="getUrl" myid="img1" class="items"></imgUploader>
          <imgUploader v-model="target" v-on:imgUrl="getUrl" myid="img2" v-if="photoFile.photoFile1"></imgUploader>
          <imgUploader v-model="target" v-on:imgUrl="getUrl" myid="img3" v-if="photoFile.photoFile2"></imgUploader>
          <imgUploader v-model="target" v-on:imgUrl="getUrl" myid="img4" v-if="photoFile.photoFile3"></imgUploader>
        </div>
      </div>
      <div v-transfer-dom>
        <popup v-model="showPop" position="bottom" max-height="70%">
          <div class="reason-title font-15">
            退款原因
          </div>
          <div v-for="(item,index) in reasons" class="reasons">
            <div class="font-14">
              {{item.return_reason}}
              <input type="radio" name="reson" @click="choose(item)">
            </div>
          </div>
        </popup>
      </div>
    </div>
    <div class="submitBtn font-18 fff" @click="exchangeOrder">
      提交
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav';
import imgUploader from '../../components/imgUploader';
import Apis from '../../configers/Api'
import { TransferDom, Popup, XButton } from 'vux'
export default {
  name: '',
  directives: {
    TransferDom
  },
  data() {
    return {
      order: {
        address: {
          RECEIVER: '',
          moble: ''
        },
        prod: []
      },
      returnOrder: false,
      target: '',
      reasons: [],
      showPop: false,
      resonText: '>',
      textareaText: '',
      photoFile: {
        photoFile1: '',
        photoFile2: '',
        photoFile3: '',
        phptoFile4: ''
      },
      title: this.$route.query.returnType == '2' ? '申请换货' : '申请退货'
    }
  },
  components: {
    back,
    imgUploader,
    Popup,
    XButton
  },
  methods: {
    init: function() {
      let _this = this
      Apis.getOrderDetail(this.$store.state.loginUser.token, { 'subNumber': this.$route.query.subNumber }).then(data => {
        _this.order = data.data[0];
        _this.order.prod.forEach(function(x) {
          x.attribute = JSON.parse(x.attribute)
        })
      });
      // 获取退换货原因列表
      Apis.getProdReturnReasonList().then(data => {
        console.log(data.data)
        this.reasons = data.data
      });
    },
    choose: function(item) {
      this.showPop = false
      this.resonText = item.return_reason
    },
    getUrl: function(imageBase64) {

      Apis.uploadImage(imageBase64.url, 'returnOrderPhoto').then(data => {
        console.log(data)
        if (data.code == 1) {
          if (imageBase64.id == 'img1') {
            this.photoFile.photoFile1 = data.data.fileName
          } else if (imageBase64.id == 'img2') {
            this.photoFile.photoFile2 = data.data.fileName
          } else if (imageBase64.id == 'img3') {
            this.photoFile.photoFile3 = data.data.fileName
          } else {
            this.photoFile.photoFile4 = data.data.fileName
          }

        }
      });
    },
    goLocation: function() {
      this.$router.push({ path: '/choseLocation' })
    },
    exchangeOrder: function() {
      this.$vux.loading.show({
        text: 'loading'
      })
      let data = {
        subNumber: this.$route.query.subNumber,
        returnType: this.$route.query.returnType,
        postType: this.$route.query.postType,
        addrId: this.$route.query.addrId,
        returnReason: this.resonText,
        returnDescription: this.textareaText,
        subItemID: this.$route.query.itemIid,
        photoFile1: this.photoFile.photoFile1,
        photoFile2: this.photoFile.photoFile2,
        photoFile3: this.photoFile.photoFile3,
        photoFile4: this.photoFile.photoFile4,

      }
      Apis.exchangeOrder(this.$store.state.loginUser.token, data).then(data => {
        console.log(data)
        this.$vux.loading.hide()
        this.$router.push({ path: '/order' })
      });
    },
  },
  mounted: function() {
    this.init()

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.order-person-title {
  .px2vw(margin-top, 10);
  opacity: 0.5;
  background: #292929;
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

.order-goodsText {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
}

.order-selectBox {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  overflow: hidden;
  .px2vw(padding-bottom, 21);
  .order-selectBox-item {
    position: relative;
    .px2vw(width, 78);
    .px2vw(height, 20);
    .px2vw(line-height, 20);
    .px2vw(margin-left, 25);
    .px2vw(margin-top, 20);
    border: 1px solid #787878;
    color: #787878;
    float: left;
    .selecters-triangle {
      height: 70%;
      display: none;
    }
  }
  .way-select {
    border: 1px solid #1dafed;
    color: #1dafed
  }
  .order-location {
    .px2vw(width, 346);
    .px2vw(margin-left, 14.5);
    .px2vw(margin-top, 28);
    float: left;
    overflow: hidden;
    .order-location-title {
      width: 100%;
      border-bottom: 1px solid #4a4a4a;
      text-align: left;
      .px2vw(font-size, 13);
      .px2vw(padding-bottom, 7);
      color: #7a7a7a;
    }
    .order-location-text {
      .px2vw(height, 86);
      .px2vw(padding-top, 18);
      text-align: left;
      .order-location-text-left {
        float: left;
        .px2vw(width, 287);
        .locationDetail {
          .px2vw(line-height, 20);
          .px2vw(margin-top, 10);
        }
      }

      .order-location-text-right {
        float: left;
        .px2vw(width, 59);
        .px2vw(height, 17);
        box-sizing: border-box;
        .px2vw(margin-top, 34.5);
        .px2vw(padding-left, 17);
        border-left: 1px solid #4a4a4a;
        height: 100%;
        img {
          .px2vw(width, 17);
          .px2vw(height, 17);
        }
      }
    }
  }
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
    width: 46.6vw;
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

.submitBtn {
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  .px2vw(height, 55);
  .px2vw(line-height, 55);
}

.selecter-selected {
  border: 1px solid #1dafed !important;
  color: #1dafed !important;
  .selecters-triangle {
    display: block !important;
    position: absolute;
    right: -1px;
    top: -1px;
  }
}

.change-reason {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .px2vw(width, 375);
  .px2vw(height, 42);
  box-sizing: border-box;
  .px2vw(line-height, 42);
  .px2vw(margin-top, 9);
  .px2vw(padding-left, 20);
  .px2vw(padding-right, 20);
  color: #fff;
  text-align: left;
}

.change-reason-input {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .px2vw(width, 375);
  .px2vw(height, 82);
  box-sizing: border-box;
  text-align: left;
  .px2vw(padding-left, 20);
  .px2vw(padding-right, 20);
  .px2vw(padding-top, 9);
  .px2vw(margin-top, 9);
  textarea {
    background: none;
    border: 0;
    width: 100%;
    .px2vw(height, 40);
    color: #fff;
    .px2vw(line-height, 20);
  }
}

.change-picBox {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  box-sizing: border-box;
  .px2vw(width, 375);
  .px2vw(margin-top, 9);
  .px2vw(padding-left, 20);
  .px2vw(margin-bottom, 100);
  .px2vw(height, 150);
}

.reasons {
  .px2vw(height, 40);
  .px2vw(line-height, 40);
  box-sizing: border-box;
  background: #4e4e4e;
  color: #b4b4b4;
  .px2vw(padding-left, 19);
  .px2vw(padding-right, 19);
  input[type=radio] {
    float: right;
    .px2vw(margin-top, 13);
  }
}

.reasons:not(:last-child) {
  border-bottom: 1px solid #4a4a4a;
}

.reason-title {
  border-bottom: 1px solid #4a4a4a;
  .px2vw(height, 40);
  .px2vw(line-height, 40);

  text-align: center;
  background: #4e4e4e;
  color: #fff
}

.change-picBox-title {
  text-align: left;
  .px2vw(margin-top, 9);
  .px2vw(margin-bottom, 17);
}

.change-picBox-imgs {
  overflow: hidden;
  img {
    border: 0 !important
  }
  .change-picBox-uploadBox {
    float: left;
    .px2vw(margin-right, 20);
  }
}

</style>
