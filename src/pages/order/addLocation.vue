<template>
  <div>
  	<back title="添加新地址"></back>
  	<div>
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
  			<div v-text="location.area" class="settings-right"></div>
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
    	}
    }
  },
  components:{
    back
  },
  methods:{
    
  },          
  mounted:function(){
    

  }
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
</style>
