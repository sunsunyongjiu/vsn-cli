<template>
  <div>
    <back title="选择地址"></back>
    <div class="locationList">
      <swipeout class="vux-1px-tb" v-for="(item,index) in locationList" key=index>
        <swipeout-item transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button type="warn" class="cha" @click.native="deleteItem(item)">×</swipeout-button>
          </div>
          <div slot="content" class="locations">
            <div>
              <div class="locationsLeft">
                <span v-text="item.RECEIVER" class="font-16"></span>
                <span v-text="item.moble" class="font-16"></span>
                <div>
                  <span class="font-14">
                  	{{item.province}}{{item.CITY}}{{item.area}}{{item.town}}{{item.subAdds}}
                  </span>
                </div>
              </div>
              <div class="locationsRight" @click="addLocation(1)">
                <img src="../../assets/imgs/edit.png">
              </div>
            </div>
          </div>
        </swipeout-item>
      </swipeout>
      <div>
      </div>
    </div>
    <div class='addLocation' @click="addLocation(0)">
      添加新地址
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  name: '',
  data() {
    return {
      locationList: [
      ]
    }
  },
  components: {
    back,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {
    addLocation: function(edit) {
      this.$router.push({ path: '/addLocation', query: { 'edit': edit } })
    },
    deleteItem: function(item) {
      console.log(item)
    },
    init: function() {
      let header = {
        headers: {
          "token": this.$store.state.loginUser.token,
        }
      }
      this.$http.get(this.$Api('/address/getUserAllAddress'), header).then((response) => {
      		console.log(response.data.data)
      		this.locationList=response.data.data
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
.locations {
  background: #181818;
  ;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 100%;
  height: 26.6vw;
  color: #7a7a7a;
  box-sizing: border-box;
  padding: 5.3vw 0;
  margin-bottom: 4px;
  margin-top: 10px;
  .locationsLeft {
    float: left;
    width: 83vw;
    padding-left: 5vw;
    text-align: left;
    line-height: 20px;
    box-sizing: border-box;
  }
  .locationsRight {
    float: right;
    width: 17vw;

    padding-right: 3vw;
    box-sizing: border-box;
    img {
      height: 4.5vw;
      margin-top: 6.0vw
    }
  }
}

.addLocation {
  background: #1dafed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 90vw;
  height: 14.6vw;
  line-height: 14.6vw;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  position: absolute;
  bottom: 10vw;
  left: 5vw;
}
.locationList{
	padding-bottom: 24vw;
}
.cha {
  font-size: 26px
}

</style>
