<template>
  <div class="index-Boutique">
    <div class="index-Boutique-div" v-for="(item, index) in myBoutique" @click="goWhere(item.title,item)">
      <img src="../assets/imgs/hot.png" class="red-hot" v-if="item.is_hot==='Y'">
      <div class="index-Boutique-div-left">
        <img :src="item.pic">
      </div>
      <div class="index-Boutique-div-right ">
        <div v-text="item.name" class="index-Boutique-div-right-name">
        </div>
        <div v-text="item.brief" class="text">
        </div>
        <div class="index-Boutique-div-right-points">
          <div>
            <!-- Price：￥<span v-text="item.cash"></span> -->
          </div>
          <div v-if="item.sellType==1" class="font-10">
            <span v-text="item.point" class="font-10"> </span>积分
          </div>
          <div v-if="item.sellType==0" class="font-10">
            价格：
            <span class="font-10">￥</span>
            <span v-text="item.cash" class="font-10 points"></span>
          
          </div>
        </div>
        <button>
        	{{item.sellType==0?'立即购买':'立即兑换'|tr}}
        </button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import EnJson from "../configers/En"
export default {
  name: 'nav',
  data() {
    return {
      myBoutique: ''
    }
  },
  methods: {
    goWhere: function(title, item) {
      this.$router.push({ path: 'detail', query: { 'title': title, 'prod_id': item.prod_id } })

      // this.$router.push({path: 'detail', query: { 'title': title}})
    }
  },
  mounted: function() {
    console.log(this.items)
  },
  watch: {
    items() {
      this.myBoutique = this.items
    }
  },
  props: ['items', 'yes'],
  filters: {
    tr: function(v) {
      // return EnJson[v]
      return v
    }
  }
}

</script>
<style lang='less' scoped>
@import '../assets/css/global.less';
.index-Boutique {
  .index-Boutique-div {
    margin-bottom: 6px;
    background-image: linear-gradient(0deg, #535353 0%, #292929 65%);
    height: 32vw;
    text-align: left;
    box-sizing: border-box;
    padding: 5vw 6.985vw 5vw;
    overflow: hidden;
    position: relative;
    .index-Boutique-div-left {
      height: 22.93vw;
      width: 25.06vw;
      float: left;
      img {
        height: 22.93vw;
        max-width: 25.06vw;
        display: block;
        margin: 0 auto
      }
    }
    .index-Boutique-div-right {
      height: 22.93vw;
      overflow: hidden;
      border-top: 1px solid #4a4a4a;
      border-bottom: 1px solid #4a4a4a;
      box-sizing: border-box;
      padding-left: 6vw;
      padding-right: 4vw;
      position: relative;
      box-sizing: border-box;
      .index-Boutique-div-right-name {
        color: #fff;
        font-size: 4vw;
        line-height: 5vw;
        margin-top: 0.6vh;
        height: 9vw;
        font-weight: 800;
        overflow: hidden;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .index-Boutique-div-right-points {
        position: absolute;
        bottom: 2px;
        div {
          
          font-family: .AppleSystemUIFont;
          
          color: #9b9b9b;
          letter-spacing: 0;
        }
      }
      .text {
        font-family: .AppleSystemUIFont;
        font-size: 2.6vw;
        color: #676767;
        letter-spacing: 0;
        text-align: left;
      }

      button {
        border: 1px solid #1dafed;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
        border-radius: 1px;
        width: 16.5vw;
        height: 5vw;
        position: absolute;
        right: 0;
        bottom: 2px;
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

.hot {
  content: 'HOT';
  display: block;
  position: absolute;
  right: -14vw;
  color: #fff;
  top: 5vw;
  transform: rotate(45deg);
  background-image: linear-gradient(-220deg, #737373 0%, #a4a1a5 53%, #817e82 69%, #5d5d5d 84%, #848284 100%);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
  width: 40vw;
  text-align: center;
  height: 4vw;
  line-height: 4vw;
  z-index: 10;
}


.red-hot {
  position: absolute;
  right: -2vw;
  top: -2vw;
  height: 20vw;
  z-index: 10;
}

</style>
