<template>
  <div>
    <back title="发票信息"></back>
    <div class="ticket-type">
      发票类型
    </div>
    <div class="type-box">
      <div class="type-item">
        纸质发票
      </div>
    </div>
    <div class="ticket-type">
      发票抬头
    </div>
    <div class="type-box">
      <div class="type-hedder-item-box">
        <div class="type-hedder-item">
          <div class="morenCircle" :class="{setMorenCircle:common}" @click="common=!common"></div>
          <span class="type-box-left">个人</span>
        </div>
        <div class="type-hedder-item">
          <div class="morenCircle" :class="{setMorenCircle:!common}" @click="common=!common"></div>
          <span class="type-box-left">单位</span>
        </div>
      </div>
      <div v-if="!common">
        <x-input placeholder="请填写单位名字" class="type-hedder-item-input"></x-input>
        <x-input placeholder="请填写纳税人识别号" class="type-hedder-item-input"></x-input>
      </div>
    </div>
    <div class="sureBtn">
      确定
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import { XInput } from 'vux'
export default {
  name: '',
  data() {
    return {
      common: false,
    }
  },
  components: {
    back,
    XInput
  },
  methods: {

  },
  mounted: function() {


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
    width: 20.8vw;
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
  position: absolute;
  bottom: 20vw;
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 86.4vw;
  height: 14.6vw;
  line-height: 14.6vw;
  font-size: 24px;
  color: #fff;
  left: 6.8vw;
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
