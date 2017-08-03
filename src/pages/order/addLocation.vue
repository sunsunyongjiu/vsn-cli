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
  			<popup-picker :data="list3" :columns="3" v-model="value4" show-name class="addlocation-area" @on-change="console()"></popup-picker>
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

  	</div>
  </div>
</template>

<script>
import back from '../../components/backNav'
import { PopupPicker, Group} from 'vux'
export default {
  name: '',
  data () {
    return {
    	locationSettings:[
    		'收货人','联系电话','所在地区','详细地址'
    	],
    	location:{
    		name:'lucy',
    		tel:'18624443537',
    		area:'大连',
    		location:'大连市甘井子区'
    	},
      	addTitle:'添加新地址',
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
		value4: ['china','china002','gx002'],
    }
  },
  components:{
    back,
    PopupPicker, 
    Group
  },
  methods:{
    init:function(){
      if(this.$route.query.edit){
        this.addTitle="编辑地址"
      }
      document.title=this.addTitle
    },
    console:function(a){
	  	console.log(this.value4)
	  }
  },          
  created:function(){
    this.init()

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.line{
	opacity:0.3;
	width:374px;
	border:1px solid #4a4a4a;

}
.settings{
	width: 100%;
	height: 13.3vw;
	line-height: 13.3vw;
}
.settings-left{
	width: 29.8vw;
	box-sizing:border-box;
	padding-left: 5vw;
	text-align: left;
	float: left;
	font-size:14px;
	color:#737373;
	letter-spacing:0;
}
.settings-right{
	width: 70.2vw;
	text-align: left;
	font-size:14px;
	color:#ffffff;
	letter-spacing:0;
}
.setMoren{
	font-size:14px;
	color:#1dafed;
	letter-spacing:0;
	text-align:left;
	.setMorenCircle{
		background:#1dafed;
		width:4.2vw;
		height:4.2vw;
		border-radius:100%;
		float: left;
		margin-top: 4.5vw;
		margin-left: 5vw;
		margin-right: 3vw;
	}
}
.addLocation{
	background:#1dafed;
	box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
	width:90vw;
	height:14.6vw;
	line-height: 14.6vw;
	font-size:24px;
	color:#ffffff;
	letter-spacing:0;
	text-align:center;
	position: absolute;
	bottom: 10vw;
	left: 5vw;
}
.vux-cell-box:before{
	border: none
}
.addlocation-area{
	padding:0;
	width: 69.7vw;
	position: relative;
	float: left;
	text-align: left !important;
	height: 13.3vw;
	.weui-cell{
		height: 13.3vw !important;

	}

}
</style>
