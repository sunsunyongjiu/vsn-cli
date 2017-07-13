<template>
  <div>
    <back :title="pageTitle"></back>
    <my-nav :items="myBoutique"></my-nav>
  </div>
</template>



<script>
import myNav from '../components/nav'
import back from '../components/backNav'
export default {
  
  components: {
    myNav,
    back
  },
  data () {
    return {
      pageTitle:this.$route.query.title,
      myBoutique:[
        
        
      ]
    }
  },
  methods: {
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