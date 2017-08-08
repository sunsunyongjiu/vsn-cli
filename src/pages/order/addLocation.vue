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
            <div v-for="(item,index) in area" v-text="item.text" :class="{areaActive:item.select}" @click="checkCitys(item,index)"></div>
          </div>
          <div class="area-textBox">
          	<div v-for="(item ,index) in citys.citys" v-text="item.text" @click="changeCity(item)" :class="{citeActive:item.select}"></div>
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
      list3: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      value4: ['china', 'china002', 'gx002'],
      area: [
        { 'text': '省', select: true, citys: [{text:'中国',select:false}, {text:'美国',select:false}] ,index:0},
        { 'text': '市', select: false, citys: [{text:'中国1',select:false}, {text:'美国1',select:false}] ,index:1},
        { 'text': '区', select: false, citys: [{text:'中国2',select:false}, {text:'美国2',select:false}] ,index:2 },
        { 'text': '街道', select: false, citys: [{text:'中国3',select:false}, {text:'美国3',select:false}] ,index:3},
      ],
      citys:{citys:[]},
      locationDetail:'请选择地址'
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
      if (this.$route.query.edit) {
        this.addTitle = "编辑地址"
      }
      document.title = this.addTitle
      this.citys=this.area[0]
    },
    popShow: function() {
      this.show2 = true
    },
    checkCitys:function(item,index){
    	this.area.forEach(function(n){
    		n.select=false
    	})
    	item.select=true
    	this.citys=item
    },
    changeCity:function(nm){
    	let _this=this
    	this.citys.text=nm.text
    	nm.select=true
    	console.log(this.citys.index)
    	if(this.citys.index<3){
    		this.citys=this.area[this.citys.index+1]
    	}else{
    		this.show2 = false
    		_this.locationDetail=''
    		this.area.forEach(function(n){
	    		_this.locationDetail+=n.text
	    	})
    		
    	}
    	
    	this.area.forEach(function(n){
    		n.select=false
    	})
    	this.citys.select=true
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
 	div:first-child{
 		margin-left: 0vw;
 	}
 	div{
 		float: left;
 		margin-left: 15vw;
 	
font-size:14px;
color:#b4b4b4;
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
.areaActive:after{
	content: '';
	display: block;
	width: 100%;
	position: absolute;
	height: 1px;
	background: #1dafed;
	bottom: 0
}
.citeActive{
	color: #1dafed
}
</style>
