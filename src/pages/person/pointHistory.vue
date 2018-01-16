<template>
  <div>
  <!--  <back title="积分兑换记录"></back>  -->
    <div class="historyBox">
      <div class="font-16 fff pointTitle">
        当前积分
      </div>
      <div v-text="loginUser.points" class="font-36 basicColor pointText">
      </div>
      <div class="personal-title-googsBox">
      </div>
    </div>
    <div class="historyTextBoxTitle font-15">积分兑换纪录</div>
    <div class="historyTextBox">
      <div v-for="(item,index) in historyList" :key=index style="position:relative" class="historyItem">
        <div v-text="item.log_desc" class="historyListTitle font-14 fff"></div>
        <div v-text="item.add_time" class="font-13 color-87 historyListDate"></div>
        <div v-text="item.integral_num" class="font-14 fff historyListNum"></div>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import { mapGetters } from 'vuex'
import Apis from '../../configers/Api'
export default {
  name: '',
  data() {
    return {
      historyList: ''
    }
  },
  components: {
    back
  },
  methods: {
    init: function() {
      console.log(this.loginUser)
      Apis.getPointList(this.$store.state.loginUser.token).then(data => {
        console.log(data.data)
        this.historyList = data.data
      })
    },
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
@import '../../assets/css/global.less';


.personal-title-googsBox {
  height: 13.6vw;
  width: 100%;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  background: url('../../assets/imgs/loading.png') no-repeat bottom;
  background-size: 100%;
}

.historyBox {
  .px2vw(height,
  120);
  position: relative;
}

.pointTitle {
  .px2vw(margin-top,
  31);
}

.pointText {
  .px2vw(margin-top,
  12);
}

.historyTextBox {
  .px2vw(padding-left,
  18);
  .px2vw(padding-right,
  18);
}

.historyTextBoxTitle {
  .px2vw(padding-left,
  18);
  border-bottom: 1px solid rgba(74, 74, 74, 0.3);
  width: 100%;
  background: rgba(41, 41, 41, 0.5);
  border-radius: 2px 2px 0 0;
  box-sizing: border-box;
  .px2vw(height,
  32);
  .px2vw(line-height,
  32);

  text-align: left;
  color: #fff;
  .px2vw(margin-bottom,
  17);
}

.historyListTitle {
  text-align: left;
  width: 40%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;

  .px2vw(height,
  18);
  .px2vw(padding-top,
  15);
  .px2vw(line-height,
  18);
}

.historyListNum {
  position: absolute;
  top: 50%;
  .px2vw(height,
  14);
  .px2vw(margin-top,
  -7);
  .px2vw(right,
  2);
}

.historyItem {
  .px2vw(height,
  60);
  border-bottom: 1px solid rgba(74, 74, 74, 0.3);
}

.historyListDate {
  float: left;
  .px2vw(margin-top,
  4);
}

</style>
