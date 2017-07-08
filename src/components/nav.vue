<template>
	<div class="index-Boutique">
      <div class="index-Boutique-div" v-for="(item, index) in myBoutique" @click="goWhere(item.title)">
        <div class="index-Boutique-div-left">
          <img :src="item.src">
        </div>
        <div class="index-Boutique-div-right">
          <div v-text="item.title">
            
          </div>
          <div v-text="item.text">
            
          </div>
          <div>
            市场价：￥<span v-text="item.money"></span>
          </div>
          <div>
            兑换：<span v-text="item.change"></span>积分
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
	     	myBoutique:this.items
	    }
	  },
	  methods:{
	  	goWhere:function(title){
	  		this.$router.push({path: 'detail', query: { 'title': title}})
	  	}
	  },
	  mounted:function(){
	  	
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
        padding-left: 10vw;
        position: relative;
        box-sizing: border-box;
        div:nth-child(1){
          color: #fff;
          font-size: 16px;
          padding-top: 0.6vh;
          font-weight: 800;
          padding-bottom:5px
        }
        div{
          font-size: 12px;
          font-family:.AppleSystemUIFont;
          font-size:10px;
          color:#9b9b9b;
          letter-spacing:0;
        }
        div:nth-child(2){
          font-family:.AppleSystemUIFont;
          font-size:10px;
          color:#676767;
          letter-spacing:0;
          text-align:left;
          padding-bottom: 1vh
        }
        button{
          border:1px solid #1dafed;
          box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
          border-radius:1px;
          width:62px;
          height:19px;
          position: absolute;
          right: 0;
          bottom:0;
          font-size: 10px;
          background: rgba(255, 255, 255, 0);
          color: #1dafed

        }
      }
    }
  }	
.index-Boutique-div:nth-child(1):after{
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
  }
</style>