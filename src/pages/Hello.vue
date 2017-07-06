<template>
  <div class="index-page">
    <swiper :aspect-ratio="160/375" auto>
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item"></swiper-item>
    </swiper>
    <flexbox class="index-page-mypoints">
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">2</div></flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import myNav from '../components/nav'
import {state} from 'vuex'
import { Swiper, SwiperItem,Grid, GridItem, GroupTitle,Flexbox, FlexboxItem, Divider} from 'vux'

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

export default {
  name: 'hello',
  data () {
    return {
      msg: '这是起始页',
      yes:false,
      demo04_list: imgList,
    }
  },
  components:{
    myNav,
    Swiper,
    SwiperItem,
    Grid, 
    GridItem, 
    GroupTitle,
    Flexbox, 
    FlexboxItem, 
    Divider
    
  },
  mounted:function(){
    console.log(this.$store)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import '../assets/css/hello.less';
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}


a {
  color: #42b983;
}
.none{
  height: 100%;
  width: 0;
  vertical-align: middle;
}

</style>
