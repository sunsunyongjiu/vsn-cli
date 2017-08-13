<template>
  <div>
    <back :title="addTitle"></back>
    <div class='addLocationBox'>
      <div class="settings">
        <div class="settings-left">收货人</div>
        <input type="text" v-model="postData.receiver" class="addLocationBox-input">
      </div>
      <div class="line"></div>
      <div class="settings">
        <div class="settings-left">联系电话</div>
        <input type="text" v-model="postData.mobile" class="addLocationBox-input">
      </div>
      <div class="line"></div>
      <div class="settings">
        <div class="settings-left">所在地区</div>
        <div @click="popShow" class="settings-right" v-text="locationDetail"></div>
      </div>
      <div class="line"></div>
      <div class="settings">
        <div class="settings-left">详细地址</div>
        <input type="text" v-model="postData.subAdds" class="addLocationBox-input">
      </div>
      <div class="line"></div>
      <div class="settings setMoren">
        <div class="morenCircle" @click="setCommon" :class="{setMorenCircle:common}"></div>
        设为默认地址
      </div>
      <div class="line"></div>
      <div class='addLocation' @click="saveAdd">
        保存
      </div>
      <div v-transfer-dom class="locationPop">
        <popup v-model="show2" height="97.8vw">
          <div class="location-pop-title">所在地区</div>
          <div class="locationPop-areas">
            <div v-for="(item,index) in area" v-text="item.text" :class="{areaActive:item.select}" @click="checkCitys(item,index)" v-if="item.show"></div>
          </div>
          <div class="area-textBox">
            <div v-for="(item ,index) in citys.citys" v-text="item.text" @click="changeCity(item,citys.citys)" :class="{citeActive:item.select}"></div>
          </div>
        </popup>
      </div>
    </div>
  </div>
</template>
<script>
import back from '../../components/backNav'
import { TransferDom, Popup, Scroller, Tab, TabItem } from 'vux'
import { mapGetters } from 'vuex'
import md5 from 'js-md5';
const timer = JSON.stringify(new Date().getTime())
export default {
  name: '',
  directives: {
    TransferDom
  },
  data() {
    return {
      locationSettings: [
        '收货人', '联系电话', '所在地区', '详细地址'
      ],
      location: {
        name: 'lucy',
        tel: '18624443537',
        area: '大连',
        location: '大连市甘井子区'
      },
      addTitle: '添加新地址',
      show2: false,

      value4: ['china', 'china002', 'gx002'],
      area: [
        { 'text': '省', select: true, citys: [], index: 0, show: true },
        { 'text': '市', select: false, citys: [], index: 1, show: false },
        { 'text': '区', select: false, citys: [], index: 2, show: false },
        { 'text': '街道', select: false, citys: [], index: 3, show: false },
      ],
      citys: { citys: [] },
      locationDetail: '请选择地址',
      postData: {
        receiver: '',
        mobile: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        townId: '',
        subAdds: '',
        commonAddr: '0',
        status: 1

      },
      common: false
    }
  },
  components: {
    back,
    TransferDom,
    Popup,
    Scroller,
    Tab,
    TabItem
  },
  methods: {
    // 初始化调用数据
    init: function() {
      let _this = this
      if (this.$route.query.edit) {
        this.addTitle = "编辑地址"
        console.log(this.editAddr)
        this.postData.receiver = this.editAddr.RECEIVER
        this.postData.mobile = this.editAddr.moble
        this.postData.subAdds = this.editAddr.SUB_ADDS
        this.postData.addrId = this.editAddr.addrId
        this.postData.provinceId = this.editAddr.provinceId
        this.postData.cityId = this.editAddr.cityId
        this.postData.areaId = this.editAddr.areaId
        this.postData.townId = this.editAddr.townId
        if (this.editAddr.town) {
          this.locationDetail = this.editAddr.province + this.editAddr.CITY + this.editAddr.area + this.editAddr.town
        } else {
          this.locationDetail = this.editAddr.province + this.editAddr.CITY + this.editAddr.area
        }



      }
      document.title = this.addTitle

      // 获取省
      this.$http.get(this.$Api('/address/getAllProvinces')).then((response) => {

        for (var i in response.data.data) {
          let obj = { text: i, id: response.data.data[i], select: false }
          _this.area[0].citys.push(obj)

        }
      }, (response) => {
        // error callback
      });
      // 下列数据初始化时使用省的
      this.citys = this.area[0];
    },
    // 点击选择地区弹出
    popShow: function() {
      this.show2 = true
      this.citys = this.area[0];
      // 是所有导航不被选中
      this.area.forEach(function(n) {
        n.select = false
      })
      // 初始化省被选中
      this.area[0].select = true
      // 如果最后一橡不是空的，展示区
      if (this.area[3].text != "街道" && this.area[3].text != "请选择") {
        this.area[3].show = true
      }
    },
    saveAdd: function() {
      let header = {
        "token": this.$store.state.loginUser.token,
        "time": timer,
        "sign": md5("/address/insertUserAddress" + this.$store.state.loginUser.token + timer).toUpperCase()
      }

      let header1 = {
        "token": this.$store.state.loginUser.token,
        "time": timer,
        "sign": md5("/address/updateUserAddress" + this.$store.state.loginUser.token + timer).toUpperCase()
      }
      // 当为编辑模式时
      if (this.$route.query.edit) {
      	this.$http({
          method: 'POST',
          url: this.$Api('/address/updateUserAddress'),
          params: this.dataLast,
          headers: header1,
          emulateJSON: true
        }).then(function(data) {
          console.log(data)
          this.$router.go(-1)
        }, function(error) {
          //error
        })

      } else {
        this.$http({
          method: 'POST',
          url: this.$Api('/address/insertUserAddress'),
          params: this.dataLast,
          headers: header,
          emulateJSON: true
        }).then(function(data) {
          console.log(data)
          this.$router.go(-1)
        }, function(error) {
          //error
        })

      }

    },
    checkCitys: function(item, index) {
      // 点击tab时，修改选中状态
      this.area.forEach(function(n) {
        n.select = false
      })
      item.select = true
      this.citys = item


    },
    changeCity: function(nm, parent) {
      // 不展示地区
      this.area[3].show = false
      let _this = this
      this.citys.text = nm.text
      parent.forEach(function(item) {
        item.select = false
      })
      nm.select = true

      let num = this.citys.index
      _this.area[num].selectedId = nm.id

      if (num < 3) {
        this.area.forEach(function(n) {
          if (n.index > num + 1) { n.show = false }
        })
        _this.area[num + 1].show = true
        _this.area[num + 1].text = '请选择'
        if (num == 0) {

          _this.area[1].citys = []
          this.$http.get(this.$Api('/address/getAllCitys'), { params: { 'id': nm.id } }).then((response) => {

            for (var i in response.data.data) {
              let obj = { text: i, id: response.data.data[i], select: false }
              _this.area[1].citys.push(obj)

            }
          }, (response) => {
            // error callback
          });
        } else if (num == 1) {
          _this.area[2].citys = []
          this.$http.get(this.$Api('/address/getAllCountys'), { params: { 'id': nm.id } }).then((response) => {
            console.log(response.data.data)
            for (var i in response.data.data) {
              let obj = { text: i, id: response.data.data[i], select: false }
              _this.area[2].citys.push(obj)

            }
          }, (response) => {
            // error callback
          });
        } else {
          _this.area[3].citys = []
          this.$http.get(this.$Api('/address/getAllTowns'), { params: { 'id': nm.id } }).then((response) => {

            if (response.data.data) {

              _this.area[3].show = true
              for (var i in response.data.data) {
                let obj = { text: i, id: response.data.data[i], select: false }
                _this.area[3].citys.push(obj)

              }
            } else {
              this.show2 = false
              _this.locationDetail = ''
              _this.area[3].text = ''
              this.area.forEach(function(n) {

                _this.locationDetail += n.text
              })
            }

          }, (response) => {
            // error callback
          });
        }
        this.citys = this.area[this.citys.index + 1]
      } else {
        this.show2 = false
        _this.locationDetail = ''
        this.area.forEach(function(n) {
          _this.locationDetail += n.text
        })

      }

      this.area.forEach(function(n) {
        n.select = false
      })
      this.citys.select = true
      console.log(this.area)
    },
    setCommon: function() {
      this.common = !this.common
      console.log(this.common)
    }
  },
  created: function() {
    this.init()

  },
  computed: {
    dataLast: function() {
      let data = this.postData
      data.provinceId = this.area[0].selectedId
      data.cityId = this.area[1].selectedId
      data.areaId = this.area[2].selectedId
      data.townId = this.area[3].selectedId
      if (this.common) {
        data.commonAddr = '1'
      }
      return data
    },
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      editAddr: 'getEditAddr'

    })
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.line {
  opacity: 0.3;
  width: 374px;
  border: 1px solid #4a4a4a;
}

.settings {
  width: 100%;
  height: 13.3vw;
  line-height: 13.3vw;
}

.settings-left {
  width: 29.8vw;
  box-sizing: border-box;
  padding-left: 5vw;
  text-align: left;
  float: left;
  font-size: 14px;
  color: #737373;
  letter-spacing: 0;
}

.settings-right {
  width: 70.2vw;
  text-align: left;
  float: left;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;

  overflow: hidden;
  /*超出部分隐藏*/
  white-space: nowrap;
  /*不换行*/
  text-overflow: ellipsis;
}

.setMoren {
  font-size: 14px;
  color: #1dafed;
  letter-spacing: 0;
  text-align: left;
  .setMorenCircle {
    background: #1dafed !important;
    width: 4.2vw;
    height: 4.2vw;
    border-radius: 100%;
    float: left;
    margin-top: 4.5vw;
    margin-left: 5vw;
    margin-right: 3vw;
  }
  .morenCircle {
    background: none;
    border: 1px solid #1dafed;
    box-sizing: border-box;
    width: 4.2vw;
    height: 4.2vw;
    border-radius: 100%;
    float: left;
    margin-top: 4.5vw;
    margin-left: 5vw;
    margin-right: 3vw;
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

.vux-cell-box:before {
  border: none
}

.locationPop {
  .vux-popup-dialog {
    background: #3c3c3c
  }
  .locationPop-areas {
    background: #3c3c3c;
    height: 8.8vw;
    line-height: 8.8vw;
    box-sizing: border-box;
    padding-left: 5vw;
    border-bottom: 1px solid #4a4a4a;
    position: relative;
    div:first-child {
      margin-left: 0vw;
    }
    div {
      float: left;
      margin-left: 5vw;

      font-size: 14px;
      color: #b4b4b4;
      position: relative;
    }
  }
}

.locationPop .location-pop-title {
  background: #4e4e4e !important;
  font-size: 15px;
  color: #ffffff;
  height: 10.6vw;
  line-height: 10.6vw;
  text-align: center;
}

.area-textBox {
  height: 78.4vw;
  background: #3c3c3;
  overflow: scroll;
  color: #b4b4b4;
  font-size: 14px;
  line-height: 35px;
  padding-left: 5vw;
}

.areaActive:after {
  content: '';
  display: block;
  width: 100%;
  position: absolute;
  height: 1px;
  background: #1dafed;
  bottom: 0
}

.citeActive {
  color: #1dafed
}

.addLocationBox-input {
  float: left;
  background: none;
  color: white;
  border: none;
  height: 13.3vw;
  width: 70.2vw;
  line-height: 13.3vw;
  outline: none !important;
}

</style>
