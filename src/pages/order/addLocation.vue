<template>
  <div>
    <back :title="addTitle"></back>
    <div class='addLocationBox'>
      <div class="settings">
        <div class="settings-left">收货人</div>
        <div v-text="location.name" class="settings-right"></div>
      </div>
      <div class="line"></div>
      <div class="settings">
        <div class="settings-left">联系电话</div>
        <div v-text="location.tel" class="settings-right"></div>
      </div>
      <div class="line"></div>
      <div class="settings">
        <div class="settings-left">所在地区</div>
        <div @click="popShow" class="settings-right" v-text="locationDetail"></div>
      </div>
      <div class="line"></div>
      <div class="settings">
        <div class="settings-left">详细地址</div>
        <div v-text="location.location" class="settings-right"></div>
      </div>
      <div class="line"></div>
      <div class="settings setMoren">
        <div class="setMorenCircle"></div>
        设为默认地址
      </div>
      <div class="line"></div>
      <div class='addLocation'>
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
        { 'text': '市', select: false, citys: [], index: 1, show: true },
        { 'text': '区', select: false, citys: [], index: 2, show: true },
        { 'text': '街道', select: false, citys: [], index: 3, show: false },
      ],
      citys: { citys: [] },
      locationDetail: '请选择地址'
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
    init: function() {
      let _this = this
      if (this.$route.query.edit) {
        this.addTitle = "编辑地址"
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
      this.citys = this.area[0];
    },
    popShow: function() {
      this.show2 = true
      this.citys = this.area[0];
      this.area.forEach(function(n) {
        n.select = false
      })
      this.area[0].select=true
    },
    checkCitys: function(item, index) {
      console.log(index)
      this.area.forEach(function(n) {
        n.select = false
      })
      item.select = true
      this.citys = item
      if (index < 3) {
        this.area[index + 1].text = '请选择'
        this.area[index + 1].citys = []
      }

    },
    changeCity: function(nm, parent) {
      let _this = this
      this.citys.text = nm.text
      parent.forEach(function(item) {
        item.select = false
      })
      nm.select = true
      console.log(this.citys.index)
      let num = this.citys.index
      if (num < 3) {
        console.log(num)
        _this.area[3].citys.show = false
        if (num == 0) {
          _this.area[1].citys = []
          this.$http.get(this.$Api('/address/getAllCitys'), { params: { 'id': nm.id } }).then((response) => {
            console.log(response.data.data)
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
            console.log(response.data.data)
            if (response.data.data) {

              _this.area[3].show = true
              for (var i in response.data.data) {
                let obj = { text: i, id: response.data.data[i], select: false }
                _this.area[3].citys.push(obj)

              }
            } else {
              this.show2 = false
              _this.locationDetail = ''
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
    }
  },
  created: function() {
    this.init()

  },

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
}

.setMoren {
  font-size: 14px;
  color: #1dafed;
  letter-spacing: 0;
  text-align: left;
  .setMorenCircle {
    background: #1dafed;
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

</style>
