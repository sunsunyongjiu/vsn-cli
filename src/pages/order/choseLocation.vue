<template>
  <div>
  	<back title="选择地址"></back>
  	<div class="locationList">
  		<div v-for="(item,index) in locationList">
  			<div class="locations">
  				<div class="locationsLeft">
  					<span v-text="item.name" class="font-16"></span>
  					<span v-text="item.tel" class="font-16"></span>
					<div>
	  					<span v-text="item.location" class="font-14"></span>
	  				</div>
  				</div>
  				
  				<div class="locationsRight">
	  				<img src="../../assets/imgs/edit.png">
	  			</div>
  			</div>
  			
  		</div>
  	</div>
  	<div class='addLocation' @click="addLocation">
  		添加新地址
  	</div>
  </div>
</template>

<script>
import back from '../../components/backNav'
export default {
  name: '',
  data () {
    return {
    	locationList:[
    		{
    			name:'Lucy',
    			tel:'13776641789',
    			location:'上海市浦东新区金桥大厦湖南路54号万科小区3栋4单元1201'
    		},
    		{
    			name:'Lucy',
    			tel:'13776641789',
    			location:'上海市浦东新区金桥大厦湖南路54号万科小区3栋4单元1201'
    		}
    	]
    }
  },
  components:{
    back
  },
  methods:{
    addLocation:function(){
    	this.$router.push({path:'/addLocation'})
    }
  },          
  mounted:function(){
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
.locations{
	background:#181818;;
	box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
	width:100%;
	height:26.6vw;
	color: #7a7a7a;
	box-sizing:border-box;
	padding: 5.3vw 0;
	margin-bottom: 4px;
	margin-top: 10px;
	.locationsLeft{
		float: left;
		width: 83vw;
		padding-left: 5vw;
		text-align: left;
		line-height: 20px;
		box-sizing:border-box;
	}
	.locationsRight{
		float: right;
		width: 17vw;

		padding-right: 3vw;
		box-sizing:border-box;
		img{
			height: 4.5vw;
			margin-top: 6.0vw
		}
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
