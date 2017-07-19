<template>
  <div class="life">
    <div class="mubu" v-if="show"></div>
    <back :title="pageTitle"></back>
    <tab :line-width="1" custom-bar-width="60px" active-color='#ffffff' class="life-bar" bar-active-color="#1dafed">
      <tab-item selected>男士精品</tab-item>
      <tab-item>女士精品</tab-item>
    </tab>
    <div class="life-img">
  		<img :src="lifeTopImg">
  	</div>
  	<div class="life-test">
  		<div class="test-title">
  			车载香氛<br>
  			<span>Merdeces me</span>
  		</div>
  	</div>
    <my-nav :items="myBoutique"></my-nav>
  </div>
</template>



<script>
import myNav from '../../components/nav'
import back from '../../components/backNav'
import { Tab, TabItem } from 'vux'
export default {
  
  components: {
    myNav,
    back,
    Tab, 
    TabItem
  },
  data () {
    return {
      pageTitle:this.$route.query.title,
      id:this.$route.query.id,
      myBoutique:[],
      show:true,
      lifeTopImg:require('../../assets/imgs/life-top.png')
    }
  },
  methods: {
    init:function(){
      this.$vux.loading.show({
       text: 'loading'
      })
      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getProdListByCategory'),{params: { 'id': this.id }}).then((response) => {
          this.myBoutique=JSON.parse(response.bodyText).data
          this.$vux.loading.hide()
          this.show=false
      }, (response) => {
          // error callback
      });
    }
  },
  mounted:function(){
    this.init()
  }
}
</script>
<style lang='less' scoped>
@import '../../assets/css/global.less';
.life-img{
	width: 100%;
	img{
		width: 100%
	}
}
.life{
	.vux-tab{
		background: @bgcolor !important;
		margin-bottom: 1px
	}
	.vux-tab .vux-tab-item{
		background: none !important
	}
	.life-bar{
		height: 10vw
	}
}
.life-test{
	width: 100%;
	height: 270px;
	position: relative;
	.test-title{
		text-align:right;
		color: #fff;
		font-size: 20px;
		position: absolute;
		top:-10vw;
		right: 10vw;
		span{
			font-size: 18px;
			line-height: 30px
		}
	}
}
</style>