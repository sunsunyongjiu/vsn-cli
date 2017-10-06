<template>
  <div class="vsn-wrap">
    <back title="发票信息" class="vsn-header"></back>
    <div class="vsn-main">
      <div class="ticket-type font-15">
        发票类型
      </div>
      <div class="type-box">
        <div class="type-item  font-13">
          纸质发票
        </div>
      </div>
      <div class="ticket-type font-15">
        发票开具主体
      </div>
      <div class="type-box">
        <div class="type-item-2  font-13">
          杭州驭缘网络科技有限公司
        </div>
      </div>
      <div class="ticket-type font-15">
        发票抬头
      </div>
      <div class="type-box">
        <div class="type-hedder-item-box">
          <div class="type-hedder-item font-12">
            <div class="morenCircle" :class="{setMorenCircle:person}" @click="check(1)"></div>
            <span class="type-box-left">个人</span>
          </div>
          <div class="type-hedder-item font-12">
            <div class="morenCircle" :class="{setMorenCircle:company}" @click="check(2)"></div>
            <span class="type-box-left">单位</span>
          </div>
          <!-- <div class="type-hedder-item font-12">
          <div class="morenCircle" :class="{setMorenCircle:main}" @click="check(3)"></div>
          <span class="type-box-left">发票开具主体</span>
        </div> -->
        </div>
        <div v-if="company||main">
          <x-input placeholder="请填写单位名字" class="type-hedder-item-input font-14" v-model="ticket.company" v-if="company"></x-input>
          <x-input placeholder="请填写纳税人识别号" class="type-hedder-item-input font-14" v-model="ticket.tax_number" v-if="company"></x-input>
          <x-input class="type-hedder-item-input font-14" disabled v-model="ticket.main" v-if="main"></x-input>
          <!-- <x-input placeholder="请填写纳税人识别号" class="type-hedder-item-input font-14" v-model="ticket.main_tax_number" disabled></x-input> -->
        </div>
      </div>
    </div>
    <div class="vsn-footer">
      <div class="sureBtn font-18" @click="sureTicket" v-if="showSure">
        确定
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav';
import { XInput } from 'vux';
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime());
export default {
  name: '',
  data() {
    return {
      common: false,
      person: true,
      company: false,
      main: false,
      showSure: true,
      ticket: {
        company: '',
        tax_number: '',
        main: '杭州驭缘网络科技有限公司'
      }
    }
  },
  components: {
    back,
    XInput
  },
  methods: {
    check: function(num) {
      this.person = num == 1 ? true : false;
      this.company = num == 2 ? true : false;
      this.main = num == 3 ? true : false;

    },
    init: function() {
      this.$http.get(this.$Api('/order/getOrderInvoice'), {
        params: { 'subNumber': this.$route.query.subNumber },
        headers: {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/order/getOrderInvoice" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
      }).then((response) => {
        console.log(response.data.data)
        if (response.data.data) {
          this.showSure = false;
          this.ticket = response.data.data;
          this.person = response.data.data.title_id == 1 ? true : false;
          this.company = response.data.data.title_id == 2 ? true : false;
          this.main = response.data.data.title_id == 3 ? true : false;
          this.ticket.company = response.data.data.title_id == 3 ? '' : this.ticket.company
        }


      }, (response) => {
        // error callback
      });
      console.log(this.ticket)
    },
    sureTicket: function() {
      this.$vux.loading.show({
        text: 'loading'
      })
      let header = {
        "token": this.$store.state.loginUser.token,
        "time": timer,
        "sign": md5("/order/updateOrderInvoice" + this.$store.state.loginUser.token + timer).toUpperCase()
      }
      // 设置传值
      let cartData = {
        'subNumber': this.$route.query.subNumber,
        'typeId': 1,
        'titleId': this.person ? 1 : 2,
        'company': this.person ? '' : this.ticket.company,
        'taxNumber': this.person ? '' : this.ticket.tax_number,
      }
      if (this.main) {
        cartData.titleId = 3;
        cartData.company = '杭州驭缘网络科技有限公司';
      }
      this.$http({
        method: 'POST',
        url: this.$Api('/order/updateOrderInvoice'),
        params: cartData,
        headers: header,
        emulateJSON: true
      }).then(function(data) { //es5写法
        console.log(data)
        this.$vux.loading.hide()
        this.$router.go(-1)

      }, function(error) {
        //error
      })
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
.ticket-type {
  opacity: 0.5;
  background: #292929;
  border-radius: 2px 2px 0 0;
  width: 100vw;
  height: 8.5vw;
  line-height: 8.5vw;
  font-size: 15px;
  color: #fff;
  text-align: left;
  padding-left: 5vw;
  box-sizing: border-box;
  margin-top: 3vw
}



.type-box {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  overflow: hidden;
  margin-bottom: 2.4vw;
  padding: 5vw 0vw 5vw 5vw;
  .type-item {
    border: 1px solid #1dafed;
    max-width: 20.8vw;
    height: 6.4vw;
    line-height: 6.4vw;
    font-size: 13px;
    color: #1dafed;
  }
  .type-item-2 {
    border: 1px solid #1dafed;
    max-width: 46.8vw;
    height: 6.4vw;
    line-height: 6.4vw;
    font-size: 13px;
    color: #1dafed;
  }
}

.morenCircle {
  background: none;
  border: 1px solid #1dafed;
  box-sizing: border-box;
  width: 4.2vw;
  height: 4.2vw;
  border-radius: 100%;
  float: left;
  margin-right: 1vw;
}

.setMorenCircle {
  background: #1dafed !important;
  width: 4.2vw;
  height: 4.2vw;
  border-radius: 100%;
  float: left;
}

.type-box-left {
  float: left;
}

.type-hedder-item {
  overflow: hidden;
  float: left;
  color: #fff;
  margin-right: 3vw;
}

.sureBtn {
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  height: 14.6vw;
  line-height: 14.6vw;
  color: #fff;
}

.vsn-footer {
  height: 14.6vw;
}

.type-hedder-item-box {
  overflow: hidden;
  width: 100%
}

.type-compony-input {
  width: 89.3vw;
  height: 10.6vw;
  line-height: 10.6vw;
}

.type-hedder-item-input {
  height: 10.6vw;
  line-height: 10.6vw;
  font-size: 14px;
  background: #292929;
  box-sizing: border-box;
  color: #fff;
  width: 89.3vw;
  border-radius: 2px;
  margin-top: 5.6vw;
}

.weui-cell:before {
  display: none
}

</style>
