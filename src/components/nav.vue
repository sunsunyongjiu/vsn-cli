<template>
	<div>
		<h2>Essential Links</h2>
		<span v-if="yes">
			{{uuu}}
		</span>
	    <ul class="nav">
	    	<li v-for='(item,index) in routers'><router-link  :to="item.path">{{item.name}}</router-link></li>
	    </ul>
	</div>
	
</template>
<script type="text/javascript">
import configer from '../configers/router-configer'
	export default {
	  name: 'nav',
	  data () {
	    return {
	     	routers:configer.routers
	    }
	  },
	  mounted:function(){
	  	console.log(this.routers)
	  },
	  props:['uuu','yes']
	}
</script>
<style lang='less'>
.duration(@x){
	transition-duration: @x;
	-moz-transition-duration: @x; /* Firefox 4 */
	-webkit-transition-duration: @x; /* Safari 和 Chrome */
	-o-transition-duration: @x;
}
.nav{
	display: block;
    width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    padding-left: 0;
  li{
      background: rgb(65, 183, 111);
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      vertical-align: center;
      list-style: none;
	  width: 200px;
	  float: left;
	  text-align: center;
    a{
    	color: white;
    	text-decoration: none;
    }
  }
  li:hover a{
  	position: absolute;
  	font-size: 30px;
  	.duration(1s);
	transform:translate(-20px);
	text-shadow:2px 2px 4px #000000
  }
}
</style>