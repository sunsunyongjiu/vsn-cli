<template>
  <div class="vsn-wrap">
    <!-- <back title="选择地址"></back> -->
    <div class='vsn-main'>
      <div class="locationList">
        <swipeout class="vux-1px-tb" v-for="(item,index) in locationList" key=index>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button type="warn" class="cha font-30" @click.native="deleteItem(item)">×</swipeout-button>
            </div>
            <div slot="content" class="locations">
              <div>
                <div class="locationsLeft" @click="setAddr(item)">
                  <span v-text="item.RECEIVER" class="font-16"></span>
                  <span v-text="item.moble" class="font-16"></span>
                  <div>
                    <span class="font-14">
                    {{item.province}}{{item.CITY}}{{item.area}}{{item.town}}{{item.subAdds}}
                  </span>
                  </div>
                </div>
                <div class="locationsRight" @click="addLocation(1,item)">
                  <img src="../../assets/imgs/edit.png">
                </div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
        <div>
        </div>
      </div>
    </div>
    <div class='addLocation font-18' @click="addLocation(0)">
      添加新地址
    </div>
    <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm" confirm-text="是" cancel-text="否">
      <div style="height:100%;color:#737373;line-height:1;text-align:center;" class="confirmBox font-18">
          <img src="../../assets/imgs/tanhao.png" class="confirm-tanhao">
          <div class="confirm-text">确认删除地址吗？</div>
        </div>
    </confirm>
  </div>
</template>
<script>
import back from '../../components/backNav'
import { Swipeout, SwipeoutItem, SwipeoutButton, Confirm } from 'vux'
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  data() {
    return {
      locationList: [],
      show: false,
      deleteOne: {}
    }
  },
  components: {
    back,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Confirm
  },
  methods: {
    addLocation: function(edit, item) {
      if (edit) {
        this.$store.dispatch({ type: 'setEditAddr', data: item })
      }
      this.$router.push({ path: '/addLocation', query: { 'edit': edit } })
    },
    onCancel: function() {

    },
    onConfirm: function() {
      let header = {
        "token": this.$store.state.loginUser.token,
        "time": timer,
        "sign": md5("/address/deleteUserCommonAdd" + this.$store.state.loginUser.token + timer).toUpperCase()
      }
      // 设置传值
      let cartData = {
        'addrId': this.deleteOne.addrId,

      }

      this.$http({
        method: 'POST',
        url: this.$Api('/address/deleteUserCommonAdd'),
        params: cartData,
        headers: header,
        emulateJSON: true
      }).then(function(data) { //es5写法
        this.init()
      }, function(error) {
        //error
      })
    },
    deleteItem: function(item) {
      console.log(item)
      this.deleteOne = item
      this.show = true

    },
    setAddr: function(item) {
      console.log(item)
      if (this.$route.query.from == 'person') {
        return
      } else if (this.$route.query.from == 'return') {
        this.$store.dispatch({ type: 'setSessionAddr', data: item });
        this.$router.go(-1)
      } else {
        this.$store.dispatch({ type: 'setAddr', data: item })
        this.$router.go(-1)

      }

    },
    init: function() {
      let header = {
        headers: {
          "token": this.$store.state.loginUser.token,
          "time": timer,
          "sign": md5("/address/getUserAllAddress" + this.$store.state.loginUser.token + timer).toUpperCase()
        }
      }
      this.$http.get(this.$Api('/address/getUserAllAddress'), header).then((response) => {
        console.log(response)
        console.log(response.data.data)
        this.locationList = response.data.data
      }, (response) => {
        // error callback
      });
    }
  },
  mounted: function() {
    this.init()

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.locations {
  background: #181818;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  height: 26.6vw;
  color: #fff;
  box-sizing: border-box;
  padding: 5.3vw 0;
  margin-bottom: 4px;
  display: table;
  position: relative;
  .locationsLeft {
    /*float: left;*/
    width: 83vw;
    height: 16vw;
    padding-left: 5vw;
    text-align: left;
    /*line-height: 20px;
    .px2vw(line-height, 20);*/
    box-sizing: border-box;
    display: table-cell;
    vertical-align: middle;
  }
  .locationsRight {
    right: 0;
    top: 50%;
    width: 17vw;
    position: absolute;
    padding-right: 3vw;
    box-sizing: border-box;
    margin-top: -2.2vw;
    img {
      height: 4.5vw;
    }
  }
}

.addLocation {
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  height: 14.6vw;
  line-height: 14.6vw;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}

.locationList {
  padding-bottom: 24vw;
}

.cha {
  font-size: 26px
}

</style>
