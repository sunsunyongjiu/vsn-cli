<template>
  <div>
    <div class="pageTitle">
      <span v-text="pageTitle"></span>
      <div class="back" @click="goback"></div>
    </div>
    <my-nav :items="myBoutique"></my-nav>
  </div>
</template>



<script>
import myNav from '../components/nav'
export default {
  
  components: {
    myNav
  },
  data () {
    return {
      pageTitle:this.$route.query.title,
      myBoutique:[
        
        
      ]
    }
  },
  methods: {
    goback:function(){
      this.$router.go(-1)
    },
    init:function(){
      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getCommendProdList')).then((response) => {
          this.myBoutique=JSON.parse(response.bodyText).data
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

</style>