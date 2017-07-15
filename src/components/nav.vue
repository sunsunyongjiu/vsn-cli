<template>
	<div class="index-Boutique">
      <div class="index-Boutique-div" v-for="(item, index) in myBoutique" @click="goWhere(item.title)">
      	<div class="hot" v-if="item.is_hot==='Y'">HOT</div>
        <div class="index-Boutique-div-left">
          <img :src="item.pic">
        </div>
        <div class="index-Boutique-div-right">
          <div v-text="item.name" class="index-Boutique-div-right-name">
            
          </div>
          <div v-text="item.brief" class="text">
            
          </div>
          <div class="index-Boutique-div-right-points">
          	<div>
				市场价：￥<span v-text="item.cash"></span>
			</div>
			<div>
				兑换：<span>10000 </span>积分
			</div>
          </div>
          
          <button>
            立即兑换
          </button>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
	export default {
	  name: 'nav',
	  data () {
	    return {
	     	myBoutique:''
	    }
	  },
	  methods:{
	  	goWhere:function(title){
	  		this.$router.push({path: 'detail', query: { 'title': title}})
	  	}
	  },
	  mounted:function(){
	  	
	  },
	  watch: {
		items() {
			this.myBoutique = this.items
	    }
      },
	  props:['items','yes']
	}
</script>
<style lang='less' scoped>
  .index-Boutique{
    .index-Boutique-div{
      margin-bottom: 6px;
      background-image:linear-gradient(0deg, #535353 0%, #292929 65%);
      height: 32vw;
      text-align: left;
      box-sizing: border-box;
      padding: 5vw 6.985vw 5vw;
      overflow: hidden;
      position: relative;
      .index-Boutique-div-left{
        height: 22.93vw;
        width: 25.06vw;
        float: left;
        img{
          height: 22.93vw;
          width: 25.06vw;
        }
      }
      .index-Boutique-div-right{
        height: 22.93vw;
        overflow: hidden;
        border-top: 1px solid #4a4a4a;
        border-bottom: 1px solid #4a4a4a;
        box-sizing: border-box;
        padding-left: 6vw;
        padding-right: 4vw;
        position: relative;
        box-sizing: border-box;
        .index-Boutique-div-right-name{
          color: #fff;
          font-size: 16px;
          line-height: 18px;
          padding-top: 0.6vh;
          font-weight: 800;
          
        }
        .index-Boutique-div-right-points{
          position: absolute;
          bottom:0;
          div{
      			font-size: 12px;
      			font-family:.AppleSystemUIFont;
      			font-size:10px;
      			color:#9b9b9b;
      			letter-spacing:0;
          }
          
        }
        .text{
          font-family:.AppleSystemUIFont;
          font-size:2.6vw;
          color:#676767;
          letter-spacing:0;
          text-align:left;
          
        }
        
        button{
          border:1px solid #1dafed;
          box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
          border-radius:1px;
          width:16.5vw;
          height:5vw;
          position: absolute;
          right: 0;
          bottom:0;
          font-size: 2.6vw;
          background: rgba(255, 255, 255, 0);
          color: #1dafed;
          padding: 0;
          text-align: center;
          line-height: 5vw

        }
      }
    }
  }	
.hot{
    content: 'HOT';
    display: block;
    position: absolute;
    right: -14vw;
    color: #fff;
    top: 5vw;
    transform:rotate(45deg);
    background-image:linear-gradient(-220deg, #737373 0%, #a4a1a5 53%, #817e82 69%, #5d5d5d 84%, #848284 100%);
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
    width: 40vw;
    text-align: center;
    font-size: 12px;
    height: 4vw;
    line-height: 4vw;
    z-index: 10;
  }
</style>