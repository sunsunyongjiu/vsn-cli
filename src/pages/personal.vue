<template>
  <div>
   <!--<back title="个人信息"></back>-->
    <div class="personal-title-logo">
      <img src="../assets/imgs/me.png">
    </div>
    <div>
      <span v-text="loginUser.name" class="font-16 fff"></span>
    </div>
    <div class="personal-title-point font-10">
      <img src="../assets/imgs/s_integral.png">
      <span v-text="loginUser.score">
        
      </span>
      <span>
        积分
      </span>
    </div>
    <!--
    <div class="personal-title-googsBox">
      <div class="personal-title-googs font-11">
        查看可以兑换的商品
      </div>
    </div>
 		-->
    <div class="detailBox">
      <div class="details">
        <div class="details-left">
          <img src="../assets/imgs/member.png" class="personal-img"> 会员名称
        </div>
        <div v-text="loginUser.name" class='details-right'></div>
      </div>
      <div class="line"></div>
      <div class="details">
        <div class="details-left">
          <img src="../assets/imgs/level.png" class="personal-img"> 会员等级
        </div>
        <div v-text="loginUser.grade" class='details-right'></div>
      </div>
      <div class="line"></div>
      <div class="details">
        <div class="details-left"><img src="../assets/imgs/phone.png" class="personal-img"> 联系方式
        </div>
        <div class='details-right'>
          <input type="text" name="country" :value="loginUser.mobile" readonly="readonly"  style="background:none;text-align:right;border:none" class="color-87">
        </div>
      </div>
      <div class="line"></div>
      <div class="details" @click="goPointHistory">
        <div class="details-left"><img src="../assets/imgs/integral.png" class="personal-img"> 可用积分
        </div>
        <div style="float:right"></div>
        <div  class='details-right'>
          <span v-text="loginUser.score"></span> &gt;
        </div>

      </div>
      <div class="line"></div>
      <div class="details">
        <div class="details-left">
          <img src="../assets/imgs/location.png" class="personal-img"> 收货地址
        </div>
        <div class='details-right' @click="goLocation">管理我的收货地址 &gt;</div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../components/backNav'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    back
  },
  methods: {
    init: function() {
      console.log(this.loginUser)
    },
    goLocation: function() {
      this.$router.push({ path: '/choseLocation', query: { 'from': 'person' } })
    },
    goPointHistory:function(){
      this.$router.push({ path: '/pointHistory' })
    }
  },
  mounted: function() {
    this.init()

  },
  computed: {

    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      loginUser: 'getLogin'

    })
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/global.less';
.personal-title-logo {
  height: 21.3vw;
  width: 21.3vw;
  margin: 10.4vw auto 4vw;
  img {
    width: 100%;
    height: 100%
  }
}

.detailBox {
  padding: 0 5vw 0;
  background: #181818;
  margin-top: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  .line {
    opacity: 0.3;
    height: 2px;
    background: #4a4a4a;
    width: 100%;
  }
  .details {
    height: 19.7vw;
    line-height: 19.7vw;
    .details-left {
      float: left;
      .px2vw(font-size, 14);
      font-size: 14px;
      color: #ffffff;
      text-align: left;
    }
    .details-right {
      float: right;

      .px2vw(font-size, 13);
      color: #878787;
      text-align: right;
    }
  }
}

.personal-title-point {
  background: #292929;
  border-radius: 100px;
  width: 20.7vw;
  .px2vw(height, 18);
  .px2vw(line-height, 18);
  margin: 4vw auto 0;

  font-size: 10px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  img {
    height: 100%;
    vertical-align: middle;
  }
}

.personal-title-googs {
  border: 1px solid #1dafed;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  width: 35vw;
  height: 6vw;
  line-height: 6vw;
  color: #1dafed;
  letter-spacing: 0;
  text-align: center;
  position: absolute;
  right: 0;
  border-right: 0;
}

.personal-title-googsBox {
  height: 13.6vw;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: url('../assets/imgs/loading.png') no-repeat bottom;
  background-size: 100%;
}

.personal-img {
  .px2vw(height,
  18);
  vertical-align: middle;
}

</style>
